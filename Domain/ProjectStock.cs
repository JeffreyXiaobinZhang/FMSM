using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ProjectStock
    {
        [Key]
        public int ProjectId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        [Key]
        public string PartNo { get; set; }
        public int Stock { get; set; }
    }
}