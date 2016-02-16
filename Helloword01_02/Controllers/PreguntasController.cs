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
    public class PreguntasController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        // GET api/Preguntas
        public IQueryable<preguntas> Getpreguntas()
        {
            return db.preguntas;
        }

        // GET api/Preguntas/5
        [ResponseType(typeof(preguntas))]
        public async Task<IHttpActionResult> Getpreguntas(long id)
        {
            preguntas preguntas = await db.preguntas.FindAsync(id);
            if (preguntas == null)
            {
                return NotFound();
            }

            return Ok(preguntas);
        }

        // PUT api/Preguntas/5
        public async Task<IHttpActionResult> Putpreguntas(long id, preguntas preguntas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != preguntas.id)
            {
                return BadRequest();
            }

            db.Entry(preguntas).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!preguntasExists(id))
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

        // POST api/Preguntas
        [ResponseType(typeof(preguntas))]
        public async Task<IHttpActionResult> Postpreguntas(preguntas preguntas)
        {

            db.preguntas.Add(preguntas);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = preguntas.id }, preguntas);
        }

        // DELETE api/Preguntas/5
        [ResponseType(typeof(preguntas))]
        public async Task<IHttpActionResult> Deletepreguntas(long id)
        {
            preguntas preguntas = await db.preguntas.FindAsync(id);
            if (preguntas == null)
            {
                return NotFound();
            }

            db.preguntas.Remove(preguntas);
            await db.SaveChangesAsync();

            return Ok(preguntas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool preguntasExists(long id)
        {
            return db.preguntas.Count(e => e.id == id) > 0;
        }
    }
}