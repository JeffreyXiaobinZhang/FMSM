using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using MediatR;
using Persistence;

namespace Application.ProjectTasks
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
                var projecttask = await _context.ProjectTasks.FindAsync(request.Id);

                if (projecttask == null)
                    throw new Exception("Could not find project");

                var projectid = projecttask.ProjectId;

                var itemname = projecttask.ItemName;

                _context.ProjectTasks.Remove(projecttask);              

                var success = await _context.SaveChangesAsync() > 0;

                var taskassignment = await _context.TaskAssignments.Where(x => x.ProjectId == projectid && x.ItemName == itemname).ToListAsync();

                if (taskassignment == null)
                    throw new Exception("Could not find project");

                _context.TaskAssignments.RemoveRange(taskassignment);

                success = await _context.SaveChangesAsync() > 0; 

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}