using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookLibrary.Model;

namespace BookLibrary.Data
{
    public class BookLibraryContext : DbContext
    {
        public BookLibraryContext (DbContextOptions<BookLibraryContext> options)
            : base(options)
        {
        }

        public DbSet<BookLibrary.Model.Book> Book { get; set; } = default!;
    }
}
