using System;

namespace Domain
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCategory { get; set; }
        public decimal UnitRate { get; set; }
        public decimal OrderQty { get; set; }
        public decimal ClaimedQty { get; set; }
        public decimal CurrentValue { get; set; }
        public string Remark { get; set; }
    }
}