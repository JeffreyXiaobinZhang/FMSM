using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Projects;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProjectsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

  /*      [HttpGet("{status}")]
        public async Task<ActionResult<List<Project>>> ListStatus(string status)
        {
            return await _mediator.Send(new ListStatus.Query(status));
        }
  */

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Details(int id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }  

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}