using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Interfaces;
using DAL;
namespace BL
{
    public class tipo_usuarioBLL : AbstractCRUD<tipo_usuario,long>
    {
        private tipo_usuarioDAL t = new tipo_usuarioDAL();
        public void Create(tipo_usuario obj)
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

        public tipo_usuario GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<tipo_usuario> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<tipo_usuario> Search(Func<tipo_usuario, bool> pre)
        {
            try
            {
                return t.Search(pre);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
