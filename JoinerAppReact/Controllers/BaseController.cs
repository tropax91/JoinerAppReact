using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using JoinerAppReact.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using JoinerAppReact.Utilities;

namespace JoinerAppReact.Controllers
{
    public class BaseController : Controller
    {
        protected readonly IConfiguration Configuration;
        protected readonly BachelorProjectContext Db;
        private readonly IViewRenderService ViewRenderService;
        private readonly IEmailService EmailService;

        protected readonly string UserSessionKey = "UserId";

        protected BaseController(IConfiguration configuration, IViewRenderService viewRenderService, IEmailService emailService)
        {
            Configuration = configuration;
            ViewRenderService = viewRenderService;
            EmailService = emailService;
            Db = new BachelorProjectContext();
        }

        protected async Task<SendGrid.Response> SendRegistrationEmail(User user)
        {
            var result = await ViewRenderService.RenderToStringAsync("Emails/Registration", user);

            return await EmailService.SendEmail(user.Email, "Account Registration - Joiner", result);
        }

        protected async Task<SendGrid.Response> SendOrderConfirmationEmail(Order order)
        {
            var result = await ViewRenderService.RenderToStringAsync("Emails/OrderConfirmation", order);

            return await EmailService.SendEmail(order.User.Email, "Order Confirmation - Joiner", result);
        }

        protected void SetSessionUserId(string UserId)
        {
            HttpContext.Session.SetString(UserSessionKey, UserId);
        }

        protected string GetSessionUserId()
        {
            return HttpContext.Session.GetString(UserSessionKey);
        }

        protected bool UserIsLoggedIn()
        {
            if (string.IsNullOrEmpty(GetSessionUserId()))
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Checks whether logged in user is admin. If no user is logged in, it returns false.
        /// </summary>
        /// <returns></returns>
        protected async Task<bool> AccountIsAdmin()
        {
            if (UserIsLoggedIn())
            {
                return await AccountIsAdmin(GetSessionUserId());
            }
            return false;
        }

        protected async Task<bool> AccountIsAdmin(string UserId)
        {
            return await Db.UserAttribute.AnyAsync(ua => ua.User.Id == Guid.Parse(UserId) && ua.Attribute.Id == Constants.AdminAccountTypeId);
        }

        protected async Task<string> GetAccountType()
        {
            if (UserIsLoggedIn())
            {
                return (await Db.UserAttribute.Include(ua => ua.Attribute).FirstAsync(ua => ua.User.Id == Guid.Parse(GetSessionUserId()) && ua.Attribute.Type.Id == Constants.AccountTypeId)).Attribute.AttributeName;
            }
            return "";
        }

        protected bool AttributeIsOfTypeOrderStatus(Guid attributeId)
        {
            return Db.Attribute.Any(a => a.Id == attributeId && a.Type.Id == Constants.OrderStatusTypeId);
        }

        protected bool AttributeIsOfTypeAccountType(Guid attributeId)
        {
            return Db.Attribute.Any(a => a.Id == attributeId && a.Type.Id == Constants.AccountTypeId);
        }
    }
}