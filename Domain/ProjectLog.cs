using System;

namespace Domain
{
    public class ProjectLog
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public string Notes { get; set; }
    }
}