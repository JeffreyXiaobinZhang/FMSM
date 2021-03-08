using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class SORList
    {
        [Key]
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        [Key]
        public string JobType { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal UnitRate { get; set; }
        public string Type { get; set; }
        public string UOM { get; set; }
        public string Remark { get; set; }
    }
}