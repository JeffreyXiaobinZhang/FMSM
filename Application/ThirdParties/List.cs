using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ThirdParties
{
    public class List
    {
        public class Query : IRequest<List<ThirdParty>> { }

        public class Handler : IRequestHandler<Query, List<ThirdParty>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ThirdParty>> Handle(Query request, CancellationToken cancellationToken)
            {
                var thirdparty = await _context.ThirdParties.ToListAsync();
                return thirdparty;
            }
        }
    }
}