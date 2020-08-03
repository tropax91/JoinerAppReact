using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class OrderAttribute
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public Guid AttributeId { get; set; }

        public virtual Attribute Attribute { get; set; }
        public virtual Order Order { get; set; }
    }
}
