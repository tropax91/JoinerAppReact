using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using JoinerAppReact.Services;
using JoinerAppReact.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.Controllers
{

    [Route("api/[controller]")]
    public class OrderController : BaseController
    {
        public OrderController(
            IConfiguration configuration,
            IViewRenderService viewRenderService,
            IEmailService emailService)
            : base(configuration, viewRenderService, emailService)
        {

        }

        [HttpPost("SubmitOrder")]
        public async Task<IActionResult> SubmitOrder([FromBody] OrderDTO reqData)
        {
            if (UserIsLoggedIn())
            {
                var user = Db.User.FirstOrDefault(u => u.Id == Guid.Parse(GetSessionUserId()));
                if (user != null)
                {
                    var newOrderId = Guid.NewGuid();
                    var order = new Order()
                    {
                        Id = newOrderId,
                        UserId = user.Id,
                        Price = reqData.Price,
                        CreationDateTime = DateTime.Now,
                    };
                    Db.OrderAttribute.Add(new OrderAttribute { Id = Guid.NewGuid(), OrderId = order.Id, AttributeId = Constants.NewOrderStatusId });

                    Address address = Db.Address.FirstOrDefault(
                        a => a.AddressLine1 == reqData.BillingAddress.AddressLine1 &&
                        a.AddressLine2 == reqData.BillingAddress.AddressLine2 &&
                        a.City == reqData.BillingAddress.City &&
                        a.PostalCode == reqData.BillingAddress.PostalCode
                        );
                    if (address != null)
                    {
                        order.FkBillingAddressNavigation = address;
                    }
                    else
                    {
                        address = new Address
                        {
                            Id = Guid.NewGuid(),
                            AddressLine1 = reqData.BillingAddress.AddressLine1,
                            AddressLine2 = reqData.BillingAddress.AddressLine2,
                            City = reqData.BillingAddress.City,
                            PostalCode = reqData.BillingAddress.PostalCode
                        };
                        Db.Address.Add(address);
                    }
                    order.FkBillingAddress = address.Id;
                    foreach (OrderLineDTO ol in reqData.OrderLines)
                    {
                        order.OrderLine.Add(new OrderLine()
                        {
                            Id = Guid.NewGuid(),
                            Quantity = ol.Quantity,
                            ShapeId = Guid.Parse(ol.ShapeId),
                            MaterialId = Guid.Parse(ol.MaterialId)
                        });
                    }
                    Db.Order.Add(order);
                    await Db.SaveChangesAsync();

                    var fullOrderObj = order;
                    fullOrderObj.OrderLine = Db.OrderLine.Include(ol => ol.Shape).Include(ol => ol.Material).Where(ol => ol.OrderId == fullOrderObj.Id).ToList();
                    fullOrderObj.User = user;
                    var emailResponse = SendOrderConfirmationEmail(fullOrderObj);
                    return Ok();
                }
            }
            return Unauthorized();
        }


        [HttpPost("GetPrice")]
        public IActionResult GetPrice([FromBody] OrderDTO data)
        {
            var shapeIds = data.OrderLines.Select(ol => ol.ShapeId).ToList();
            var shapes = Db.Shape.Where(s => shapeIds.Contains(s.Id.ToString())).Select(s => new Shape { Id = s.Id, Width = s.Width, Height = s.Height }).ToList();
            data.Price = PriceCalculator.CalculateOrderPrice(data, shapes);
            return Json(data);
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders(string search)
        {
            if (UserIsLoggedIn())
            {
                
                var Orders = await Db.Order.
                    Include(o => o.User).
                    Select(x => new OrderDTO
                    {
                        Id = x.Id.ToString(),
                        Price = x.Price,
                        CreationDateTime = x.CreationDateTime.ToString(),
                        UserId = x.UserId.ToString(),
                        UserFullName = $"{x.User.FirstName} {x.User.LastName}",
                        Status = x.OrderAttribute.FirstOrDefault(oa => oa.Attribute.Type.Id == Constants.OrderStatusTypeId).Attribute.AttributeName
                    }).OrderBy(s=> s.Id).ToListAsync();

                if (!await AccountIsAdmin())
                {
                    Orders = Orders.Where(o => Guid.Parse(o.UserId) == Guid.Parse(GetSessionUserId())).ToList();
                }

                if (!string.IsNullOrWhiteSpace(search))
                {
                   Orders = Orders.FindAll(s => s.Id == search ||
                    s.Status == search || s.UserFullName == search || s.UserId == search).ToList();
                }


                return Json(Orders);
            }
            return Unauthorized();
        }

        [HttpGet("GetOrderDetails")]
        public async Task<IActionResult> GetOrderDetails(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest();
            }
            else
            {
                var orderObject = await Db.Order
                    .Include(o => o.User)
                    .Include(o => o.FkBillingAddressNavigation)
                    .Include(o => o.OrderAttribute)
                    .ThenInclude(oa => oa.Attribute)
                    .FirstOrDefaultAsync(o => o.Id == Guid.Parse(id));

                var orderlinesObject = await Db.OrderLine
                    .Include(ol => ol.Shape)
                    .Include(ol => ol.Material)
                    .Where(ol => ol.OrderId == orderObject.Id).ToListAsync();

                var orderDetails = DTOParser.ParseToDTO(orderObject);
                var orderLines = DTOParser.ParseToDTO(orderlinesObject);

                return Json(new { orderDetails, orderLines });
            }
        }

        [HttpGet("GetOrderStatuses")]
        public IActionResult GetOrderStatuses()
        {
            return Json(Constants.GetOrderStatuses());
        }

        [HttpPost("UpdateOrderStatus")]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] OrderDTO data)
        {
            if(!string.IsNullOrWhiteSpace(data.Id) && !string.IsNullOrWhiteSpace(data.NewStatusId))
            {
                if (AttributeIsOfTypeOrderStatus(Guid.Parse(data.NewStatusId)))
                {
                    var currentStatusRelation = await Db.OrderAttribute.FirstOrDefaultAsync(oa => oa.OrderId == Guid.Parse(data.Id) && oa.Attribute.Type.Id == Constants.OrderStatusTypeId);
                    if(currentStatusRelation != null)
                    {
                        Db.OrderAttribute.Remove(currentStatusRelation);
                    }
                    Db.OrderAttribute.Add(new OrderAttribute { Id = Guid.NewGuid(), OrderId = Guid.Parse(data.Id), AttributeId = Guid.Parse(data.NewStatusId) });
                    await Db.SaveChangesAsync();
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}