using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WxMVC.Model.Business;

namespace WxMVC.WebSite.LoginFilter
{
    public class ManagerLoginSessionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Manager u = filterContext.HttpContext.Session["CurrentManager"] as Manager;
            if (u == null)
            {
                filterContext.Result = new RedirectResult("/Manager/Login");
            }
            base.OnActionExecuting(filterContext);
        }

    }
}