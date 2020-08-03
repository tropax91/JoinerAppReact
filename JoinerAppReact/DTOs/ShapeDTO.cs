using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class ShapeDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("dxf")]
        public string Dxf { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
}
