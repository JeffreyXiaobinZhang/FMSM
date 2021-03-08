using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.SORLists
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Name { get; set; }
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
                var sorlist = await _context.SORLists.FindAsync(request.Name,"BDOD");

                if (sorlist == null)
                    throw new Exception("Could not find SOR");

                _context.Remove(sorlist);              

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}