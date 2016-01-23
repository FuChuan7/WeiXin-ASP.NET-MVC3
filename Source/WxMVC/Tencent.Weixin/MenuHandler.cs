using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Model;
using Tencent.Util;
using WxMVC.Util;

namespace Tencent.Weixin
{
    public class MenuHandler
    {
        public static MenuHandler instance;
        public static MenuHandler getInstance()
        {
            if (instance == null)
            {
                instance = new MenuHandler();
            }
            return instance;
        }
        /// <summary>
        /// 生成自定义菜单
        /// </summary>
        /// <param name="ACCESS_TOKEN"></param>
        /// <param name="menuData"></param>
        /// <returns></returns>
        public BaseMsg CreateMenu(String ACCESS_TOKEN, String menuData)
        {
            try
            {
                String url = string.Format("https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}", ACCESS_TOKEN);
                RequestSimulator Request = new RequestSimulator();
                String jsonStr = Request.Post(url, menuData);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                return errorCode;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        
        }
    }
}
