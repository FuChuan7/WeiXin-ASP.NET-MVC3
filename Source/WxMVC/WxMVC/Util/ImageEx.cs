using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;

namespace WxMVC.WebSite.Util
{
    public class ImageEx
    {
        /// <summary>
        /// 缩小图片
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)</param>
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)</param>
        /// <param name="intWidth">缩小至宽度</param>
        /// <param name="intHeight">缩小至高度</param>
        public System.Drawing.Bitmap SmallPic(Bitmap strOldPic,int intWidth, int intHeight)
        {
            Bitmap objNewPic;
            try
            {
                objNewPic = new Bitmap(strOldPic, intWidth, intHeight);
                return objNewPic;
            }
            catch (Exception exp) { throw exp; }
        }

        /// <summary>
        /// 按比例缩小图片，自动计算高度
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)</param>
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)</param>
        /// <param name="intWidth">缩小至宽度</param>
        public Bitmap SmallPic(Bitmap strOldPic, int intWidth)
        {

            Bitmap objNewPic;
            try
            {
                int intHeight = (int)(((intWidth * 1.0000) / strOldPic.Width) * strOldPic.Height);
                objNewPic = new Bitmap(strOldPic, intWidth, intHeight);
                return objNewPic;
            }
            catch (Exception exp) { throw exp; }
        }


        /// <summary>
        /// 按比例缩小图片，自动计算宽度
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)</param>
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)</param>
        /// <param name="intHeight">缩小至高度</param>
        public Bitmap SmallPicH(Bitmap strOldPic, int intHeight)
        {
            Bitmap objNewPic;
            try
            {
                int intWidth = (int)(((intHeight * 1.0000) / strOldPic.Height) * strOldPic.Width);
                objNewPic = new Bitmap(strOldPic, intWidth, intHeight);
                return objNewPic;
            }
            catch (Exception exp) { throw exp; }
        }

        public Bitmap CutImage(Bitmap sourceBitmap, Rectangle rc)
        {
            if (rc.Bottom < 0)
                return null;
            Bitmap TempsourceBitmap = new Bitmap(rc.Right - rc.Left, rc.Bottom - rc.Top);
            Graphics gr = Graphics.FromImage(TempsourceBitmap);
            gr.DrawImage(sourceBitmap, 0, 0, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);
            gr.Dispose();
            return TempsourceBitmap;
        }
        public Bitmap JoinImage(Bitmap sourceBitmap, Bitmap joinBitmap, Rectangle rc)
        {
            Bitmap TempsourceBitmap = sourceBitmap;
            Graphics gr = Graphics.FromImage(TempsourceBitmap);
            gr.DrawImage(joinBitmap, 0, 0, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);
            gr.Dispose();
            return TempsourceBitmap;
        }
        /// <summary>
        /// 铺满
        /// </summary>
        /// <param name="sourceBitmap"></param>
        /// <param name="joinBitmap"></param>
        /// <param name="rc"></param>
        /// <returns></returns>
        public Bitmap JoinMImage(Bitmap sourceBitmap, Bitmap joinBitmap, Rectangle rc)
        {
            Bitmap ImgBit = new Bitmap(350, 480);
            //joinBitmap = SmallPic(joinBitmap, sourceBitmap.Width, sourceBitmap.Height);
            Bitmap TempsourceBitmap = ImgBit;
            Graphics gr = Graphics.FromImage(TempsourceBitmap);
            int m_Width, m_Height;
            m_Height = (sourceBitmap.Height / 2) - joinBitmap.Height / 2;

            m_Width = (sourceBitmap.Width / 2) - joinBitmap.Width / 2;
            gr.DrawImage(sourceBitmap, 0, 0, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);

            //gr.DrawImage(sourceBitmap, 0, 0, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);
            gr.DrawImage(joinBitmap, 0, 0, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);
            gr.Dispose();
            return TempsourceBitmap;
        }

        public Bitmap JoinMImage(Bitmap sourceBitmap, Bitmap joinBitmap, Rectangle rc, int x, int y)
        {
            Bitmap TempsourceBitmap = sourceBitmap;
            Graphics gr = Graphics.FromImage(TempsourceBitmap);
            gr.DrawImage(joinBitmap, x, y, new RectangleF(rc.Left, rc.Top, rc.Right - rc.Left, rc.Bottom - rc.Top), GraphicsUnit.Pixel);
            gr.Dispose();
            return TempsourceBitmap;
        }
        public Bitmap JoinTxtImage(Bitmap sourceBitmap, string txt, Color color, int x, int y)
        {
            Bitmap TempsourceBitmap = sourceBitmap;
            Graphics gr = Graphics.FromImage(TempsourceBitmap);
            if (sourceBitmap.Width > 200)
                gr.DrawString(txt, new Font("微软雅黑", 13, FontStyle.Bold), new SolidBrush(color), new PointF(x, y));
            else
                gr.DrawString(txt, new Font("微软雅黑", 12, FontStyle.Bold), new SolidBrush(color), new PointF(x, y));
            gr.Dispose();
            return TempsourceBitmap;
        }
    }
}
