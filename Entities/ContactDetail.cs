using AddressBookApi.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Entities
{
    public class ContactDetail
    {
        public int ContactDetailId { get; set; }

        public int ContactId { get; set; }

        public string Description { get; set; }

        public ContactType ContactTypeId { get; set; }
 
    }
}
