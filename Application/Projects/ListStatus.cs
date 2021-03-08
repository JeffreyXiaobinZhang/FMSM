using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class ListStatus
    {
        public class Query : IRequest<List<Project>> {
            public Query(string status)
            {
                Status = status;
            }
            public string Status { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<Project>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                var project = await _context.Projects.Where(x => x.Status.Contains(request.Status)).ToListAsync();
                return project;
            }
        }
    }
}