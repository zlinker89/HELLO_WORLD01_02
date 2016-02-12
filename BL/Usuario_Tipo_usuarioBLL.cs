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
    public class Usuario_Tipo_usuarioBLL : AbstractCRUD<Usuario_Tipo_usuario,long>
    {
        private Usuario_tipo_usuarioDAL u = new Usuario_tipo_usuarioDAL();
        public void Create(Usuario_Tipo_usuario obj)
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
            throw new NotImplementedException();
        }
    }
}
