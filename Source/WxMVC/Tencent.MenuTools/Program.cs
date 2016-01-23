using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Model;
using System.IO;
using WxMVC.Util;

namespace Tencent.MenuTools
{
    class Program
    {
        public static string AppId = "wx7038ec9e0684ce46";
        public static string AppSecret = "76e5934f5edf10345e8d6c2224a1d2fa";
        static void Main(string[] args)
        {
            new Program();
        }
        public Program() {
            BaseMsg baseMsg = WxController.getInstance().getAccessToken("client_credential", AppId, AppSecret);
            if (baseMsg is AccessToken)
            {
                AccessToken accessToken = baseMsg as AccessToken;
                String createMenuResult = CreateMenu(accessToken);
                Console.WriteLine(createMenuResult);
                Console.ReadKey();
            }
            else {
                Console.WriteLine("AccessToken ERROR");
            }
        
        }
        public String CreateMenu(AccessToken AccessToken)
        {
            String url = " https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + AccessToken.access_token;
            String menuData = ReadMenuFile("menu.txt");
            Console.WriteLine(menuData);
            RequestSimulator request = new RequestSimulator();
            return request.Post(url,menuData);
        }
        public String ReadMenuFile(String file)
        {
            FileStream fs = new FileStream(file, FileMode.Open);
            StreamReader m_streamReader = new StreamReader(fs, Encoding.GetEncoding("GBK"));
            string arry = "";
            arry = m_streamReader.ReadToEnd();
            return arry;
        }
    }
}
