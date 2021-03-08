using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Warehouses
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
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
                var warehouse = new Warehouse
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    PartNo = request.PartNo,
                    Name = request.Name,
                    Stock = request.Stock,
                    Price = request.Price,
                    Description = request.Description,
                    Supplier = request.Supplier,
                    Url = request.Url,
                };

                _context.Warehouses.Add(warehouse);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}