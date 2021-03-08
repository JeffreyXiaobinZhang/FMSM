using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Technicians
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string Email { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
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
                var technician = await _context.Technicians.FindAsync(request.Id);    

                if (technician == null)
                    throw new Exception("Could not find SOR");

                technician.UpdatedAt = DateTime.Now;
                technician.Name = request.Name ?? technician.Name;
                technician.Type = request.Type ?? technician.Type;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}