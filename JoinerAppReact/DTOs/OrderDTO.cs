using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JoinerAppReact.Models;
using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class OrderDTO { 
    
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }

        [JsonProperty("orderLines")]
        public List<OrderLineDTO> OrderLines { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("userFullName")]
        public string UserFullName { get; set; }

        [JsonProperty("creationDateTime")]
        public string CreationDateTime { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("billingAddress")]
        public AddressDTO BillingAddress { get; set; }

        [JsonProperty("fullBillingAddress")]
        public string FullBillingAddress { get; set; }

        [JsonProperty("newStatusId")]
        public string NewStatusId { get; set; }
    }

    public class OrderLineDTO
    {
        [JsonProperty("Id")]
        public string Id { get; set; }
        [JsonProperty("shapeId")]
        public string ShapeId { get; set; }

        [JsonProperty("shapeName")]
        public string ShapeName { get; set; }

        [JsonProperty("shapeWidth")]
        public string ShapeWidth { get; set; }

        [JsonProperty("shapeHeight")]
        public string ShapeHeight { get; set; }

        [JsonProperty("materialId")]
        public string MaterialId { get; set; }

        [JsonProperty("materialName")]
        public string MaterialName { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }
    }
}
