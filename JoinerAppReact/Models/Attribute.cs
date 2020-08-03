using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class Attribute
    {
        public Attribute()
        {
            OrderAttribute = new HashSet<OrderAttribute>();
            UserAttribute = new HashSet<UserAttribute>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public Guid TypeId { get; set; }
        public string AttributeName { get; set; }

        public virtual AttributeType Type { get; set; }
        public virtual ICollection<OrderAttribute> OrderAttribute { get; set; }
        public virtual ICollection<UserAttribute> UserAttribute { get; set; }
    }
}
