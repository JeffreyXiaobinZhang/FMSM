using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.TaskAssignments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int ProjectId { get; set; }
            public string Category { get; set; }
            public string TechName { get; set; }
            public string TechEmail { get; set; }
            public string TechType { get; set; }
            public string TeamMember { get; set; }
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
                var taskassignment = await _context.TaskAssignments.Where(x =>x.ProjectId==request.ProjectId && x.ItemCategory==request.Category).ToListAsync();

                if (taskassignment == null)
                    throw new Exception("Could not find task");

                taskassignment.ForEach(a => { a.TechnicianEmail = request.TechEmail; a.TeamMember = request.TeamMember; a.Remark = request.Remark; }) ;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}