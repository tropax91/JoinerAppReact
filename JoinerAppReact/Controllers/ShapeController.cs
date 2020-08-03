using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JoinerAppReact.DTOs;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using JoinerAppReact.Models;
using Microsoft.Extensions.Configuration;
using JoinerAppReact.Services;
using Microsoft.EntityFrameworkCore;

namespace JoinerAppReact.Controllers
{

    [Route("api/[controller]")]
    public class ShapeController : BaseController
    {
        public ShapeController(
            IConfiguration configuration,
            IViewRenderService viewRenderService,
            IEmailService emailService)
            : base(configuration, viewRenderService, emailService)
        {

        }

        [HttpPost("UploadShape")]
        public async Task<IActionResult> UploadShape([FromBody] ShapeDTO data)
        {
            if (UserIsLoggedIn())
            {
                if(Db.Shape.Any(s => s.Name == data.Name))
                {
                    return Conflict();
                }

                Db.Shape.Add(new Shape
                {
                    Id = Guid.NewGuid(),
                    Name = data.Name,
                    Dxf = data.Dxf,
                    UserId = Guid.Parse(GetSessionUserId()),
                    Width = data.Width,
                    Height = data.Height
                });
                await Db.SaveChangesAsync();
            
                return Ok();
            }
            return Unauthorized();
        }

        [HttpGet("DownloadShape/{guid}")]
        public async Task<IActionResult> DownloadShapeDxf(string guid)
        {
            var shape = await Db.Shape.FirstOrDefaultAsync(s => s.Id == Guid.Parse(guid));
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(shape.Dxf);
            writer.Flush();
            stream.Position = 0;
            return File(stream, "application/dxf", $"{shape.Name.Replace(' ', '_')}.dxf");
        }

        [HttpGet("GetShapes")]
        public async Task<IActionResult> GetShapes()
        {
            var shapes = Db.Shape.Select(s => new ShapeDTO { Id = s.Id.ToString(), Name = s.Name, Width = s.Width, Height = s.Height }).ToList();
            return Json(shapes);
        }
    }
}