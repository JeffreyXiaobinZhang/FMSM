using System;

namespace Domain
{
    public class Warehouse
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string PartNo { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Supplier { get; set; }
        public string Url { get; set; }
    }
}