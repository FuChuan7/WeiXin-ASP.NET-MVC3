using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using System.Diagnostics;
using WxMVC.DAL.Repositories;
using WxMVC.Model.Base;

namespace WxMVC.WebSite.Util
{
    public class Log
    {
        //在网站根目录下创建日志目录
        public static string path = HttpContext.Current.Request.PhysicalApplicationPath + "logs";
        //日志写到什么地方，可选参数为【TXT】【DB】【ALL】 ,默认为TXT
        public static string LogSource = "ALL";
        /// <summary>
        /// 写入日志的等级，1：只写入错误信息，2：写入错误和输出信息 3：写入所有日志信息
        /// </summary>
        public static int logLevel = 3;
        /**
         * 向日志文件写入调试信息
         * @param className 类名
         * @param content 写入内容
         */
        public static void Debug(string message) {
            StackTrace st = new StackTrace(true);
            String className = st.GetFrame(1).GetMethod().DeclaringType.FullName;
            String methodName = st.GetFrame(1).GetMethod().Name;
            Debug(className, methodName, message);
        
        }
        /**
         * 向日志文件写入调试信息
         * @param className 类名
         * @param content 写入内容
         */
        private static void Debug(string className, string methodName, string message)
        {
            if (logLevel >= 3)
            {
                WriteLog("DEBUG", className,methodName, message);
            }
        }
        /**
         * 写入Info类型信息
         * 
         */
        public static void Info(string content) {
            StackTrace st = new StackTrace(true);
            String className = st.GetFrame(1).GetMethod().DeclaringType.FullName;
            String methodName = st.GetFrame(1).GetMethod().Name;
            Info(className, methodName, content);
        }
        /**
        * 向日志文件写入运行时信息
        * @param className 类名
        * @param content 写入内容
        */
        private static void Info(string className, string methodName, string content)
        {
            if (logLevel >= 2)
            {
                WriteLog("INFO", className,methodName, content);
            }
        }

        /**
        * 向日志文件写入出错信息
        * @param className 类名
        * @param content 写入内容
        */
        private static void Error(string className, string methodName,string message, string stackTrace)
        {
            if (logLevel >= 1)
            {
                WriteLog("ERROR", className,methodName,  message , stackTrace);
            }
        }
        /**
         * 记录错误信息
         * 
         */
        public static void Error(Exception ex) {
            StackTrace st = new StackTrace(true);
            String className = st.GetFrame(1).GetMethod().DeclaringType.FullName;
            String methodName = st.GetFrame(1).GetMethod().Name;
            Error(className, methodName, ex.Message, ex.StackTrace);
        }
        /**
        * 实际的写日志操作
        * @param type 日志记录类型
        * @param className 类名
        * @param content 写入内容
        */
        protected static void WriteLog(string type, string className,string methodName, string message,string stackTrace="")
        {
            if (LogSource == "TXT" || LogSource == "ALL")
            {
                try
                {

                    if (!Directory.Exists(path))//如果日志目录不存在就创建
                    {
                        Directory.CreateDirectory(path);
                    }

                    string time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");//获取当前系统时间
                    string filename = path + "/" + DateTime.Now.ToString("yyyy-MM-dd") + ".log";//用日期对日志文件命名

                    //创建或打开日志文件，向日志文件末尾追加记录
                    StreamWriter mySw = File.AppendText(filename);

                    //向日志文件写入内容
                    string write_content = time + " 【" + type + "】 【Class:" + className + "】 【Method:" + methodName + "】 Message:" + message + (stackTrace == "" ? "" : "  stackTrace:" + stackTrace);
                    mySw.WriteLine(write_content);

                    //关闭日志文件
                    mySw.Close();
                }
                catch (Exception ex)
                {

                }
            }
            if (LogSource == "DB" || LogSource == "ALL") {
                try
                {
                    SystemLog log = new SystemLog();
                    log.Type = type;
                    log.Message = message;
                    log.StackTrace = stackTrace;
                    log.Method = methodName;
                    log.Class = className;
                    BaseRepository<SystemLog>.getInstance().SaveOrUpdate(log);
                }
                catch (Exception ex) { 
                
                }
            }
        }
    }
}
