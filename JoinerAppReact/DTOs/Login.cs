using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class Login
    {
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
