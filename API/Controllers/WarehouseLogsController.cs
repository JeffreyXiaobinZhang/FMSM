using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.WarehouseLogs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseLogsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WarehouseLogsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<WarehouseLog>>> List(int id)
        {
            return await _mediator.Send(new List.Query(id));
        }

    /*    [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Details(int id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }  */

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

     /*   [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }  */
    }
}