using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Interfaces;

namespace DAL
{
    public class tipo_usuarioDAL : AbstractCRUD<tipo_usuario,long>
    {
        private Drummond02Entities db = new Drummond02Entities();
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
                return db.tipo_usuario.Where(pre).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
