using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.DTOs
{
    public class UserDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }
    }
}
