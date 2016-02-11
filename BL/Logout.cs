using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Interfaces;
using Entities;
namespace BL
{
    public class Logout
    {
        private UsuarioBLL usuarioHelper = new UsuarioBLL();

        public bool LogOut(long id)
        {
            usuarios u = usuarioHelper.GetById(id);
            if (u.id != null)
            {
                return true;
            }
            else { return false; }
        }
    }
}
