using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class UserAttribute
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid AttributeId { get; set; }

        public virtual Attribute Attribute { get; set; }
        public virtual User User { get; set; }
    }
}
