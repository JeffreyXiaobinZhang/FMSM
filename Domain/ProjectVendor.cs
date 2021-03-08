using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ProjectVendor
    {
        //[Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public string CompanyName { get; set; }
        public string Status { get; set; }
        public string Attachment { get; set; }
        public string Remark { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}