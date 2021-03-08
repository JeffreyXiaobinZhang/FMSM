using System;

namespace Domain
{
    public class TaskTechnician
    {
        public int ProjectId { get; set; }
        public string Category { get; set; }
        public string TechName { get; set; }
        public string TechEmail { get; set; }
        public string TechType{ get; set; }
        public string TeamMember { get; set; }
        public string Remark { get; set; }
    }
}