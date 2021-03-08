using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProjectTasks
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string ItemName { get; set; }
            public string ItemDescription { get; set; }
            public string ItemCategory { get; set; }
            public decimal UnitRate { get; set; }
            public decimal OrderQty { get; set; }
            public decimal ClaimedQty { get; set; }
            public decimal CurrentValue { get; set; }
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
              //  var sorlist = new SORList { };
               var  sorlist = await _context.SORLists.FindAsync(request.ItemName, "BDOD");
                if (sorlist == null)
                    throw new Exception("Could not find SOR");

                var projecttask = new ProjectTask
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectId = request.ProjectId,
                    ItemName = request.ItemName,
                    ItemDescription = sorlist.Description,
                    ItemCategory = sorlist.Category,
                    UnitRate = sorlist.UnitRate,
                    OrderQty = request.OrderQty,
                    ClaimedQty = request.ClaimedQty,
                    CurrentValue = sorlist.UnitRate * request.ClaimedQty,
                    Remark = request.Remark
                };

                var taskassignment = new TaskAssignment
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectId = request.ProjectId,
                    ItemName = request.ItemName,
                    ItemDescription = sorlist.Description,
                    ItemCategory = sorlist.Category,
                    TechnicianEmail = "",
                    TeamMember = "",
                    Remark = ""
                };

                _context.ProjectTasks.Add(projecttask);
                _context.TaskAssignments.Add(taskassignment);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}