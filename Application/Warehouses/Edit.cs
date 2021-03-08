using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Warehouses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string PartNo { get; set; }
            public string Name { get; set; }
            public int Stock { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
            public string Supplier { get; set; }
            public string Url { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var warehouse = await _context.Warehouses.FindAsync(request.Id);    

                if (warehouse == null)
                    throw new Exception("Could not find SOR");

                warehouse.UpdatedAt = DateTime.Now;
                warehouse.PartNo = request.PartNo ?? warehouse.PartNo;
                warehouse.Name = request.Name ?? warehouse.Name;
                warehouse.Stock = request.Stock;
                warehouse.Price = request.Price;
                warehouse.Description = request.Description ?? warehouse.Description;
                warehouse.Supplier = request.Supplier ?? warehouse.Supplier;
                warehouse.Url = request.Url ?? warehouse.Url;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}