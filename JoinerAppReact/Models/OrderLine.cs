using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class OrderLine
    {
        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public Guid ShapeId { get; set; }
        public Guid MaterialId { get; set; }
        public Guid OrderId { get; set; }

        public virtual Material Material { get; set; }
        public virtual Order Order { get; set; }
        public virtual Shape Shape { get; set; }
    }
}
