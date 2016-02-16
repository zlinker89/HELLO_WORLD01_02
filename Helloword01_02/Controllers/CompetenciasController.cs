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
    public class CompetenciasController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        // GET api/Competencias
        public IQueryable<CompetenciaDTO> Getcompetencias()
        {
            var competencias = from c in db.competencias
                               where c.idevaluacion == 1
                               select new CompetenciaDTO()
                               {
                                   id = c.id,
                                   nombre = c.nombre,
                                   rango_evaluacion = c.rango_evaluacion
                               };
            return competencias;
        }

        // GET api/Competencias/5
        [ResponseType(typeof(competencias))]
        public async Task<IHttpActionResult> Getcompetencias(long id)
        {
            competencias competencias = await db.competencias.FindAsync(id);
            if (competencias == null)
            {
                return NotFound();
            }

            return Ok(competencias);
        }

       

        // PUT api/Competencias/5
        public async Task<IHttpActionResult> Putcompetencias(long id, competencias competencias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != competencias.id)
            {
                return BadRequest();
            }

            db.Entry(competencias).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!competenciasExists(id))
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

        // POST api/Competencias
        [ResponseType(typeof(competencias))]
        public async Task<IHttpActionResult> Postcompetencias(competencias competencias)
        {
            try
            {
                List<competencias> comp = db.competencias.Where(x => x.nombre == competencias.nombre).ToList();
                if (comp.Count() == 0)
                {
                    db.competencias.Add(competencias);
                    await db.SaveChangesAsync();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return CreatedAtRoute("DefaultApi", new { id = competencias.id }, competencias);
        }

        // DELETE api/Competencias/5
        [ResponseType(typeof(competencias))]
        public async Task<IHttpActionResult> Deletecompetencias(long id)
        {
            competencias competencias = await db.competencias.FindAsync(id);
            if (competencias == null)
            {
                return NotFound();
            }

            db.competencias.Remove(competencias);
            await db.SaveChangesAsync();

            return Ok(competencias);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool competenciasExists(long id)
        {
            return db.competencias.Count(e => e.id == id) > 0;
        }
    }
}