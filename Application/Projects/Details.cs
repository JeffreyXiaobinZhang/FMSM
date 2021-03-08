using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Project>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Project>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);

                return project;
            }
        }
    }
}