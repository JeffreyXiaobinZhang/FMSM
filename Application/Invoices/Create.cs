using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Create
    {
        public class Command : IRequest {
            //public int Id { get; set; }
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
                var invoice = new Invoice
                {
                    //Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    InvoiceType = request.InvoiceType,
                    InvoiceNo = request.InvoiceNo,
                    OrderNo = request.OrderNo,
                    IssueDate = request.IssueDate,
                    Subtotal = request.Subtotal,
                    Location = request.Location,
                    ContractNo = request.ContractNo,
                    Customer = request.Customer,
                    PaymentStatus = request.PaymentStatus,
                    ReferenceNo = request.ReferenceNo,
                    Remark = request.Remark
                };
                //Add the new invoices into DbContext
                _context.Invoices.Add(invoice);

                // wait until DbContext save the changes
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
