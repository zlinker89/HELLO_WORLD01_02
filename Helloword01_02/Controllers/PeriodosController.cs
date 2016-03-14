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
using BL;
namespace Helloword01_02.Controllers
{
    public class PeriodosController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        private empleados_selecionadosBLL empleadoSeleccionadoHelper = new empleados_selecionadosBLL();
        // GET api/Periodos
        public IQueryable<PeriodoDTO> Getperiodos()
        {
            // verificamos
            VerificarFechaVencimiento();
            var periodos = from p in db.periodos
                           orderby p.id descending
                           select new PeriodoDTO()
                           {
                               id = p.id,
                               id_evaluacion = p.id_evaluacion,
                               metodologia = p.metodologia,
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
            // verificamos
            VerificarFechaVencimiento();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Periodos
        [ResponseType(typeof(periodos))]
        public async Task<IHttpActionResult> Postperiodos(periodos periodos)
        {
            if (db.periodos.Where(x => x.nombre == periodos.nombre).ToList().Count() == 0)
            {
                db.periodos.Add(periodos);
                await db.SaveChangesAsync();
                // aqui la logica de negocio
                try
                {
                    empleados_selecionados empleadoseleccionado = new empleados_selecionados();
                    empleadoseleccionado.id_periodos = db.periodos.Where(x => x.nombre == periodos.nombre).FirstOrDefault().id;
                    empleadoSeleccionadoHelper.Create(empleadoseleccionado);
                }
                catch (Exception e)
                {
                    throw e;
                }  
            }
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
        // ------------ verifico la fecha de vencimiento de periodo y la comparo con la actual
        // comparo 
        // si son iguales devuelve 0
        // la fecha de hoy menor que la final devuelve -1
        // la fecha de hoy mayor que la final devuelve 1
        private void VerificarFechaVencimiento()
        {
            List<periodos> periodoslst = db.periodos.ToList();
            foreach (periodos p in periodoslst)
            {
                if (DateTime.Today.CompareTo(p.fechafinal) >= 0)
                {
                    p.estado = 0; // desactivo el periodo por vencimiento
                    db.Entry(p).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
                else
                {
                    if (p.estado == 0)
                    {
                        p.estado = 1; // activo el periodo
                        db.Entry(p).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }
                }
            }
            // ------------ FIN verifico la fecha de vencimiento de periodo y la comparo con la actual
        }
    }
}