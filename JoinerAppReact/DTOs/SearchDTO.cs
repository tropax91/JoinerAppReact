using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace JoinerAppReact.DTOs
{
    public class SearchDTO
    {

        [JsonProperty("SearchValue")]
        public string parameter { get; set; }

        [JsonProperty("ListOfData")]
        public List<MaterialDTO> materialDTOs { get; set; }


    }

    public class SearchOrderDTO
    {
        [JsonProperty("SearchValue")]
        public string parameter { get; set; }
        [JsonProperty("ListOfData")]
        public List<OrderDTO> orderList { get; set; }
    }
}
