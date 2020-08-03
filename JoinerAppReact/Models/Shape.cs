using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class Shape
    {
        public Shape()
        {
            OrderLine = new HashSet<OrderLine>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Dxf { get; set; }
        public Guid UserId { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<OrderLine> OrderLine { get; set; }
    }
}
