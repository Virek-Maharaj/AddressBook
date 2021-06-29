using AddressBookApi.Data;
using AddressBookApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactDetailController : Controller
    {
        private readonly AddressContext _context;

        public ContactDetailController(AddressContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactDetail>>> GetContactDetails()
        {
            var contactDetails = await _context.ContactDetails.ToListAsync();
            return Ok(contactDetails);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDetail>> GetContactDetails(int id)
        {
            return await _context.ContactDetails.FindAsync(id);
        }
    }
}
