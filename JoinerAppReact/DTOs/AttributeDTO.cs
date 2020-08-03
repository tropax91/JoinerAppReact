using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.DTOs
{
    public class AttributeDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
