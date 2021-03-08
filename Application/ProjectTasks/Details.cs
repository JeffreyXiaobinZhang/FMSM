using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProjectTasks
{
    public class Details
    {
        public class Query : IRequest<ProjectTask>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProjectTask>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ProjectTask> Handle(Query request, CancellationToken cancellationToken)
            {
                var projecttask = await _context.ProjectTasks.FindAsync(request.Id);

                return projecttask;
            }
        }
    }
}