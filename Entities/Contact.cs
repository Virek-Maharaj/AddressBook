using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Entities
{
    public class Contact
    {
        public int ContactId { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string BirthDate { get; set; }

        public string UpdatedDate { get; set; }
    }
}
