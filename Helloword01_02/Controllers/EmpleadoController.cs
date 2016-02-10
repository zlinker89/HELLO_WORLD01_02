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
using BLL;
namespace Helloword01_02.Controllers
{
    public class EmpleadoController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        private UsuarioBLL usuarioHelper = new UsuarioBLL();

        // GET api/Empleado
        public IQueryable<empleado> Getempleado()
        {
            return db.empleado;
        }

        // GET api/Empleado/5
        [ResponseType(typeof(empleado))]
        public async Task<IHttpActionResult> Getempleado(long id)
        {
            empleado empleado = await db.empleado.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }

            return Ok(empleado);
        }

        // PUT api/Empleado/5
        public async Task<IHttpActionResult> Putempleado(long id, empleado empleado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != empleado.id)
            {
                return BadRequest();
            }

            db.Entry(empleado).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!empleadoExists(id))
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

        // POST api/Empleado
        [ResponseType(typeof(empleado))]
        public async Task<IHttpActionResult> Postempleado(empleado empleado)
        {
            try
            {
                // crea el objeto
                usuarios u = new usuarios();
                // verifico si ya existe un usuario
                var cont = usuarioHelper.Search(x => x.nombre_usuario == empleado.cedula).ToList();
                if (cont.Count() == 0)
                {
                    // SOLO registra un susuario si este no existe
                    u.nombre_usuario = empleado.cedula;
                    u.password_usuario = empleado.cedula;
                    // insertar el usuario
                    usuarioHelper.Create(u);
                    //obtener el usario
                    u = usuarioHelper.Search(x => x.nombre_usuario == empleado.cedula).First();
                    empleado.id_user = u.id;
                    // guardamos
                    db.empleado.Add(empleado);
                    await db.SaveChangesAsync();
                }
                
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
            

            return CreatedAtRoute("DefaultApi", new { id = empleado.id }, empleado);
        }

        // DELETE api/Empleado/5
        [ResponseType(typeof(empleado))]
        public async Task<IHttpActionResult> Deleteempleado(long id)
        {
            empleado empleado = await db.empleado.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }

            db.empleado.Remove(empleado);
            await db.SaveChangesAsync();

            return Ok(empleado);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool empleadoExists(long id)
        {
            return db.empleado.Count(e => e.id == id) > 0;
        }
    }
}