using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ThirdParty
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        [Key] 
        public string CompanyName { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Project { get; set; }
    }
}