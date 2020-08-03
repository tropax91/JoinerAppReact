using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class OrderDetails
    {   

        [JsonProperty("OrderLineQuantity")]
        public int orderLineQuantity { get; set; }

        [JsonProperty("ShapeId")]
        public string shapeID { get; set; }

        [JsonProperty("ShapeName")]
        public string shapeName { get; set; }
        
        [JsonProperty("OrderID")]
        public string orderID { get; set; }
        
        [JsonProperty("OrderPrice")]
        public string orderPrice { get; set; }
        
    }
}
