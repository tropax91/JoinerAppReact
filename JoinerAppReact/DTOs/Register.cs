using Newtonsoft.Json;

namespace JoinerAppReact.DTOs
{
    public class Register
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
