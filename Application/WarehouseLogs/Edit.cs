using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.WarehouseLogs
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string OrderNo { get; set; }
            public string PartNo { get; set; }
            public string UOM { get; set; }
            public int Quantity { get; set; }
            public int Stock { get; set; }
            public string Status { get; set; }
            public string PickedBy { get; set; }
            public string AssignedTo { get; set; }
            public string Url { get; set; }
            public string Remark { get; set; }
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
                var warehouselog = await _context.WarehouseLogs.FindAsync(request.Id);    

                if (warehouselog == null)
                    throw new Exception("Could not find SOR");

                warehouselog.UpdatedAt = DateTime.Now;
                warehouselog.ProjectId = request.ProjectId;
                warehouselog.OrderNo = request.OrderNo ?? warehouselog.OrderNo;
                warehouselog.PartNo = request.PartNo ?? warehouselog.PartNo;
                warehouselog.UOM = request.UOM ?? warehouselog.UOM;
                warehouselog.Quantity = request.Quantity;
                warehouselog.Stock = request.Stock;
                warehouselog.Status = request.Status ?? warehouselog.Status;
                warehouselog.PickedBy = request.PickedBy ?? warehouselog.PickedBy;
                warehouselog.AssignedTo = request.AssignedTo ?? warehouselog.AssignedTo;
                warehouselog.Url = request.Url ?? warehouselog.Url;
                warehouselog.Remark = request.Remark ?? warehouselog.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}