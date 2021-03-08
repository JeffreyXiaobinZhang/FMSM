using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string ProjectCode { get; set; }
            public string JobType { get; set; }
            public string OrderNumber { get; set; }
            public string MaterialOrderNo { get; set; }
            public string Status { get; set; }
            public string Address { get; set; }
            public DateTime JobStartDate { get; set; }
            public DateTime EstimatedCompletionDate { get; set; }
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
                var project = new Project
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectCode = request.ProjectCode,
                    JobType = request.JobType,
                    OrderNumber = request.OrderNumber,
                    MaterialOrderNo = request.MaterialOrderNo,
                    Status = request.Status,
                    Address = request.Address,
                    JobStartDate = request.JobStartDate,
                    EstimatedCompletionDate = request.EstimatedCompletionDate,
                    StartTime = request.StartTime,
                    EndTime = request.EndTime,
                    InvoiceNo = request.InvoiceNo,
                    Remark = request.Remark
                };

                _context.Projects.Add(project);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var projectlog = new ProjectLog
                    {
                        //        Id = request.Id,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        ProjectId = project.Id,
                        Notes = "Project created at: " + project.CreatedAt
                    };

                    _context.ProjectLogs.Add(projectlog);
                    success = await _context.SaveChangesAsync() > 0;
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}