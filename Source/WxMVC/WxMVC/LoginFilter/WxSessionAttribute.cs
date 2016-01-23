using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tencent.Model;
namespace WxMVC.WebSite.LoginFilter
{
    public class WxSessionAttribute : ActionFilterAttribute
    {
        public string redirect_uri { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            WxUser u = filterContext.HttpContext.Session["CurrentWxUser"] as WxUser;
            if (u == null)
            {
                IDictionary<string, object> parms = filterContext.ActionParameters;
                string parmsStr = string.Empty; ;
                foreach (var item in parms)
                {
                    parmsStr += "&" + item.Key + "=" + item.Value.ToString();
                }
                if (parmsStr.Length > 0)
                {
                    parmsStr = parmsStr.Substring(1, parmsStr.Length - 1);
                }
                if (parmsStr.Length > 0)
                {
                    redirect_uri += "?" + parmsStr;
                }
                //u = BaseRepository<WxUser>.getInstance().getByAttribute("ID",1);
                //filterContext.HttpContext.Session.Add("CurrentWxUser", u);
                //Log.Write("WxSessionAttribute:redirect_uri-" + redirect_uri);
                filterContext.Result = new RedirectResult("/WeiXin/TimeOut?redirect_uri=" + redirect_uri);
            }
            base.OnActionExecuting(filterContext);
        }

    }
}