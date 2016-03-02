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

namespace Helloword01_02.Controllers
{
    public class R_EvaluacionController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        // GET api/R_Evaluacion
        public IQueryable<R_Evaluacion> GetR_Evaluacion()
        {
            return db.R_Evaluacion;
        }

        // GET api/R_Evaluacion/5
        [ResponseType(typeof(R_Evaluacion))]
        public async Task<IHttpActionResult> GetR_Evaluacion(long id)
        {
            R_Evaluacion r_evaluacion = await db.R_Evaluacion.FindAsync(id);
            if (r_evaluacion == null)
            {
                return NotFound();
            }

            return Ok(r_evaluacion);
        }

        // PUT api/R_Evaluacion/5
        public async Task<IHttpActionResult> PutR_Evaluacion(long id, R_Evaluacion r_evaluacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != r_evaluacion.id)
            {
                return BadRequest();
            }

            db.Entry(r_evaluacion).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!R_EvaluacionExists(id))
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

        // POST api/R_Evaluacion
        [ResponseType(typeof(R_Evaluacion))]
        public async Task<IHttpActionResult> PostR_Evaluacion(R_Evaluacion respuesta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.R_Evaluacion.Add(respuesta);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = respuesta.id }, respuesta);
        }

        // DELETE api/R_Evaluacion/5
        [ResponseType(typeof(R_Evaluacion))]
        public async Task<IHttpActionResult> DeleteR_Evaluacion(long id)
        {
            R_Evaluacion r_evaluacion = await db.R_Evaluacion.FindAsync(id);
            if (r_evaluacion == null)
            {
                return NotFound();
            }

            db.R_Evaluacion.Remove(r_evaluacion);
            await db.SaveChangesAsync();

            return Ok(r_evaluacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool R_EvaluacionExists(long id)
        {
            return db.R_Evaluacion.Count(e => e.id == id) > 0;
        }
    }
}