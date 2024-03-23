using BookLibrary.Data;
using BookLibrary.Model;
using BookLibrary.Services.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Services
{
    public class BooksService : IBooksService
    {
        private readonly BookLibraryContext _context;

        public BooksService(BookLibraryContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBook(BookFilterDto? filterDto)
        {
            var books = _context.Book.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterDto.Title))
                books = books.Where(book => book.Title.Contains(filterDto.Title));
            if (!string.IsNullOrWhiteSpace(filterDto.FirstName))
                books = books.Where(book => book.FirstName.Contains(filterDto.FirstName));
            if (!string.IsNullOrWhiteSpace(filterDto.LastName))
                books = books.Where(book => book.LastName.Contains(filterDto.LastName));
            if (!string.IsNullOrWhiteSpace(filterDto.Type))
                books = books.Where(book => book.Type.Contains(filterDto.Type));
            if (!string.IsNullOrWhiteSpace(filterDto.ISBN))
                books = books.Where(book => book.ISBN.Contains(filterDto.ISBN));
            if (!string.IsNullOrWhiteSpace(filterDto.Category))
                books = books.Where(book => book.Category.Contains(filterDto.Category));
            if (filterDto.Available.HasValue)
                books = books.Where(book => filterDto.Available.Value ? book.TotalCopies > book.CopiesInUse : book.TotalCopies <= book.CopiesInUse);

            return await books.ToListAsync();
        }

        public async Task<Book?> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            return book;
        }

        public async Task EditBook(int id, Book book)
        {
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    throw new ArgumentNullException(nameof(id));
                }
                else
                {
                    throw;
                }
            }

            return;
        }

        public async Task<Book> CreateBook(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return book;
        }

        public async Task DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return;
        }

        private bool BookExists(int id)
        {
            return _context.Book.Any(e => e.Id == id);
        }
    }
}
