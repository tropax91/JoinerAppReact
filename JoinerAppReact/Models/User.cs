using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class User
    {
        public User()
        {
            Order = new HashSet<Order>();
            Shape = new HashSet<Shape>();
            UserAttribute = new HashSet<UserAttribute>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<Shape> Shape { get; set; }
        public virtual ICollection<UserAttribute> UserAttribute { get; set; }
    }
}
