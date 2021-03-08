using System;

namespace Domain
{
    public class Technician
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}