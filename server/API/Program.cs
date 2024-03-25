using API.Core.Repositories;
using API.Core.Service;
using API.Data;
using API.Service;
using Microsoft.EntityFrameworkCore;
using Solid.API.Mapping;
using Solid.Core;
using Solid.Core.Repositories;
using Solid.Core.Services;
using Solid.Data.Reposotories;
using Solid.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IRoleService, RoleService>();

builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration["ConnectionString"]));

builder.Services.AddAutoMapper(typeof(Mapping), typeof(ApiMappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
