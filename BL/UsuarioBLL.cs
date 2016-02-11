
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using DAL;
using Interfaces;
namespace BL
{
    public class UsuarioBLL : AbstractCRUD<usuarios,long>
    {
        private UsuarioDAL u = new UsuarioDAL();
        public void Create(usuarios obj)
        {
            try
            {
                u.Create(obj);
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
            return u.Search(x => x.id == id).FirstOrDefault();
        }

        public List<usuarios> GetAll()
        {
            return u.GetAll();
        }

        public List<usuarios> Search(Func<usuarios, bool> pre)
        {
            try
            {
                return u.Search(pre);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
