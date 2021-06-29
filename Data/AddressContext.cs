using AddressBookApi.Entities;
using Microsoft.EntityFrameworkCore;
namespace AddressBookApi.Data
{
    public class AddressContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AddressContext(DbContextOptions<AddressContext> options) : base(options)
        {
        }

        public Microsoft.EntityFrameworkCore.DbSet<Contact> Contacts { get; set; }

        public Microsoft.EntityFrameworkCore.DbSet<ContactDetail> ContactDetails { get; set; }
    }
}
