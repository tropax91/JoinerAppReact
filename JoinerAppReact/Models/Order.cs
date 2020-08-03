using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderAttribute = new HashSet<OrderAttribute>();
            OrderLine = new HashSet<OrderLine>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public decimal Price { get; set; }
        public Guid UserId { get; set; }
        public Guid FkBillingAddress { get; set; }
        public DateTime CreationDateTime { get; set; }
        public string Note { get; set; }

        public virtual Address FkBillingAddressNavigation { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderAttribute> OrderAttribute { get; set; }
        public virtual ICollection<OrderLine> OrderLine { get; set; }
    }
}
