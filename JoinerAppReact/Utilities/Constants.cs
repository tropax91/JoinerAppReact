using JoinerAppReact.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.Utilities
{
    public static class Constants
    {
        public static readonly Guid AccountTypeId = new Guid("aea2b8c8-d601-4545-8a94-f7f0528b396f");
        public static readonly Guid AdminAccountTypeId = new Guid("cdcf19de-a2ff-4fd3-9c7c-6d1a08f3e04e");
        public static readonly Guid CustomerAccountTypeId = new Guid("e39dfedb-e4bc-4887-bcba-066834902766");
        public static readonly Guid OperatorAccountTypeId = new Guid("487096bd-7947-4c0d-9560-c483d88becc9");

        public static readonly Guid OrderStatusTypeId = new Guid("824c1ee0-feab-48c8-8c0e-7810cf64f2f9");
        public static readonly Guid NewOrderStatusId = new Guid("1d96ebfc-bffa-4a33-879c-46eae38c1108");
        public static readonly Guid ProcessingOrderStatusId = new Guid("7987e626-7942-40d4-bf9b-592b6271c13e");
        public static readonly Guid CompletedOrderStatusId = new Guid("b7861d33-b78d-407d-ae69-7085fe44f2bd");
        public static readonly Guid RejectedOrderStatusId = new Guid("8db98a79-521d-4423-8744-cfa312c0b721");

        public static List<AttributeDTO> GetOrderStatuses()
        {
            return new List<AttributeDTO>()
            {
                new AttributeDTO { Id = NewOrderStatusId.ToString(), Name = "New" },
                new AttributeDTO { Id = ProcessingOrderStatusId.ToString(), Name = "Processing" },
                new AttributeDTO { Id = CompletedOrderStatusId.ToString(), Name = "Completed" },
                new AttributeDTO { Id = RejectedOrderStatusId.ToString(), Name = "Rejected" }
            };
        }
    }
}
