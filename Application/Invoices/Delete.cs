using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Delete
    {
        public class Command : IRequest
        { 
            public int Id { get; set; }
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
                //DbSet.FindAsync: Asynchronously finds an entity with the given primary key value.

                var invoice = await _context.Invoices.FindAsync(request.Id);

                if (invoice == null)
                {
                    throw new Exception("Could not find invoice");
                }
                _context.Remove(invoice);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
                


            }
        }
    }
}
