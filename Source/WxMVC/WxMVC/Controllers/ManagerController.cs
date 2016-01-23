using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WxMVC.Model.Base;
using WxMVC.Model.Business;
using WxMVC.WebSite.Util;
using WxMVC.DAL.Repositories;
using WxMVC.WebSite.LoginFilter;

namespace WxMVC.WebSite.Controllers
{
    public class ManagerController : Controller
    {
        //
        // GET: /Manager/

        //
        // GET: /Manager/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
         [ManagerSession]
        public JsonResult GetCurrentUser()
        {
            Manager user = Session["CurrentManager"] as Manager;
            return Json(user, JsonRequestBehavior.AllowGet);
        }
         [ManagerSession]
        public JsonResult GetUserByID(int id)
        {
            Manager manager = ManagerRepository.getInstance().getById(id);
            return Json(manager, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 退出系统，注销当前用户
        /// </summary>
        /// <returns></returns>
        public JsonResult LogOut()
        {
            ExtResult result = new ExtResult();
            try
            {
                Session.RemoveAll();
                result.success = true;
                result.msg = "您已退出系统";
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 推出登陆
        /// </summary>
        /// <returns></returns>
        public JsonResult TimeOut()
        {
            ExtResult result = new ExtResult();
            try
            {
                Session.RemoveAll();
                result.success = true;
                result.msg = "登陆超时，请您重新登陆";
                result.timeout = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);

        }
        
        /// <summary>
        /// 修改个人信息
        /// </summary>
        /// <returns></returns>
        [ManagerSession]
        public JsonResult UpdateUser(Manager user)
        {
            ExtResult result = new ExtResult();
            try
            {
                ManagerRepository.getInstance().Update(user);
                result.success = true;
                if (result.success)
                {
                    Session.RemoveAll();
                    Session.Add("CurrentManager", user);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);
        }
        [ManagerSession]
        public JsonResult Save(String Account, String Pwd, int roleId)
        {
            ExtResult result = new ExtResult();
            try
            {
                Manager tempManager = ManagerRepository.getInstance().getByAccount(Account);
                if (tempManager != null)
                {
                    result.success = false;
                    result.msg = "该账号已经存在";
                    return Json(result, "text/html", JsonRequestBehavior.AllowGet);
                }
                tempManager = new Manager();
                tempManager.Account = Account;
                tempManager.Pwd = DES.DESEnCode(Pwd, DES.key);
                tempManager.role = RoleRepository.getInstance().GetById(roleId);
                ManagerRepository.getInstance().Save(tempManager);
                result.success = true;

            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 更改密码
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ManagerSession]
        public JsonResult UpdatePwd(String OldPwd, String NewPwd)
        {
            ExtResult result = new ExtResult();
            try
            {
                Manager user = Session["CurrentManager"] as Manager;
                if (user.Pwd.Equals(DES.DESEnCode(OldPwd, DES.key)))
                {
                    user.Pwd = DES.DESEnCode(NewPwd, DES.key);
                    ManagerRepository.getInstance().Update(user);
                    result.success = true;
                    if (result.success)
                    {
                        Session.Add("CurrentManager", user);
                        result.success = true;
                    }
                    else
                    {
                        result.success = false;
                        result.msg = "密码修改失败，请联系管理员";
                    }
                }
                else
                {
                    result.success = false;
                    result.msg = "原始密码错误，请重试...";
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);
        }
        [ManagerSession]
        public JsonResult Delete(int id)
        {
            ExtResult result = new ExtResult();
            try
            {
                Manager manager = ManagerRepository.getInstance().getById(id);
                ManagerRepository.getInstance().Delete(manager);
                result.success = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, "text/html", JsonRequestBehavior.AllowGet);
        }
        [ManagerSession]
        public JsonResult List(int limit = 20, int page = 1, String type = "")
        {
            GridDataResult<Manager> result = new GridDataResult<Manager>();
            try
            {
                Role role = RoleRepository.getInstance().GetByName(type);
                result.items = ManagerRepository.getInstance().List(page, limit, role);
                result.limit = limit;
                result.page = page;
                result.total = ManagerRepository.getInstance().Count(role);
                result.totalPage = result.total % limit == 0 ? result.total / limit : result.total / limit + 1;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Login(string Account, string pwd)
        {
            ExtResult result = new ExtResult();
            try
            {
                Manager manager = ManagerRepository.getInstance().getByAccount(Account);
                if (manager == null)
                {
                    result.msg = "该管理员不存在";
                    result.success = false;
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

                if (manager.role.Name != "Administrator")
                {
                    result.msg = "该管理员不存在";
                    result.success = false;
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

                if (DES.DESEnCode(pwd, DES.key).Equals(manager.Pwd))
                {
                    Session.Add("CurrentManager", manager);
                    result.success = true;
                }
                else
                {
                    result.success = false;
                    result.msg = "密码错误";
                }

            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
