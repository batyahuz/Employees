namespace Solid.API.Models
{
    public class LoginModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Password { get; set; }
    }
}
