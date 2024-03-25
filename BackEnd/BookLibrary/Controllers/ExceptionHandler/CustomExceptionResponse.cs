using System.Net;

namespace BookLibrary.Controllers.ExceptionHandler
{
    public class CustomExceptionResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public string? Message { get; set; }
        public string? Path {  get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
