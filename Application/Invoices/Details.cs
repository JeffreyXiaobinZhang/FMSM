using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Details
    {
        public class Query : IRequest<Domain.Invoice>
        { 
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Invoice>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Invoice> Handle(Query request, CancellationToken cancellationToken)
            {
                var invoice = await _context.Invoices.FindAsync(request.Id);
                
                return invoice;
            }
        }
    }
}
