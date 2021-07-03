using AddressBookApi.Data;
using AddressBookApi.DTOs;
using AddressBookApi.Entities;
using AddressBookApi.Extensions;
using AddressBookApi.Helpers;
using AddressBookApi.Interfaces;
using AutoMapper;
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
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;
        private readonly IMapper _mapper;

        public ContactsController(AddressContext context, IContactRepository contactRepository,IMapper mapper)
        {
            _contactRepository = contactRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts([FromQuery] ContactParams contactParams)
        {


            var contacts = await _contactRepository.GetContactsAsync(contactParams);

            Response.AddPaginationHeader(contacts.CurrentPage, contacts.PageSize, contacts.TotalCount, contacts.TotalPages);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            return await _contactRepository.GetContactByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContact(int id,ContactUpdateDTO contactUpdateDTO)
        {
            var user = await _contactRepository.GetContactByIdAsync(id);

            _mapper.Map(contactUpdateDTO, user);

            user.FirstName = user.FirstName.ToLower();
            user.Surname = user.Surname.ToLower();
            _contactRepository.Update(user);

            if (await _contactRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update contact");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Contact>> DeleteContact(int id)
        {
            var user = await _contactRepository.GetContactByIdAsync(id);

            _contactRepository.DeleteContact(user);

            if (await _contactRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to delete contact");
        }

        //[HttpGet("{firstName}")]
        //public async Task<ActionResult<Contact>> GetContactByFirstName(string firstName)
        //{
        //    return await _contactRepository.GetContactByFirstNameAsync(firstName);
        //}
        [HttpPost]
        public async Task<ActionResult<Contact>> AddContact(Contact contact)
        {

            var newContact = new Contact
            {
                FirstName = contact.FirstName.ToLower(),
                Surname = contact.Surname.ToLower(),
                BirthDate = contact.BirthDate,
                UpdatedDate = contact.UpdatedDate,
                Address = contact.Address,
                Telephone = contact.Telephone,
                Cell = contact.Cell,
                Email = contact.Email
            };


            _contactRepository.Add(newContact);

            if (await _contactRepository.SaveAllAsync()) return Ok(newContact);

            return BadRequest("Failed to create contact");
        }

    }



}
