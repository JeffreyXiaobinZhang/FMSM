using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.SORLists
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
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
                var sorlist = new SORList
                {
                    //        Id = request.Id,
                    Name = request.Name,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    JobType = request.JobType,
                    Category = request.Category,
                    Description = request.Description,
                    UnitRate = request.UnitRate,
                    Type = request.Type,
                    UOM = request.UOM,
                    Remark = request.Remark
                };

                _context.SORLists.Add(sorlist);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}