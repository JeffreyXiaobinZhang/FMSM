using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.SORLists
{
    public class Details
    {
        public class Query : IRequest<SORList>
        {
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Query, SORList>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<SORList> Handle(Query request, CancellationToken cancellationToken)
            {
                var sorlist = await _context.SORLists.FindAsync(request.Name,"BDOD");

                return sorlist;
            }
        }
    }
}