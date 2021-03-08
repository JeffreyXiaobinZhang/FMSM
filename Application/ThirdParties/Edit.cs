using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ThirdParties
{
    public class Edit
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
                var thirdparty = await _context.ThirdParties.FindAsync(request.CompanyName);    

                if (thirdparty == null)
                    throw new Exception("Could not find the thirdparty");
                //thirdparty.Id = request.Id ?? thirdparty.Id;
                thirdparty.UpdatedAt = DateTime.Now;
                thirdparty.CompanyName= request.CompanyName ?? thirdparty.CompanyName;
                thirdparty.Status = request.Status ?? thirdparty.Status;
                thirdparty.Type = request.Type ?? thirdparty.Type;
                thirdparty.ContactPerson = request.ContactPerson ?? thirdparty.ContactPerson;
                thirdparty.Phone = request.Phone ?? thirdparty.Phone;
                thirdparty.Email = request.Email ?? thirdparty.Email;
                thirdparty.Project = request.Project ?? thirdparty.Project;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}