using System;

namespace Domain
{
    public class TaskAssignment
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCategory { get; set; }
        public string TechnicianEmail { get; set; }
        public string TeamMember { get; set; }
        public string Remark { get; set; }
    }
}