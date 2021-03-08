using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ProjectVendors
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string CompanyName { get; set; }
            public string Status { get; set; }
            public string Attachment { get; set; }
            public string Remark { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
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
                var vendorlist = await _context.ProjectVendors.FindAsync(request.Id);    

                if (vendorlist == null)
                    throw new Exception("Could not find the vendor");

                vendorlist.Status = request.Status;
                vendorlist.Attachment = request.Attachment;
                vendorlist.Remark = request.Remark ?? vendorlist.Remark;

            var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}