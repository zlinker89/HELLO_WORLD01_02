using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Entities.DTOs;
using Interfaces;
namespace DAL
{
    public class empleado_seleccionadoDAL : AbstractCRUD<empleados_selecionados,long>
    {
        private Drummond02Entities db = new Drummond02Entities();
        public void Create(empleados_selecionados obj)
        {
            try
            {
                db.empleados_selecionados.Add(obj);
                db.SaveChanges();
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
