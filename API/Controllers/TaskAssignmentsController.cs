using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.TaskAssignments;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskAssignmentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TaskAssignmentsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<TaskTechnician>>> List(int id)
        {
            return await _mediator.Send(new List.Query(id));
        }  

    /*    [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        } */

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.ProjectId = id;
            return await _mediator.Send(command);
        }

        /*     [HttpDelete("{id}")]
             public async Task<ActionResult<Unit>> Delete(int id)
             {
                 return await _mediator.Send(new Delete.Command{Id = id});
             }   */
    }
}