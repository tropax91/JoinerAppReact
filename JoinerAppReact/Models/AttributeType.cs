using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class AttributeType
    {
        public AttributeType()
        {
            Attribute = new HashSet<Attribute>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<Attribute> Attribute { get; set; }
    }
}
