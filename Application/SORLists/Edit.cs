using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.SORLists
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Name { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string JobType { get; set; }
            public string Category { get; set; }
            public string Description { get; set; }
            public decimal UnitRate { get; set; }
            public string Type { get; set; }
            public string UOM { get; set; }
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
                var sorlist = await _context.SORLists.FindAsync(request.Name,"BDOD");    

                if (sorlist == null)
                    throw new Exception("Could not find SOR");

                sorlist.Name = request.Name ?? sorlist.Name;
                sorlist.JobType = request.JobType ?? sorlist.JobType;
                sorlist.Category = request.Category ?? sorlist.Category;
                sorlist.Description = request.Description ?? sorlist.Description;
                sorlist.UnitRate = request.UnitRate;            
                sorlist.Type = request.Type ?? sorlist.Type;
                sorlist.UOM = request.UOM ?? sorlist.UOM;
                sorlist.Remark = request.Remark ?? sorlist.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}