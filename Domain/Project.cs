using System;

namespace Domain
{
    public class Project
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string ProjectCode { get; set; }
        public string JobType { get; set; }
        public string OrderNumber { get; set; }
        public string MaterialOrderNo { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public DateTime JobStartDate { get; set; }
        public DateTime EstimatedCompletionDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string InvoiceNo { get; set; }
        public string Remark { get; set; }
    }
}