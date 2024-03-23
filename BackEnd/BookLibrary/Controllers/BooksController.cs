using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookLibrary.Data;
using BookLibrary.Model;
using BookLibrary.Services;
using BookLibrary.Services.DTO;

namespace BookLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController(IBooksService booksService) : ControllerBase
    {
        private readonly IBooksService _booksService = booksService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook([FromQuery] BookFilterDto? filterDto)
        {
            var books = await _booksService.GetBook(filterDto);

            return books.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _booksService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, [FromBody] Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            try
            {
                await _booksService.EditBook(id, book);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromBody] Book book)
        {
            var createdBook = await _booksService.CreateBook(book);

            return CreatedAtAction("GetBook", new { id = createdBook.Id }, createdBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                await _booksService.DeleteBook(id);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
