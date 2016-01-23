using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Criterion;
using WxMVC.DAL.Util;

namespace WxMVC.DAL.Repositories
{
    public class BaseRepository<T>
    {
        private static BaseRepository<T> instance=null;
        private BaseRepository() { }
        public static BaseRepository<T> getInstance()
        {
            if (instance == null)
            {
                instance = new BaseRepository<T>();
            }
            return instance;
        }
        /// <summary>
        /// 根据一个属性获取一个唯一实例，如果返回有多个实例则会抛出异常
        /// </summary>
        /// <param name="attrName"></param>
        /// <param name="attrVal"></param>
        /// <returns></returns>
        public T getByAttribute(string attrName,object attrVal)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria =  session.CreateCriteria(typeof(T).ToString());
                criteria.Add(Restrictions.Eq(attrName, attrVal));
                return criteria.UniqueResult<T>();
            }
        }
        /// <summary>
        /// 保存一个实体
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public int Save(T t) {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return Convert.ToInt32(session.Save(t));
            }
        }
        /// <summary>
        /// 更新一个实体
        /// </summary>
        /// <param name="t"></param>
        public void Update(T t) {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Update(t);
                session.Flush();
            }
        }
        /// <summary>
        /// 保存或更新一个实体
        /// </summary>
        /// <param name="t"></param>
        public void SaveOrUpdate(T t) {

            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.SaveOrUpdate(t);
                session.Flush();
            }
        }
        /// <summary>
        /// 删除一个实体
        /// </summary>
        /// <param name="t"></param>
        public void Delete(T t) {

            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.Delete(t);
                session.Flush();
            }
        
        }
        /// <summary>
        /// 根据ID获取实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public T GetById(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria(typeof(T).ToString());
                criteria.Add(Restrictions.Eq("ID", id));
                return criteria.UniqueResult<T>();
            }
        }

        /// <summary>
        /// 分页获取数据
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <returns></returns>
        public List<T> List(int PageIndex, int PageSize)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria(typeof(T).ToString());
                criteria.SetFirstResult((PageIndex - 1) * PageSize).SetMaxResults(PageSize);
                criteria.AddOrder(Order.Asc("ID"));
                return Tools<T>.IList2List(criteria.List<T>());
            }
        }
        /// <summary>
        /// 总个数
        /// </summary>
        /// <returns></returns>
        public long Count()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria(typeof(T).ToString());
                return Convert.ToInt32(criteria.SetProjection(Projections.RowCount()).UniqueResult());
            }
        }

        public List<T> List()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                ICriteria criteria = session.CreateCriteria(typeof(T).ToString());
                criteria.AddOrder(Order.Asc("ID"));
                return Tools<T>.IList2List(criteria.List<T>());
            }
        }
    }
}
