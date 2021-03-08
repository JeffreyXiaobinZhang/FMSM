using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ThirdParties
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string CompanyName { get; set; }
            public string Status { get; set; }
            public string Type { get; set; }
            public string ContactPerson { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string Project { get; set; }
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
                var activity = new ThirdParty
                {
                    Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CompanyName = request.CompanyName,
                    Status = request.Status,
                    Type = request.Type,
                    ContactPerson =  request.ContactPerson,
                    Phone = request.Phone,
                    Email = request.Email,
                    Project = request.Project
                };

                _context.ThirdParties.Add(activity);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}