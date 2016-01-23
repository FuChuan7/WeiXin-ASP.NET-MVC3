using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Web;


namespace WxMVC.Util
{
    public class RequestSimulator
    {
        private CookieContainer cookieContainer;
        private String contentType = "application/x-www-form-urlencoded";
        private String accept = "image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/x-silverlight, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, application/x-ms-application, application/x-ms-xbap, application/vnd.ms-xpsdocument, application/xaml+xml, application/x-silverlight-2-b1, */*";
        private String userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36";
        private String token = String.Empty;

        public RequestSimulator()
        {
            cookieContainer = new CookieContainer();
        }

        public RequestSimulator(CookieContainer cookies)
        {
            cookieContainer = cookies;
        }

        public String Get(String url, String encode = "utf-8")
        {
            try
            {
                HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
                request.CookieContainer = cookieContainer;
                request.ContentType = contentType;
                request.Accept = accept;
                request.UserAgent = userAgent;
                request.Method = "GET";
                request.ServicePoint.ConnectionLimit = Int32.MaxValue;
                HttpWebResponse responst = request.GetResponse() as HttpWebResponse;
                foreach (Cookie c in responst.Cookies)
                {
                    cookieContainer.Add(c);
                }
                Stream stream = responst.GetResponseStream();
                StreamReader reader = new StreamReader(stream, Encoding.GetEncoding(encode));
                String content = reader.ReadToEnd();
                reader.Close();
                stream.Close();
                request.Abort();
                responst.Close();
                return content;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public String Post(String url, IDictionary<String, String> paramDic, String encode = "utf-8")
        {
            StringBuilder sb = new StringBuilder();
            String splite = "";
            foreach (var item in paramDic)
            {
                sb.AppendFormat("{0}{1}={2}", splite, item.Key, item.Value);
                splite = "&";
            }
            var html = Post(url, sb.ToString(), encode);
            return html;
        }

        public String Post(String url, String param, String encode = "utf-8")
        {
            Stream outstream = null;
            Stream instream = null;
            StreamReader sr = null;
            HttpWebResponse response = null;
            HttpWebRequest request = null;
            Encoding encoding = System.Text.Encoding.UTF8;
            byte[] data = encoding.GetBytes(param);
            try
            {
                request = WebRequest.Create(url) as HttpWebRequest;
                request.CookieContainer = cookieContainer;
                request.ContentType = contentType;
                request.Accept = accept;
                request.UserAgent = userAgent;
                request.Method = "POST";
                request.ContentLength = data.Length;
                outstream = request.GetRequestStream();
                outstream.Write(data, 0, data.Length);
                response = request.GetResponse() as HttpWebResponse;
                //response.Cookies = cookieContainer.GetCookies(request.RequestUri);
                foreach (Cookie c in response.Cookies)
                {
                    cookieContainer.Add(c);
                }
                instream = response.GetResponseStream();
                sr = new StreamReader(instream, Encoding.GetEncoding(encode));
                String content = sr.ReadToEnd();
                sr.Close();
                instream.Close();

                request.Abort();
                response.Close();

                return content;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public String PostF(String url, String param,String fileName, String encode = "utf-8")
        {
            Stream outstream = null;
            Stream instream = null;
            StreamReader sr = null;
            HttpWebResponse response = null;
            HttpWebRequest request = null;
            Encoding encoding = System.Text.Encoding.UTF8;
            byte[] data = encoding.GetBytes(param);
            try
            {
                request = WebRequest.Create(url) as HttpWebRequest;
                request.CookieContainer = cookieContainer;
                request.ContentType = contentType;
                request.Accept = accept;
                request.UserAgent = userAgent;
                request.Method = "POST";
                request.ContentLength = data.Length;
                outstream = request.GetRequestStream();
                outstream.Write(data, 0, data.Length);
                response = request.GetResponse() as HttpWebResponse;
                //response.Cookies = cookieContainer.GetCookies(request.RequestUri);
                foreach (Cookie c in response.Cookies)
                {
                    cookieContainer.Add(c);
                }
                instream = response.GetResponseStream();

                if (instream != null)
                {
                    String tempPath = System.AppDomain.CurrentDomain.BaseDirectory + "/Attrachment";
                    if (!Directory.Exists(tempPath)) {
                        Directory.CreateDirectory(tempPath);
                    }
                    string filePath = Path.Combine(tempPath, fileName);
                    using (var fileStream = File.Create(filePath))
                    {
                        byte[] buffer = new byte[1024];
                        int bytesRead = 0;
                        while ((bytesRead = instream.Read(buffer, 0, buffer.Length)) != 0)
                        {
                            fileStream.Write(buffer, 0, bytesRead);
                        }
                        fileStream.Flush();
                    }
                    instream.Close();
                }

                request.Abort();
                response.Close();

                return fileName;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
