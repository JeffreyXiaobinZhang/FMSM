using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TaskAssignments
{
    public class List
    {
        public class Query : IRequest<List<TaskTechnician>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<TaskTechnician>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TaskTechnician>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                //  var taskassignment = await _context.TaskAssignments.Where(x => x.ProjectId == request.Id).ToListAsync();
                /*   var tasktechnician = await _context.TaskAssignments.Join(_context.Technicians,a=>a.TechnicianEmail,b=>b.Email,(a,b)=>new TaskTechnician{
                       ProjectId = a.ProjectId,
                       Category = a.ItemCategory,
                       TechName = b.Name,
                       TechEmail = b.Email,
                       TechType = b.Type,
                   }).Where(x => x.ProjectId == request.Id).Distinct().ToListAsync();  */

                var tasktechnician = await _context.TaskAssignments.SelectMany(
                    task => _context.Technicians.Where
                    (tech => task.TechnicianEmail == tech.Email).DefaultIfEmpty(),
                    (task, tech) => new TaskTechnician
                    {
                        ProjectId = task.ProjectId,
                        Category = task.ItemCategory,
                        TechName = tech.Name,
                        TechEmail = tech.Email,
                        TechType = tech.Type,
                        TeamMember = task.TeamMember,
                        Remark = task.Remark,
                    }).Where(x => x.ProjectId == request.Id).Distinct().ToListAsync();

                /*    var tasktechnician = await _context.TaskAssignments.GroupJoin(_context.Technicians,
                    task =>  task.TechnicianEmail ,
                    tech =>  tech.Email ,
                    (x, y) => new { TaskAssignments = x, Technicians = y })
                    .SelectMany(x => x.Technicians.DefaultIfEmpty(),
                    (x, y) => new TaskTechnician
                    {
                        ProjectId = x.TaskAssignments.ProjectId,
                        Category = x.TaskAssignments.ItemCategory,
                        TechName = y.Name,
                    });
                */

                 


                return tasktechnician;
            }
        }
    }
}