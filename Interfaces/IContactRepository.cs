using AddressBookApi.Entities;
using AddressBookApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Interfaces
{
    public interface IContactRepository
    {
        Task<PagedList<Contact>> GetContactsAsync(ContactParams contactParams);

        Task<Contact> GetContactByIdAsync(int id);

        Task<Contact> GetContactByFirstNameAsync(string firstName);
    }
}
