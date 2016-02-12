using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;
using Entities.DTOs;
namespace BL
{
    public class LoginBLL
    {
        private UsuarioBLL usuarioHelper = new UsuarioBLL();
        private empleadoBLL empleadoHelper = new empleadoBLL();
        private Usuario_Tipo_usuarioBLL tipoHelper = new Usuario_Tipo_usuarioBLL();
        private tipo_usuarioBLL tipo_usuarioHelper = new tipo_usuarioBLL();
        public usuariosDTO LogIn(usuarios obj)
        {
            usuariosDTO uDTO = new usuariosDTO();
            try
            {
                usuarios usuario = usuarioHelper.Search(x => x.nombre_usuario == obj.nombre_usuario && x.password_usuario == obj.password_usuario).FirstOrDefault();
                // Si hay resultado lo paso a DTO
                if (usuario != null)
                {
                    uDTO.id = usuario.id;
                    uDTO.nombre_usuario = usuario.nombre_usuario;
                    uDTO.password_usuario = usuario.password_usuario;
                    // inicializamos la lista
                    uDTO.tipo_usuarios = new List<tipo_usuarioDTO>();

                    List<Usuario_Tipo_usuario> TiposUsuarios = new List<Usuario_Tipo_usuario>();
                    TiposUsuarios = tipoHelper.Search(x => x.id_user == usuario.id);
                    foreach (Usuario_Tipo_usuario t in TiposUsuarios)
                    {
                        tipo_usuario tipo = tipo_usuarioHelper.Search(x => x.id == t.idtipo_usuario).FirstOrDefault();
                        // pasamos a DTO
                        tipo_usuarioDTO tipoDTO = new tipo_usuarioDTO();
                        tipoDTO.id = tipo.id;
                        tipoDTO.tipo = tipo.tipo_usuario1;
                        uDTO.tipo_usuarios.Add(tipoDTO);
                    }
                    // buscamos el empleado
                    empleado e = empleadoHelper.Search(x => x.id_user == usuario.id).FirstOrDefault();
                    // inicializamos el objeto
                    uDTO.empleado = new empleadoDTO();
                    uDTO.empleado.id = e.id;
                    uDTO.empleado.id_user = e.id_user;
                    uDTO.empleado.Nombre = e.Nombre;
                    uDTO.empleado.RosterPosition = e.RosterPosition;
                    uDTO.empleado.SubArea = e.SubArea;
                    uDTO.empleado.tipo = e.tipo;
                    uDTO.empleado.Area = e.Area;
                    uDTO.empleado.cedula = e.cedula;
                    uDTO.empleado.CrewCd = e.CrewCd;
                    uDTO.empleado.Departament = e.Departament;
                }
                return uDTO;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
