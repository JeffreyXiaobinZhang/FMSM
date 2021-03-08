using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Warehouses
{
    public class List
    {
        public class Query : IRequest<List<Warehouse>> { }

        public class Handler : IRequestHandler<Query, List<Warehouse>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Warehouse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var warehouse = await _context.Warehouses.ToListAsync();
                return warehouse;
            }
        }
    }
}