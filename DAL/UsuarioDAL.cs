using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
namespace DAL
{
    public class UsuarioDAL : AbstractCRUD<usuarios,long>
    {
        private Drummond02Entities db = new Drummond02Entities();

        public void Create(usuarios obj)
        {
            try
            {
                db.usuarios.Add(obj);
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

        public usuarios GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<usuarios> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<usuarios> Search(Func<usuarios, bool> pre)
        {
            throw new NotImplementedException();
        }
    }
}
