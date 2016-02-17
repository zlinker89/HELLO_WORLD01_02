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
