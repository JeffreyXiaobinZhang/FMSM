using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Edit
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var invoice = await _context.Invoices.FindAsync(request.Id);

                if (invoice == null) {
                    throw new Exception("Could not find invoice");
                }
                //invoice.Id = request.Id;
                invoice.UpdatedAt = request.UpdatedAt;
                invoice.InvoiceType = request.InvoiceType ?? invoice.InvoiceType;
                invoice.InvoiceNo = request.InvoiceNo ?? invoice.InvoiceNo;
                invoice.OrderNo = request.OrderNo ?? invoice.OrderNo;
                invoice.IssueDate = request.IssueDate;
                invoice.Subtotal = request.Subtotal ?? invoice.Subtotal;
                invoice.Location = request.Location ?? invoice.Location;
                invoice.ContractNo = request.ContractNo ?? invoice.ContractNo;
                invoice.Customer = request.Customer ?? invoice.Customer;
                invoice.PaymentStatus = request.PaymentStatus ?? invoice.PaymentStatus;
                invoice.ReferenceNo = request.ReferenceNo ?? invoice.ReferenceNo;
                invoice.Remark = request.Remark ?? invoice.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");



            }
        }

    }
}
