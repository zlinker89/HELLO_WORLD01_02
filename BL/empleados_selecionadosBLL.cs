using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
using Entities.DTOs;
using DAL;
namespace BL
{
    public class empleados_selecionadosBLL : AbstractCRUD<empleados_selecionados,long>
    {
        private empleado_seleccionadoDAL e = new empleado_seleccionadoDAL();
        private empleadoBLL empleadoHelper = new empleadoBLL();
        public void Create(empleados_selecionados obj)
        {
            try
            {
                List<empleado> empleados = empleadoHelper.GetAll();
                foreach (empleado empleado in empleados)
                {
                    obj.id_empleados = empleado.id;
                    obj.estado = 1;
                    // tomo los valores de la base de datos
                    // para no perderlos, cuando halla cambios
                    obj.liderado1 = empleado.liderado1;
                    obj.liderado2 = empleado.liderado2;
                    obj.liderado3 = empleado.liderado3;
                    obj.liderado4 = empleado.liderado4;
                    obj.liderado5 = empleado.liderado5;
                    obj.liderado6 = empleado.liderado6;
                    obj.liderado7 = empleado.liderado7;
                    obj.liderado8 = empleado.liderado8;
                    obj.liderado9 = empleado.liderado9;
                    obj.liderado10 = empleado.liderado10;
                    obj.par1 = empleado.par1;
                    obj.par2 = empleado.par2;
                    obj.par3 = empleado.par3;
                    obj.par4 = empleado.par4;
                    obj.par5 = empleado.par5;
                    obj.jefe = empleado.jefe;
                    e.Create(obj);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(long id)
        {
            throw new NotImplementedException();
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public empleados_selecionados GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<empleados_selecionados> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<empleados_selecionados> Search(Func<empleados_selecionados, bool> pre)
        {
            throw new NotImplementedException();
        }
    }
}
