﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.DTOs
{
    public class ContactUpdateDTO
    {

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public DateTime BirthDate { get; set; }

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;

        public string Address { get; set; }

        public string Telephone { get; set; }

        public string Cell { get; set; }

        public string Email { get; set; }
    }
}
