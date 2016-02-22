using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using Entities.DTOs;

namespace Helloword01_02.Controllers
{
    public class EmpleadoPeriodoController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        [Route("~/Empleados/{idperiodo}/")]
        [HttpGet]
        public IEnumerable<empleadoDTO> GetEmpleado(long idperiodo)
        {
            var empleados = from e in db.empleado
                            join se in db.empleados_selecionados on e.id equals se.id_empleados
                            where se.estado == 1 && se.id_periodos == idperiodo
                            select new empleadoDTO()
                            {
                                id = e.id,
                                Nombre = e.Nombre,
                                cedula = e.cedula,
                                id_user = e.id_user,
                                RosterPosition = e.RosterPosition,
                                SubArea = e.SubArea,
                                tipo = e.tipo,
                                Area = e.Area,
                                CrewCd = e.CrewCd,
                                Departament = e.Departament,
                                Unit = e.Unit,
                                email = e.email,
                            };
            return empleados;
        }

        [Route("~/RemoveEmpleados/{inutil}")]
        [HttpPut]
        public empleado_seleccionadoDTO UpdateEmpleadoSeleccion(long inutil, empleado_seleccionadoDTO empleado)
        {
            empleados_selecionados e = db.empleados_selecionados.Where(x => x.id_empleados == empleado.id_empleados && x.id_periodos == empleado.id_periodos).FirstOrDefault();
            e.estado = empleado.estado;
            db.Entry(e).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            empleado.id = e.id;
            empleado.id_empleados = e.id_empleados;
            empleado.id_periodos = e.id_periodos;
            empleado.estado = e.estado;
            return empleado;
        }

        [Route("~/AddEmpleados/")]
        [HttpPost]
        public empleado_seleccionadoDTO GetEmpleadoinactivo(empleado_seleccionadoDTO empleado)
        {
            empleados_selecionados e = new empleados_selecionados();

            e = db.empleados_selecionados.Where(x => x.id_empleados == empleado.id_empleados && x.id_periodos == empleado.id_periodos).FirstOrDefault();
            e.estado = empleado.estado;
            db.Entry(e).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            empleado.id = e.id;
            empleado.id_empleados = e.id_empleados;
            empleado.id_periodos = e.id_periodos;
            empleado.estado = e.estado;
            return empleado;
        }

        [Route("~/EmpleadosInactivos/{idperiodo}/")]
        [HttpGet]
        public IQueryable<empleadoDTO> GetEmpleadoinactivo(long idperiodo)
        {
            var empleados = from e in db.empleado
                            join se in db.empleados_selecionados on e.id equals se.id_empleados
                            where se.estado == 0 && se.id_periodos == idperiodo
                            select new empleadoDTO()
                            {
                                id = e.id,
                                Nombre = e.Nombre,
                                cedula = e.cedula,
                                id_user = e.id_user,
                                RosterPosition = e.RosterPosition,
                                SubArea = e.SubArea,
                                tipo = e.tipo,
                                Area = e.Area,
                                CrewCd = e.CrewCd,
                                Departament = e.Departament,
                                Unit = e.Unit,
                                email = e.email,
                            };
            return empleados;
        }
    }
}
