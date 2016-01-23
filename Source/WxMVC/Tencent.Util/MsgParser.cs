using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using Tencent.Model;

namespace Tencent.Util
{
    public class MsgParser
    {
        public static WxMsg Parse(string xml)
        {
            WxMsg msg = null;
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xml);
            XmlElement root = doc.DocumentElement;
            if (root != null)
            {
                msg = new WxMsg();
                XmlNodeList list = root.ChildNodes;
                for (int i = 0; i < list.Count; i++)
                {
                    XmlNode node = list[i];
                    if (node.NodeType == XmlNodeType.Element)
                    {
                        if (node.Name == "ToUserName")
                        {
                            msg.ToUserName = node.InnerText;
                        }
                        else if (node.Name == "FromUserName")
                        {
                            msg.FromUserName = node.InnerText;
                        }
                        else if (node.Name == "CreateTime")
                        {
                            msg.CreateTime = node.InnerText;
                        }
                        else if (node.Name == "MsgType")
                        {
                            msg.MsgType = node.InnerText;
                        }
                        else if (node.Name == "Event")
                        {
                            msg.Event = node.InnerText;
                        }
                        else if (node.Name == "EventKey")
                        {
                            msg.EventKey = node.InnerText;
                        }
                        else if (node.Name == "Ticket")
                        {
                            msg.Ticket = node.InnerText;
                        }
                        else if (node.Name == "Latitude")
                        {
                            msg.Latitude = node.InnerText;
                        }
                        else if (node.Name == "Longitude")
                        {
                            msg.Longitude = node.InnerText;
                        }
                        else if (node.Name == "Precision")
                        {
                            msg.Precision = node.InnerText;
                        }
                        else if (node.Name == "Content")
                        {
                            msg.Content = node.InnerText;
                        }
                    }
                }
            }
            return msg;
        }
    }
}
