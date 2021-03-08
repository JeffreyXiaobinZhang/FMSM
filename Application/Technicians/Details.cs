using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Technicians
{
    public class Details
    {
        public class Query : IRequest<Technician>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Technician>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Technician> Handle(Query request, CancellationToken cancellationToken)
            {
                var technician = await _context.Technicians.FindAsync(request.Id);

                return technician;
            }
        }
    }
}