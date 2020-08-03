using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class Material
    {
        public Material()
        {
            OrderLine = new HashSet<OrderLine>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int IsSelectable { get; set; }

        public virtual ICollection<OrderLine> OrderLine { get; set; }
    }
}
