using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookLibrary.Data;
using BookLibrary.Services;
var MyAllowSpecificOrigins = "LocalHostPolicy";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BookLibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BookLibraryContext") ?? throw new InvalidOperationException("Connection string 'BookLibraryContext' not found.")));

builder.Services.AddTransient<IBooksService, BooksService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
