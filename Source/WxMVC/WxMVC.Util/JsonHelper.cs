using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;
/* 
    ======================================================================== 
        File name：        JsonHelper            
        Author：         Administrator
        Create Time：    6/30/2014 3:11:39 PM
        Modify By:        
        Modify Date:      
    ======================================================================== 
*/
namespace WxMVC.Util
{
    public class JsonHelper
    {
        public static T parse<T>(string jsonString)
        {
            using (var ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString)))
            {
                return (T)new DataContractJsonSerializer(typeof(T)).ReadObject(ms);
            }
        }
        public static string stringify(object jsonObject)
        {
            using (var ms = new MemoryStream())
            {
                new DataContractJsonSerializer(jsonObject.GetType()).WriteObject(ms, jsonObject);
                return Encoding.UTF8.GetString(ms.ToArray());
            }
        }
    }
}