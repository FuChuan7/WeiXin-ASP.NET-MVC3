using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Criterion;
using Tencent.Model;
using WxMVC.Model.Business;

namespace WxMVC.DAL.Repositories
{
    public class RoleRepository
    {
        private static RoleRepository instance = null;
        private RoleRepository() { }
        public static RoleRepository getInstance()
        {
            if (instance == null)
            {
                instance = new RoleRepository();
            }
            return instance;
        }


        public Role GetById(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Role>();
                criteria.Add(Restrictions.Eq("ID", id));
                return criteria.UniqueResult<Role>();
            }
        }


        public Role GetByName(string Name)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Role>();
                criteria.Add(Restrictions.Eq("Name", Name));
                return criteria.UniqueResult<Role>();
            }
        }
    }
}
