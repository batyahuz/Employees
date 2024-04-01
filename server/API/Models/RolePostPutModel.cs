using Solid.Core.Entities;

namespace Solid.API.Models
{
    public class RolePostPutModel
    {
        public int Id { get; set; }
        public int NameId { get; set; }
        public bool IsManagerial { get; set; }
        public DateOnly StartRole { get; set; }
    }
}
