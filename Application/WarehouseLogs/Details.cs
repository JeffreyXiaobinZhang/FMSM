using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.WarehouseLogs
{
    public class Details
    {
        public class Query : IRequest<WarehouseLog>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, WarehouseLog>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<WarehouseLog> Handle(Query request, CancellationToken cancellationToken)
            {
                var warehouselog = await _context.WarehouseLogs.FindAsync(request.Id);

                return warehouselog;
            }
        }
    }
}