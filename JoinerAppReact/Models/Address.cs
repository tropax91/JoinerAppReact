using System;
using System.Collections.Generic;

namespace JoinerAppReact.Models
{
    public partial class Address
    {
        public Address()
        {
            Order = new HashSet<Order>();
        }

        public int ClusterRowId { get; set; }
        public Guid Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }

        public virtual ICollection<Order> Order { get; set; }
    }
}
