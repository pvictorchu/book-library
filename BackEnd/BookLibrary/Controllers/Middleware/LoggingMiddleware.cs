using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace BookLibrary.Controllers.Middleware
{
    public class LoggingMiddleware(RequestDelegate _next, ILogger<LoggingMiddleware> _logger)
    {
        public async Task Invoke(HttpContext context)
        {
            _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

            if (context.Request.ContentLength != null && context.Request.ContentLength > 0)
            {
                context.Request.EnableBuffering();
                var requestBody = await ReadRequestBody(context.Request);
                _logger.LogInformation($"Request Body: {requestBody}");
                context.Request.Body.Position = 0;
            }
            if (context.Request.Query != null && context.Request.Query.Count > 0)
            {
                var requestQuery = ReadRequestQuery(context.Request);
                _logger.LogInformation($"Request Query: {requestQuery}");
            }

            await _next(context);

            _logger.LogInformation($"Response: {context.Response.StatusCode}");
        }

        private string ReadRequestQuery(HttpRequest request)
        {
            var query = request.Query;

            return string.Join(',', query.Select(x => $"Key: {x.Key} Value: {x.Value}"));
        }

        private async Task<string> ReadRequestBody(HttpRequest request)
        {
            request.EnableBuffering();
            var body = request.Body;

            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestBody = Encoding.UTF8.GetString(buffer);
            request.Body = body;

            return $"{requestBody}";
        }
    }
}
