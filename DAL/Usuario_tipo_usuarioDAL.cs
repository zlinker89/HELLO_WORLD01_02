using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Interfaces;
namespace DAL
{
    public class Usuario_tipo_usuarioDAL : AbstractCRUD<Usuario_Tipo_usuario, long>
    {
        private Drummond02Entities db = new Drummond02Entities();


        public void Create(Usuario_Tipo_usuario obj)
        {
            try
            {
                db.Usuario_Tipo_usuario.Add(obj);
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

        public Usuario_Tipo_usuario GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<Usuario_Tipo_usuario> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Usuario_Tipo_usuario> Search(Func<Usuario_Tipo_usuario, bool> pre)
        {
            try
            {
                return db.Usuario_Tipo_usuario.Where(pre).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
