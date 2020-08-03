using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class AddressDTO
    {
        [JsonProperty("addressLine1")]
        public string AddressLine1 { get; set; }

        [JsonProperty("addressLine2")]
        public string AddressLine2 { get; set; }
        
        [JsonProperty("postalCode")]
        public string PostalCode { get; set; }
        
        [JsonProperty("city")]
        public string City { get; set; }
    }
}
