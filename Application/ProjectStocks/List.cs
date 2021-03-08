using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProjectStocks
{
    public class List
    {
        public class Query : IRequest<List<ProjectStock>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<ProjectStock>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProjectStock>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                var projectstock = await _context.ProjectStocks.Where(x => x.ProjectId == request.Id).ToListAsync();
                
                return projectstock;
            }
        }
    }
}