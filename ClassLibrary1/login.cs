using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
namespace DAL
{
    public class login : Abstract<empleado,long>
    {
        public void Add(empleado obj)
        {
            throw new NotImplementedException();
        }

        public void Update(long id)
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


        public empleado Search(Predicate<empleado> match)
        {
            throw new NotImplementedException();
        }
    }
}
