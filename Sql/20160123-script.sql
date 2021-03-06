USE [master]
GO
/****** Object:  Database [WxMVC]    Script Date: 01/23/2016 23:27:00 ******/
CREATE DATABASE [WxMVC] 
ALTER DATABASE [WxMVC] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WxMVC].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WxMVC] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [WxMVC] SET ANSI_NULLS OFF
GO
ALTER DATABASE [WxMVC] SET ANSI_PADDING OFF
GO
ALTER DATABASE [WxMVC] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [WxMVC] SET ARITHABORT OFF
GO
ALTER DATABASE [WxMVC] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [WxMVC] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [WxMVC] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [WxMVC] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [WxMVC] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [WxMVC] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [WxMVC] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [WxMVC] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [WxMVC] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [WxMVC] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [WxMVC] SET  DISABLE_BROKER
GO
ALTER DATABASE [WxMVC] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [WxMVC] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [WxMVC] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [WxMVC] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [WxMVC] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [WxMVC] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [WxMVC] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [WxMVC] SET  READ_WRITE
GO
ALTER DATABASE [WxMVC] SET RECOVERY SIMPLE
GO
ALTER DATABASE [WxMVC] SET  MULTI_USER
GO
ALTER DATABASE [WxMVC] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [WxMVC] SET DB_CHAINING OFF
GO
USE [WxMVC]
GO
/****** Object:  Table [dbo].[T_WXUser]    Script Date: 01/23/2016 23:27:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_WXUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[subscribe] [int] NULL,
	[openid] [nvarchar](500) NULL,
	[nickname] [nvarchar](500) NULL,
	[sex] [int] NULL,
	[city] [nvarchar](500) NULL,
	[country] [nvarchar](500) NULL,
	[province] [nvarchar](500) NULL,
	[language] [nvarchar](500) NULL,
	[headimgurl] [nvarchar](500) NULL,
	[subscribe_time] [nvarchar](500) NULL,
	[unionid] [nvarchar](500) NULL,
	[remark] [nvarchar](500) NULL,
 CONSTRAINT [PK_T_WXUser] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_SystemLog]    Script Date: 01/23/2016 23:27:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_SystemLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Type] [text] NULL,
	[Message] [text] NULL,
	[StackTrace] [text] NULL,
	[CreateTime] [datetime] NULL,
	[Class] [nvarchar](200) NULL,
	[Method] [nvarchar](200) NULL,
 CONSTRAINT [PK_T_SystemLog] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[T_SystemLog] ON
INSERT [dbo].[T_SystemLog] ([ID], [Type], [Message], [StackTrace], [CreateTime], [Class], [Method]) VALUES (1, N'ERROR', N'未将对象引用设置到对象的实例。', N'   在 WxMVC.WebSite.Controllers.ManagerController.Login(String Account, String pwd) 位置 D:\项目\微信开发框架\Source\WxMVC\WxMVC\Controllers\ManagerController.cs:行号 237', CAST(0x0000A59601736814 AS DateTime), N'WxMVC.WebSite.Controllers.ManagerController', N'Login')
INSERT [dbo].[T_SystemLog] ([ID], [Type], [Message], [StackTrace], [CreateTime], [Class], [Method]) VALUES (2, N'ERROR', N'未将对象引用设置到对象的实例。', N'   在 WxMVC.WebSite.Controllers.ManagerController.Login(String Account, String pwd) 位置 D:\项目\微信开发框架\Source\WxMVC\WxMVC\Controllers\ManagerController.cs:行号 237', CAST(0x0000A59601737AD4 AS DateTime), N'WxMVC.WebSite.Controllers.ManagerController', N'Login')
INSERT [dbo].[T_SystemLog] ([ID], [Type], [Message], [StackTrace], [CreateTime], [Class], [Method]) VALUES (3, N'ERROR', N'未将对象引用设置到对象的实例。', N'   在 WxMVC.WebSite.Controllers.ManagerController.Login(String Account, String pwd) 位置 D:\项目\微信开发框架\Source\WxMVC\WxMVC\Controllers\ManagerController.cs:行号 237', CAST(0x0000A5960173A2AC AS DateTime), N'WxMVC.WebSite.Controllers.ManagerController', N'Login')
INSERT [dbo].[T_SystemLog] ([ID], [Type], [Message], [StackTrace], [CreateTime], [Class], [Method]) VALUES (4, N'ERROR', N'未将对象引用设置到对象的实例。', N'   在 WxMVC.WebSite.Controllers.ManagerController.Login(String Account, String pwd) 位置 D:\项目\微信开发框架\Source\WxMVC\WxMVC\Controllers\ManagerController.cs:行号 237', CAST(0x0000A5960173AE64 AS DateTime), N'WxMVC.WebSite.Controllers.ManagerController', N'Login')
SET IDENTITY_INSERT [dbo].[T_SystemLog] OFF
/****** Object:  Table [dbo].[T_Role]    Script Date: 01/23/2016 23:27:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Des] [nvarchar](50) NULL,
 CONSTRAINT [PK_T_Role] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[T_Role] ON
INSERT [dbo].[T_Role] ([ID], [Name], [Des]) VALUES (1, N'Administrator', N'系统管理员')
SET IDENTITY_INSERT [dbo].[T_Role] OFF
/****** Object:  Table [dbo].[T_Manager]    Script Date: 01/23/2016 23:27:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Manager](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Account] [nvarchar](50) NULL,
	[Pwd] [nvarchar](50) NULL,
	[Role] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[Mark1] [nvarchar](50) NULL,
	[Department] [int] NULL,
 CONSTRAINT [PK_T_Manager] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[T_Manager] ON
INSERT [dbo].[T_Manager] ([ID], [Account], [Pwd], [Role], [Name], [Phone], [Mark1], [Department]) VALUES (2, N'13547837211', N'42784D74507C5BB4', 1, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[T_Manager] OFF
