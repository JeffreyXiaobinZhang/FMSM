using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Technicians
{
    public class List
    {
        public class Query : IRequest<List<Technician>> { }

        public class Handler : IRequestHandler<Query, List<Technician>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Technician>> Handle(Query request, CancellationToken cancellationToken)
            {
                var technician = await _context.Technicians.ToListAsync();
                return technician;
            }
        }
    }
}