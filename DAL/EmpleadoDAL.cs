using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
namespace DAL
{
    public class EmpleadoDAL : AbstractCRUD<empleado,long>
    {
        private Drummond02Entities db = new Drummond02Entities();
        public void Create(empleado obj)
        {
            throw new NotImplementedException();
        }

        public void Update(long id)
        {
            throw new NotImplementedException();
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public empleado GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<empleado> GetAll()
        {
            try
            {
                return db.empleado.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<empleado> Search(Func<empleado, bool> pre)
        {
            try
            {
                return db.empleado.Where(pre).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
