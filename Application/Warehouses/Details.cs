using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Warehouses
{
    public class Details
    {
        public class Query : IRequest<Warehouse>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Warehouse>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Warehouse> Handle(Query request, CancellationToken cancellationToken)
            {
                var warehouse = await _context.Warehouses.FindAsync(request.Id);

                return warehouse;
            }
        }
    }
}