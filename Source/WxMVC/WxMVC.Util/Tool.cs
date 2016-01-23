﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace WxMVC.Util
{
    public class Tools<T>
    {
        public static List<T> IList2List(IList<T> ilist)
        {
            List<T> list = new List<T>();
            if (ilist != null)
            {
                foreach (T t in ilist)
                {
                    list.Add(t);
                }
            }
            return list;
        }
   
    }
}
