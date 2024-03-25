using BookLibrary.Controllers.ExceptionHandler;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net;
using System.Text;

namespace BookLibrary.Controllers.Middleware
{
    public class CustomExceptionHandler(ILogger<CustomExceptionHandler> _logger) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var customExceptionResponse = new CustomExceptionResponse
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Message = null,
                Path = $"{httpContext.Request.Method} {httpContext.Request.Path}"
            };
            var handled = true;

            if (exception is ArgumentNullException || exception is ArgumentOutOfRangeException)
            {
                httpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                _logger.LogError($"Error Message: {exception.Message}, time of occurance: {DateTime.Now}\nUser probably provided wrong data.");
                customExceptionResponse.Message = exception.Message;
                customExceptionResponse.StatusCode = HttpStatusCode.NotFound;
            }
            else if (exception is DbUpdateConcurrencyException)
            {
                _logger.LogError($"Error Message: {exception.Message}, time of occurance: {DateTime.Now}\nConcurrency error on database.");
            }
            else
            {
                _logger.LogError($"Unhandled exception: {exception.Message}, time of occurance: {DateTime.Now}.");
                handled = false;
            }

            await httpContext.Response.WriteAsJsonAsync(customExceptionResponse);

            return handled;
        }
    }
}
