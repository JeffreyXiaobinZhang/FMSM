using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProjectVendors
{
    public class List
    {
        public class Query : IRequest<List<ProjectVendor>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<ProjectVendor>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProjectVendor>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                var vendorlist = await _context.ProjectVendors.Where(x => x.ProjectId == request.Id).ToListAsync();
                return vendorlist;
            }
        }
    }
}