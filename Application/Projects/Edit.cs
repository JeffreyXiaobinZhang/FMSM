using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string ProjectCode { get; set; }
            public string JobType { get; set; }
            public string OrderNumber { get; set; }
            public string MaterialOrderNo { get; set; }
            public string Status { get; set; }
            public string Address { get; set; }
            public DateTime? JobStartDate { get; set; }
            public DateTime? EstimatedCompletionDate { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
            public string InvoiceNo { get; set; }
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
                var project = await _context.Projects.FindAsync(request.Id);    

                if (project == null)
                    throw new Exception("Could not find project");

                project.ProjectCode = request.ProjectCode ?? project.ProjectCode;
                project.JobType = request.JobType ?? project.JobType;
                project.OrderNumber = request.OrderNumber ?? project.OrderNumber ;
                project.MaterialOrderNo = request.MaterialOrderNo ?? project.MaterialOrderNo;
                project.Status = request.Status ?? project.Status;
                project.Address = request.Address ?? project.Address;
                project.JobStartDate = request.JobStartDate ?? project.JobStartDate;
                project.EstimatedCompletionDate = request.EstimatedCompletionDate ?? project.EstimatedCompletionDate;
                project.StartTime = request.StartTime ?? project.StartTime;
                project.EndTime = request.EndTime ?? project.EndTime;
                project.InvoiceNo = request.InvoiceNo ?? project.InvoiceNo;
                project.Remark = request.Remark ?? project.Remark;

            var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}