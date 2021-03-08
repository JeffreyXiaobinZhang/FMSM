using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProjectLogs
{
    public class List
    {
        public class Query : IRequest<List<ProjectLog>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<ProjectLog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProjectLog>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                var projectlog = await _context.ProjectLogs.Where(x => x.ProjectId == request.Id).ToListAsync();
                
                return projectlog;
            }
        }
    }
}