using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProjectVendors
{
    public class Create
    {
        public class Command : IRequest
        {
            //public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string CompanyName { get; set; }
            public string Status { get; set; }
            public string Attachment { get; set; }
            public string Remark { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
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
               var  vendorlist = await _context.ThirdParties.FindAsync(request.CompanyName);
                if (vendorlist == null)
                    throw new Exception("Could not find the Vendor");

                var projectvendor = new ProjectVendor
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectId = request.ProjectId,
                    CompanyName = vendorlist.CompanyName,
                    Status = request.Status,
                    Attachment = request.Attachment,
                    Remark = request.Remark,
                    Phone = vendorlist.Phone,
                    Email = vendorlist.Email
                };

/*                var taskassignment = new TaskAssignment
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
                };*/

                _context.ProjectVendors.Add(projectvendor);
                /*                _context.TaskAssignments.Add(taskassignment);*/
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}