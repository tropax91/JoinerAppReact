using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Razor.Parser;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace JoinerAppReact.Services
{
    public interface IEmailService
    {
        Task<Response> SendEmail(string Receiver, string Subject, string Content);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration Configuration;
        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<Response> SendEmail(string Receiver, string Subject, string Content)
        {
            var client = new SendGridClient(Configuration["SendGrid:ApiKey"]);

            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress(Configuration["SendGrid:SenderEmail"], Configuration["SendGrid:SenderName"]));
            msg.AddTo(new EmailAddress(Receiver));
            msg.SetSubject(Subject);
            //msg.AddContent(MimeType.Text, "Hello, Email from the helper [SendSingleEmailAsync]!");
            msg.AddContent(MimeType.Html, Content);

            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
