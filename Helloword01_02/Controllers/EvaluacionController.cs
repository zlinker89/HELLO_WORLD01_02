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
    public class EvaluacionController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        // GET api/Evaluacion
        public IQueryable<EvaluacionDTO> Getevaluacion()
        {
            var evaluaciones = from e in db.evaluacion 
                select new EvaluacionDTO()
                {
                    id = e.id,
                    nombre = e.nombre,
                    tipo_de_evaluacion = e.tipo_de_evaluacion,
                    estado = e.estado

                };
            return evaluaciones;
        }

        // GET api/Evaluacion/5
        [ResponseType(typeof(EvaluacionDTO))]
        public async Task<IHttpActionResult> Getevaluacion(long id)
        {
            var evaluacion = await db.evaluacion.Select(e =>
                new EvaluacionDTO()
                {
                    id = e.id,
                    nombre = e.nombre,
                    tipo_de_evaluacion = e.tipo_de_evaluacion,
                    estado = e.estado
                }
                ).SingleOrDefaultAsync(e => e.id == id);

            if (evaluacion == null)
            {
                return NotFound();
            }

            return Ok(evaluacion);
        }

        // PUT api/Evaluacion/5
        public async Task<IHttpActionResult> Putevaluacion(long id, evaluacion evaluacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != evaluacion.id)
            {
                return BadRequest();
            }

            db.Entry(evaluacion).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!evaluacionExists(id))
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

        // POST api/Evaluacion
        [ResponseType(typeof(evaluacion))]
        public async Task<IHttpActionResult> Postevaluacion(evaluacion evaluacion)
        {
            try
            {
                if(evaluacion.nombre == null)
                {
                    return BadRequest(ModelState);
                }
                List<evaluacion> evaluaciones = db.evaluacion.Where(x => x.nombre == evaluacion.nombre).ToList();
                if (evaluaciones.Count() == 0)
                {
                    db.evaluacion.Add(evaluacion);
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
                throw e;
            }

            

            return CreatedAtRoute("DefaultApi", new { id = evaluacion.id }, evaluacion);
        }

        // DELETE api/Evaluacion/5
        [ResponseType(typeof(evaluacion))]
        public async Task<IHttpActionResult> Deleteevaluacion(long id)
        {
            evaluacion evaluacion = await db.evaluacion.FindAsync(id);
            if (evaluacion == null)
            {
                return NotFound();
            }

            db.evaluacion.Remove(evaluacion);
            await db.SaveChangesAsync();

            return Ok(evaluacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool evaluacionExists(long id)
        {
            return db.evaluacion.Count(e => e.id == id) > 0;
        }
    }
}