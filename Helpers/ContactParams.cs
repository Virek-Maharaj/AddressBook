using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Helpers
{
    public class ContactParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize 
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string firstName { get; set; }

        public string surname { get; set; }

        public string cell { get; set; }

        public string OrderBy { get; set; } = "firstName";
    }
}
