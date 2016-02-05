using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface AbstractCRUD <T,T2>
        where T : class
        where T2 : struct
    {
        void Create(T obj);
        void Update(T2 id);
        void Delete(T2 id);
        T GetById(T2 id);
        List<T> GetAll();
        List<T> Search(Func<T, bool> pre);
    }
}
