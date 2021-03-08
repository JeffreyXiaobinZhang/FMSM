using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ThirdParties
{
    public class Details
    {
        public class Query : IRequest<ThirdParty>
        {
            //public int Id { get; set; }
            public string CompanyName { get; set; }
        }

        public class Handler : IRequestHandler<Query, ThirdParty>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ThirdParty> Handle(Query request, CancellationToken cancellationToken)
            {
                var thirdparty = await _context.ThirdParties.FindAsync(request.CompanyName);

                return thirdparty;
            }
        }
    }
}