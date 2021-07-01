using AddressBookApi.Data;
using AddressBookApi.Entities;
using AddressBookApi.Extensions;
using AddressBookApi.Helpers;
using AddressBookApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactsController(AddressContext context,IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts([FromQuery]ContactParams contactParams)
        {
            

            var contacts = await _contactRepository.GetContactsAsync(contactParams);

            Response.AddPaginationHeader(contacts.CurrentPage, contacts.PageSize, contacts.TotalCount, contacts.TotalPages);
            return Ok(contacts);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Contact>> GetContact(int id)
        //{
        //    return await _contactRepository.GetContactByIdAsync(id);
        //}

        [HttpGet("{firstName}")]
        public async Task<ActionResult<Contact>> GetContactByFirstName(string firstName)
        {
            return await _contactRepository.GetContactByFirstNameAsync(firstName);
        }
    }
}
