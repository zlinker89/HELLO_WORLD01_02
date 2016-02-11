using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
using DAL;
namespace BL
{
    public class empleadoBLL : AbstractCRUD<empleado,long>
    {
        private EmpleadoDAL e = new EmpleadoDAL();
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
            throw new NotImplementedException();
        }

        public List<empleado> Search(Func<empleado, bool> pre)
        {
            try
            {
                return e.Search(pre);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
