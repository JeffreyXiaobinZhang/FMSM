using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProjectVendors
{
    public class Details
    {
        public class Query : IRequest<ProjectVendor>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProjectVendor>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ProjectVendor> Handle(Query request, CancellationToken cancellationToken)
            {
                var projectvendor = await _context.ProjectVendors.FindAsync(request.Id);

                return projectvendor;
            }
        }
    }
}