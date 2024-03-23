using BookLibrary.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookLibrary.Data.Configuration
{
    public class BookConfiguring : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.ToTable("books");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("book_id").IsRequired();
            builder.Property(e => e.Title).HasColumnName("title").IsRequired();
            builder.Property(e => e.FirstName).HasColumnName("first_name").IsRequired();
            builder.Property(e => e.LastName).HasColumnName("last_name").IsRequired();
            builder.Property(e => e.TotalCopies).HasColumnName("total_copies").IsRequired().HasDefaultValue(0);
            builder.Property(e => e.CopiesInUse).HasColumnName("copies_in_use").IsRequired().HasDefaultValue(0);
            builder.Property(e => e.Type).HasColumnName("type");
            builder.Property(e => e.ISBN).HasColumnName("isbn");
            builder.Property(e => e.Category).HasColumnName("category");
        }
    }
}
