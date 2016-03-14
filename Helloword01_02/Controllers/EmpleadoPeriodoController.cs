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
                                liderado1 = se.liderado1,
                                liderado2 = se.liderado2,
                                liderado3 = se.liderado3,
                                liderado4 = se.liderado4,
                                liderado5 = se.liderado5,
                                liderado6 = se.liderado6,
                                liderado7 = se.liderado7,
                                liderado8 = se.liderado8,
                                liderado9 = se.liderado9,
                                liderado10 = se.liderado10,
                                par1 = se.par1,
                                par2 = se.par2,
                                par3 = se.par3,
                                par4 = se.par4,
                                par5 = se.par5,
                                jefe = se.jefe
                            };
            return empleados;
        }


        [Route("~/PeriodoEmpleados/{idempleado}/")]
        [HttpGet]
        public IEnumerable<PeriodoDTO> GetPeriodoByIdEmpleado(long idempleado)
        {
            var periodos = from p in db.periodos
                           join es in db.empleados_selecionados on p.id equals es.id_periodos
                           where es.estado == 1 && p.estado != 0 && es.id_empleados == idempleado
                           orderby p.id descending
                           select new PeriodoDTO()
                           {
                               id = p.id,
                               id_evaluacion = p.id_evaluacion,
                               metodologia = p.metodologia,
                               nombre = p.nombre,
                               estado = p.estado,
                               fechafinal = p.fechafinal,
                               fechainicio = p.fechainicio
                           };
            return periodos;
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
                                liderado1 = se.liderado1,
                                liderado2 = se.liderado2,
                                liderado3 = se.liderado3,
                                liderado4 = se.liderado4,
                                liderado5 = se.liderado5,
                                liderado6 = se.liderado6,
                                liderado7 = se.liderado7,
                                liderado8 = se.liderado8,
                                liderado9 = se.liderado9,
                                liderado10 = se.liderado10,
                                par1 = se.par1,
                                par2 = se.par2,
                                par3 = se.par3,
                                par4 = se.par4,
                                par5 = se.par5,
                                jefe = se.jefe
                            };
            return empleados;
        }

        [Route("~/UpdateEmpleadosSeleccionados/{inutil}")]
        [HttpPut]
        public empleado_seleccionadoDTO PutEmpleadoSeleccionado(long inutil, empleado_seleccionadoDTO empleado)
        {
            empleados_selecionados e = new empleados_selecionados();
            e = db.empleados_selecionados.Where(x => x.id_empleados == empleado.id_empleados && x.id_periodos == empleado.id_periodos).FirstOrDefault();
            e.jefe = empleado.jefe;
            e.liderado1 = empleado.liderado1;
            e.liderado2 = empleado.liderado2;
            e.liderado3 = empleado.liderado3;
            e.liderado4 = empleado.liderado4;
            e.liderado5 = empleado.liderado5;
            e.liderado6 = empleado.liderado6;
            e.liderado7 = empleado.liderado7;
            e.liderado8 = empleado.liderado8;
            e.liderado9 = empleado.liderado9;
            e.liderado10 = empleado.liderado10;
            e.par1 = empleado.par1;
            e.par2 = empleado.par2;
            e.par3 = empleado.par3;
            e.par4 = empleado.par4;
            e.par5 = empleado.par5;

            db.Entry(e).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return empleado;
        }

        [Route("~/GetEmpleadosSeleccionado/{idperiodo}/{idempleado}/")]
        [HttpGet]
        public empleadoDTO PutEmpleadoSeleccionado(long idperiodo, long idempleado)
        {
            empleados_selecionados e = new empleados_selecionados();
            e = db.empleados_selecionados.Where(x => x.id_empleados == idempleado && x.id_periodos == idperiodo).FirstOrDefault();
            empleado ee= db.empleado.Where(x => x.id == idempleado).FirstOrDefault();
            empleadoDTO empleado = new empleadoDTO();
            empleado.jefe = e.jefe;
            empleado.liderado1 = e.liderado1;
            empleado.liderado2 = e.liderado2;
            empleado.liderado3 = e.liderado3;
            empleado.liderado4 = e.liderado4;
            empleado.liderado5 = e.liderado5;
            empleado.liderado6 = e.liderado6;
            empleado.liderado7 = e.liderado7;
            empleado.liderado8 = e.liderado8;
            empleado.liderado9 = e.liderado9;
            empleado.liderado10 = e.liderado10;
            empleado.par1 = e.par1;
            empleado.par2 = e.par2;
            empleado.par3 = e.par3;
            empleado.par4 = e.par4;
            empleado.par5 = e.par5;
            empleado.Nombre = ee.Nombre;
            empleado.cedula = ee.cedula;

            return empleado;
        }
    }
}
