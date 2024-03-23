namespace BookLibrary.Services.DTO
{
    public class BookFilterDto
    {
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Type { get; set; }
        public string? ISBN { get; set; }
        public string? Category { get; set; }
        public bool? Available { get; set; }
    }
}