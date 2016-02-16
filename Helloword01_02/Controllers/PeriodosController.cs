using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Entities;
using Entities.DTOs;

namespace Helloword01_02.Controllers
{
    public class PeriodosController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        // GET api/Periodos
        public IQueryable<PeriodoDTO> Getperiodos()
        {
            var periodos = from p in db.periodos
                           select new PeriodoDTO()
                           {
                               id = p.id,
                               id_evaluacion = p.id_evaluacion,
                               metodologia = p.metodologia,
                               Tmuestra = p.Tmuestra,
                               fechainicio = p.fechainicio,
                               fechafinal = p.fechafinal,
                               estado = p.estado,
                               nombre = p.nombre
                           };
            return periodos;
        }

        // GET api/Periodos/5
        [ResponseType(typeof(periodos))]
        public async Task<IHttpActionResult> Getperiodos(long id)
        {
            periodos periodos = await db.periodos.FindAsync(id);
            if (periodos == null)
            {
                return NotFound();
            }

            return Ok(periodos);
        }

        // PUT api/Periodos/5
        public async Task<IHttpActionResult> Putperiodos(long id, periodos periodos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != periodos.id)
            {
                return BadRequest();
            }

            db.Entry(periodos).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!periodosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Periodos
        [ResponseType(typeof(periodos))]
        public async Task<IHttpActionResult> Postperiodos(periodos periodos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.periodos.Add(periodos);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = periodos.id }, periodos);
        }

        // DELETE api/Periodos/5
        [ResponseType(typeof(periodos))]
        public async Task<IHttpActionResult> Deleteperiodos(long id)
        {
            periodos periodos = await db.periodos.FindAsync(id);
            if (periodos == null)
            {
                return NotFound();
            }

            db.periodos.Remove(periodos);
            await db.SaveChangesAsync();

            return Ok(periodos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool periodosExists(long id)
        {
            return db.periodos.Count(e => e.id == id) > 0;
        }
    }
}