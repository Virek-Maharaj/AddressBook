using AddressBookApi.Entities;
using AddressBookApi.Helpers;
using AddressBookApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly AddressContext _context;

        public ContactRepository(AddressContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Contact>> GetContactsAsync(ContactParams contactParams)
        {
            //return await _context.Contacts.ToListAsync();
            var query = _context.Contacts
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(contactParams.firstName))
            {
                query = query.Where(f => f.FirstName == contactParams.firstName);
            }
            if (!string.IsNullOrWhiteSpace(contactParams.surname))
            {
                query = query.Where(f => f.Surname == contactParams.surname);
            }
            if (!string.IsNullOrWhiteSpace(contactParams.cell))
            {
                query = query.Where(f => f.Cell == contactParams.cell);
            }



            return await PagedList<Contact>.CreateAsync(query, contactParams.PageNumber, contactParams.PageSize);
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<Contact> GetContactByFirstNameAsync(string firstName)
        {
            return await _context.Contacts.SingleOrDefaultAsync(x => x.FirstName == firstName);
        }

        public void Update(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
        }

        public void Add(Contact contact)
        {
            _context.AddAsync(contact);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteContact(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Deleted;
        }
    }
}
