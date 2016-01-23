using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WxMVC.WebSite.LoginFilter;
using WxMVC.Model.Base;
using Tencent.Model;
using WxMVC.DAL.Repositories;
using WxMVC.WebSite.Util;

namespace WxMVC.WebSite.Controllers
{
    public class WxUserController : Controller
    {
        //
        // GET: /WxUser/

        public ActionResult Index()
        {
            return View();
        }

        [ManagerSession]
        public JsonResult List(int limit = 20, int page = 1, String type = "")
        {
            GridDataResult<WxUser> result = new GridDataResult<WxUser>();
            try
            {
                result.items = BaseRepository<WxUser>.getInstance().List(page, limit);
                result.limit = limit;
                result.page = page;
                result.total = BaseRepository<WxUser>.getInstance().Count();
                result.totalPage = result.total % limit == 0 ? result.total / limit : result.total / limit + 1;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
