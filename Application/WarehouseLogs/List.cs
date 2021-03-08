using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WarehouseLogs
{
    public class List
    {
        public class Query : IRequest<List<WarehouseLog>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<WarehouseLog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<WarehouseLog>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var Warehouse = await _context.Activities.ToListAsync();
                var Warehouselog = await _context.WarehouseLogs.Where(x => x.ProjectId == request.Id).ToListAsync();
                
                return Warehouselog;
            }
        }
    }
}