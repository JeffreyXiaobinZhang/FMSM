using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.SORLists;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SORListsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SORListsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<SORList>>> List()
        {
            return await _mediator.Send(new List.Query());
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<SORList>> Details(string name)
        {
            return await _mediator.Send(new Details.Query{Name = name});
        }  

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{name}")]
        public async Task<ActionResult<Unit>> Edit(string name, Edit.Command command)
        {
            command.Name = name;
            return await _mediator.Send(command);
        }

        [HttpDelete("{name}")]
        public async Task<ActionResult<Unit>> Delete(string name)
        {
            return await _mediator.Send(new Delete.Command{Name = name});
        }
    }
}