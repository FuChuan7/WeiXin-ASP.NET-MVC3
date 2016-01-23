using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
/* 
    ======================================================================== 
        File name：        ExtensionMethods            
        Author：         Administrator
        Create Time：    6/30/2014 3:09:40 PM
        Modify By:        
        Modify Date:      
    ======================================================================== 
*/
namespace WxMVC.Model.Base
{
    public static class ExtensionMethods
    {
        public static byte[] GetFileData(this string fileName, string filePath)
        {
            if (!File.Exists(filePath + "\\" + fileName))
                throw new FileNotFoundException("The file does not exist.", filePath + "\\" + fileName);
            return File.ReadAllBytes(filePath + "\\" + fileName);
        }
    }
}