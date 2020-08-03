using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.Utilities
{
    public static class DTOParser
    {
        public static UserDTO ParseToDTO(User userObject)
        {
            return new UserDTO
            {
                Id = userObject.Id.ToString(),
                Email = userObject.Email,
                FirstName = userObject.FirstName,
                LastName = userObject.LastName,
                Type = (userObject.UserAttribute != null && userObject.UserAttribute.Count > 0) ? userObject.UserAttribute.First(ua => ua.Attribute.TypeId == Constants.AccountTypeId)?.Attribute.AttributeName ?? "Unavailable" : null
            };
        }

        public static User ParseFromDTO(UserDTO user)
        {
            return new User
            {
                Id = (user.Id != null) ? Guid.Parse(user.Id) : Guid.Empty,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        public static OrderDTO ParseToDTO(Order orderObject)
        {
            return new OrderDTO
            {
                Id = orderObject.Id.ToString(),
                Price = orderObject.Price,
                OrderLines = (orderObject.OrderLine != null && orderObject.OrderLine.Count > 0) ? ParseToDTO(orderObject.OrderLine) : null,
                UserFullName = (orderObject.User != null) ? $"{orderObject.User.FirstName} {orderObject.User.LastName}" : null,
                CreationDateTime = orderObject.CreationDateTime.ToString(),
                Status = (orderObject.OrderAttribute != null && orderObject.OrderAttribute.Count > 0) ? orderObject.OrderAttribute.First(oa => oa.Attribute.TypeId == Constants.OrderStatusTypeId)?.Attribute.AttributeName ?? "Unavailable" : null,
                FullBillingAddress = (orderObject.FkBillingAddressNavigation != null) ? $"{orderObject.FkBillingAddressNavigation.AddressLine1}\n{orderObject.FkBillingAddressNavigation.AddressLine2}\n{orderObject.FkBillingAddressNavigation.PostalCode} {orderObject.FkBillingAddressNavigation.City}" : null
            };
        }

        public static List<OrderLineDTO> ParseToDTO(ICollection<OrderLine> orderLinesObject)
        {
            var result = new List<OrderLineDTO>();
            return orderLinesObject.Select(x => new OrderLineDTO
            {
                ShapeId = x.ShapeId.ToString(),
                ShapeName = (x.Shape != null) ? x.Shape.Name : null,
                ShapeWidth = (x.Shape != null) ? x.Shape.Width.ToString() : null,
                ShapeHeight = (x.Shape != null) ? x.Shape.Height.ToString() : null,
                MaterialId = x.MaterialId.ToString(),
                MaterialName = (x.Material != null) ? x.Material.Name : null,
                Quantity = x.Quantity
            }).ToList();
        }
    }
}
