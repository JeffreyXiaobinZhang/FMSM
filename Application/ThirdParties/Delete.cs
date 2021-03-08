using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ThirdParties
{
    public class Delete
    {
        public class Command : IRequest
        {
            //public int Id { get; set; }
            public string CompanyName { get; set; }
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
                var activity = await _context.ThirdParties.FindAsync(request.CompanyName);

                if (activity == null)
                    throw new Exception("Could not find the thirdparty");

                _context.Remove(activity);              

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}