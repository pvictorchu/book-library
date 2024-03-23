using BookLibrary.Model;
using BookLibrary.Services.DTO;

namespace BookLibrary.Services
{
    public interface IBooksService
    {
        Task DeleteBook(int id);
        Task<IEnumerable<Book>> GetBook(BookFilterDto? filterDto);
        Task<Book?> GetBook(int id);
        Task<Book> CreateBook(Book book);
        Task EditBook(int id, Book book);
    }
}