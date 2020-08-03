using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.DTOs
{
    public class MaterialDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("isSelectable")]
        public string isSelectable { get; set; }
    }
}
