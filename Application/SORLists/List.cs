using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SORLists
{
    public class List
    {
        public class Query : IRequest<List<SORList>> { }

        public class Handler : IRequestHandler<Query, List<SORList>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<SORList>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sorlist = await _context.SORLists.ToListAsync();
                return sorlist;
            }
        }
    }
}