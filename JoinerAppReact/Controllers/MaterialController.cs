using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using Microsoft.Extensions.Configuration;
using JoinerAppReact.Services;

namespace JoinerAppReact.Controllers
{
    [Route("api/[controller]")]
    public class MaterialController : BaseController
    {
        public MaterialController(
            IConfiguration configuration,
            IViewRenderService viewRenderService,
            IEmailService emailService)
            : base(configuration, viewRenderService, emailService)
        {

        }

        [HttpGet("GetMaterials")]
        public IActionResult GetMaterials(string search)
        {
            var materials = Db.Material.Select(s => new MaterialDTO { Id = s.Id.ToString(), Name = s.Name }).OrderBy(s => s.Id).ToList();
            if(!string.IsNullOrWhiteSpace(search))
            {
                materials = materials.FindAll(s => s.Id == search || s.isSelectable == search ||
                s.Name == search).ToList();
            }
            return Json(materials);
        }

        [Route("InsertMaterial")]
        [HttpPost]
        public IActionResult InsertMaterial([FromBody]MaterialDTO materialDTO)
        {
            // Guid to generate
            Guid myid = new Guid();
            // The table object needed for adding a new record of type table
            Material material = new Material();
            //Making the variables of the material object equal to the frombody object
            material.Id = myid;
            material.Name = materialDTO.Name;
            int i = int.Parse(materialDTO.isSelectable);
            material.IsSelectable = i;
            //Add record
            Db.Material.Add(material);
            //Save changes
            Db.SaveChangesAsync();
            // Return Ok
            return Ok();
           
        }

        [HttpPost]
        [Route("Edit")]// api/material is defined on line 11
        public IActionResult EditRecord([FromBody] MaterialDTO data)
        {
            //Get record by id
            var matRow = Db.Material.FirstOrDefault(Mat => Mat.Id.ToString() == data.Id);
            if (matRow != null)
            {
                //Make changes on row
                if(matRow.IsSelectable == 1)
                {
                    matRow.IsSelectable = 0;
                }
                else
                {
                    matRow.IsSelectable = 1;
                }
                //Update the row in the context
                //Save changes to database
                Db.SaveChanges();
            }

            return Json(data);
        }
    }
}