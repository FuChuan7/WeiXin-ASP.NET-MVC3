using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WxMVC.WebSite.LoginFilter;

namespace WxMVC.WebSite.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        [ManagerLoginSession]
        public ActionResult Index()
        {
            return View();
        }

    }
}
