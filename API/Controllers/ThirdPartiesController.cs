using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ThirdParties;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThirdPartiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ThirdPartiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<ThirdParty>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

  /*      [HttpGet("{status}")]
        public async Task<ActionResult<List<controller>>> ListStatus(string status)
        {
            return await _mediator.Send(new ListStatus.Query(status));
        }
  */

        [HttpGet("{name}")]
        public async Task<ActionResult<ThirdParty>> Details(string name)
        {
            return await _mediator.Send(new Details.Query{CompanyName = name});
        }  

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{name}")]
        public async Task<ActionResult<Unit>> Edit(string name, Edit.Command command)
        {
            command.CompanyName = name;
            return await _mediator.Send(command);
        }

        [HttpDelete("{name}")]
        public async Task<ActionResult<Unit>> Delete(string name)
        {
            return await _mediator.Send(new Delete.Command{CompanyName = name});
        }
    }
}