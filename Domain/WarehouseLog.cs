using System;

namespace Domain
{
    public class WarehouseLog
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public string OrderNo { get; set; }
        public string PartNo { get; set; }
        public string UOM { get; set; }
        public int Quantity { get; set; }
        public int Stock { get; set; }
        public string Status { get; set; }
        public string PickedBy { get; set; }
        public string AssignedTo { get; set; }
        public string Url { get; set; }
        public string Remark { get; set; }
    }
}