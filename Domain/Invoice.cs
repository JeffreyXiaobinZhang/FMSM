using System;
using System.ComponentModel.DataAnnotations;


namespace Domain
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
        public string InvoiceType { get; set; }
        public string InvoiceNo { get; set; }
        public string OrderNo { get; set; }
        public DateTime IssueDate { get; set; }
        public string Subtotal { get; set; }
        public string Location { get; set; }
        public string ContractNo { get; set; }
        public string Customer { get; set; }
        public string PaymentStatus { get; set; }
        public string ReferenceNo { get; set; }
        public string Remark { get; set; }

    }
}
