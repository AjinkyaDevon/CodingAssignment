using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;
using PhoneBook.Database;
using PhoneBook.Middileware;
using PhoneBook.Repository;
using PhoneBook.Service;

namespace PhoneBook
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var corsPolicy = "allow-all-origins";
            var builder = WebApplication.CreateBuilder(args);
            //Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(corsPolicy, policy =>
                {
                    policy.AllowAnyOrigin();
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();
                });
            });

            //Enforce lower case url
            builder.Services.Configure<RouteOptions>(config =>
            {
                config.LowercaseUrls = true;
            });
            //Add logger
            builder.Logging.AddConsole();
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.ApiKey,
                    Name = "x-api-key",
                    In = ParameterLocation.Header,
                    Scheme = "ApiKey"
                });
                var key = new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "ApiKey"
                    },
                    In = ParameterLocation.Header
                };
                var requirement = new OpenApiSecurityRequirement
                {
                    { key, new List<string>() }
                };
                c.AddSecurityRequirement(requirement);
            });

            builder.Services.AddDbContext<PhoneBookDbContext>();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);
            builder.Services.AddScoped<IContactService,ContactService>();
            builder.Services.AddScoped<IConatactRepository, ContactRepository>();
            builder.Services.AddScoped<ApiKeyAuthFilter>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(corsPolicy);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}