using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using BCrypt.Net;
using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using JoinerAppReact.Services;
using JoinerAppReact.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace JoinerAppReact.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        public AccountController(
            IConfiguration configuration,
            IViewRenderService viewRenderService,
            IEmailService emailService)
            :base(configuration, viewRenderService, emailService)
        {

        }


        [Route("InsertUser")]
        [HttpPost]
        public async Task<object> InsertUser([FromBody] UserDTO Reg)
        {
            try
            {
                var userExist = Db.User.Any(u => u.Email == Reg.Email);
                if (!userExist)
                {
                    User UL = DTOParser.ParseFromDTO(Reg);
                    UL.Id = Guid.NewGuid();
                    UL.Password = BCrypt.Net.BCrypt.HashPassword(Reg.Password);
                    Db.User.Add(UL);
                    Db.UserAttribute.Add(new UserAttribute { Id = Guid.NewGuid(), UserId = UL.Id, AttributeId = Constants.CustomerAccountTypeId });
                    Db.SaveChanges();
                    var emailResponse = await SendRegistrationEmail(UL);

                    return new Response
                    {
                        Status = "Success",
                        Message = "User Saved Successfully."
                    };
                }
            }
            catch (Exception)
            {
                throw;
            }
            return new Response { Status = "Error", Message = "User already exists." };

        }


        [Route("Login")]
        [HttpPost]
        public Response UserLogin([FromBody] Login login)
        {
            var usr = Db.User.FirstOrDefault(x => x.Email.Equals(login.Email));

            if (usr != null)
            {
                var checkPas = BCrypt.Net.BCrypt.Verify(login.Password, usr.Password);
                if (checkPas)
                {
                    //HttpContext.Session.SetString("email", login.Email);
                    SetSessionUserId(usr.Id.ToString());
                    return new Response { Status = "Success", Message = "Login Successfully" };
                }
                 else
                 {
                     return new Response { Status = "Error", Message = "Invalid Email or Password!!" };
                 }

            }
           
            return new Response { Status = "Invalid", Message = " User doesn't exist." };
        }


        [Route("Logout")]
        [HttpPost]
        public IActionResult Logout()
        {
            SetSessionUserId("");
            return Ok();
        }


        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDTO data)
        {
            
            try
            {
                User user = Db.User.FirstOrDefault(u => u.Id == Guid.Parse(GetSessionUserId()));
                if(user != null)
                {
                    if (!BCrypt.Net.BCrypt.Verify(data.Password,user.Password))
                    {
                        return NotFound();
                    }
                    user.Password = (data.NewPassword != null) ? BCrypt.Net.BCrypt.HashPassword(data.NewPassword) : user.Password;
                    user.FirstName = (data.FirstName != null) ? data.FirstName : user.FirstName;
                    user.LastName = (data.LastName != null) ? data.LastName : user.LastName;
                    await Db.SaveChangesAsync();
                    return Ok();
                }
                return NotFound();
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpGet("UserSession")]
        public async Task<IActionResult> UserSessionAsync()
        {   
            return Json(new { isLoggedIn = UserIsLoggedIn(), userType = await GetAccountType() });
        }


        [HttpGet("UserProfile")]
        public async Task<IActionResult> GetUserDetails()
        {
            try
            {
                var userId = GetSessionUserId();
                if (!string.IsNullOrEmpty(userId))
                {
                    var usr = await Db.User.FirstOrDefaultAsync(x => x.Id == Guid.Parse(userId));
                    return Json(usr);
                }
               
            }
            catch
            {
                throw;
            }
            return NotFound();
            
        }

    }
}
