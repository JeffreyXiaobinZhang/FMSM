using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ProjectTasks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string ItemName { get; set; }
            public string ItemDescription { get; set; }
            public string ItemCategory { get; set; }
            public decimal UnitRate { get; set; }
            public decimal OrderQty { get; set; }
            public decimal ClaimedQty { get; set; }
            public decimal CurrentValue { get; set; }
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
                var projecttask = await _context.ProjectTasks.FindAsync(request.Id);    

                if (projecttask == null)
                    throw new Exception("Could not find task");

                projecttask.OrderQty = request.OrderQty;
                projecttask.ClaimedQty = request.ClaimedQty;
                projecttask.Remark = request.Remark ?? projecttask.Remark;

            var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}