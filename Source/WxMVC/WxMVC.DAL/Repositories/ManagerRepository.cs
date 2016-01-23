using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Criterion;
using WxMVC.DAL.Util;
using WxMVC.Model.Business;

namespace WxMVC.DAL.Repositories
{
    public class ManagerRepository
    {
        private static ManagerRepository instance = null;
        private ManagerRepository() { }
        public static ManagerRepository getInstance()
        {
            if (instance == null)
            {
                instance = new ManagerRepository();
            }
            return instance;
        }

        public Manager getByAccount(String Account) {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Manager>();
                criteria.Add(Restrictions.Eq("Account", Account));
                return criteria.UniqueResult<Manager>();
            }
        }

        public void Update(Manager manager)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Update(manager);
                session.Flush();
            }
        }

        public Manager getById(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Manager>();
                criteria.Add(Restrictions.Eq("ID", id));
                return criteria.UniqueResult<Manager>();
            }
        }

        public List<Manager> List(int page, int limit,Role role)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Manager>();
                criteria.AddOrder(Order.Desc("id"));
                if (role != null) {
                    criteria.Add(Restrictions.Eq("role", role));
                }
                return Tools<Manager>.IList2List(criteria.List<Manager>());
            }
        }
        public int Count(Role role)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<Manager>();
                if (role != null)
                {
                    criteria.Add(Restrictions.Eq("role", role));
                }
                return Convert.ToInt32(criteria.SetProjection(Projections.RowCount()).UniqueResult());
            }
        }

        public void Save(Manager manager)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Save(manager);
                session.Flush();
            }
        }

        public void Delete(Manager manager)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Delete(manager);
                session.Flush();
            }
        }
    }
}
