using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Criterion;
using Tencent.Model;

namespace WxMVC.DAL.Repositories
{
    public class WXUserRepository
    {
        private static WXUserRepository instance=null;
        private WXUserRepository() { }
        public static WXUserRepository getInstance()
        {
            if (instance == null)
            {
                instance = new WXUserRepository();
            }
            return instance;
        }
        public WxUser Save(WxUser user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                user.ID = Convert.ToInt32(session.Save(user));
            }
            return user;
        }
        public void Update(WxUser user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Update(user);
                session.Flush();
            }
        
        }
        public WxUser getById(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.CreateCriteria<WxUser>().Add(Restrictions.Eq("ID", id)).UniqueResult<WxUser>();
            }
        }
        public WxUser getByOpenId(string openid)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.CreateCriteria<WxUser>().Add(Restrictions.Eq("openid", openid)).UniqueResult<WxUser>();
            }
        }


        public int Count(string openid,int taskid)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria<WxUser>();
                if (openid != null)
                {
                    criteria.Add(Restrictions.Eq("ActivationCode", openid));
                }
                criteria.Add(Restrictions.Eq("TaskId", taskid));
                criteria.Add(Restrictions.Eq("subscribe", 1));
                return Convert.ToInt32(criteria.SetProjection(Projections.RowCount()).UniqueResult());
            }
        }
    }
}
