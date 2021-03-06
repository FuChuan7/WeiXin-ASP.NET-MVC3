define('app/views/user/user', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="user">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n        <a href="javascript:void(0);" ms-click="loadActivityGroup" class="load"></a>\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAddUser">\r\n            <i class="icon-plus">\r\n            </i>新增人员\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <div class="clearfix">\r\n        <div class="clearfix" >\r\n          <input type="text" placeholder="手机号" ms-duplex="phone" class="m-wrap small"/>\r\n          <input type="text" placeholder="姓名" ms-duplex="Name" class="m-wrap small"/>\r\n          <input type="text" placeholder="身份证" ms-duplex="IDCard" class="m-wrap small"/>\r\n          <a href="javascript:void(0);" ms-click="load" class="btn blue icn-only" style="margin-bottom: 10px !important">\r\n            <i class="icon-search m-icon-white"></i>\r\n          </a>\r\n          <div class="btn-group">\r\n            <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">\r\n              签到情况 ：{{SignIn}}<i class="icon-angle-down"></i>\r\n            </a>\r\n            <ul class="dropdown-menu">\r\n              <li>\r\n                <a href="javascript:void(0);" ms-click="SetSignIn(\'全部\')">全部</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetSignIn(\'未签到\')">未签到</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetSignIn(\'已签到\')">已签到</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetSignIn(\'已确认\')">已确认</a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n          <div class="btn-group">\r\n            <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">\r\n              自动刷新间隔时间 ：{{LoadRefreshTimeLabel}}<i class="icon-angle-down"></i>\r\n            </a>\r\n            <ul class="dropdown-menu">\r\n              <li>\r\n                <a href="javascript:void(0);" ms-click="SetLoadRefreshTime(\'0\')">不自动刷新</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);" ms-click="SetLoadRefreshTime(\'30000\')">30秒</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetLoadRefreshTime(\'60000\')">1分钟</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetLoadRefreshTime(\'300000\')">5分钟</a>\r\n              </li>\r\n              <li>\r\n                <a href="javascript:void(0);"  ms-click="SetLoadRefreshTime(\'600000\')">10分钟</a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n          <a href="javascript:void(0);" ms-click="load" class="btn blue icn-only" style="margin-bottom: 10px !important">\r\n            <i class="icon-search icon-refresh"></i>\r\n          </a>\r\n        </div>\r\n        <table class="table table-striped table-hover table-bordered">\r\n          <thead>\r\n            <tr>\r\n              <th>\r\n                手机号\r\n              </th>\r\n              <th>\r\n                姓名\r\n              </th>\r\n              <th>\r\n                身份证号\r\n              </th>\r\n              <th>\r\n                性别\r\n              </th>\r\n              <!--<th>\r\n                年龄\r\n              </th>-->\r\n              <th>\r\n                是否签到\r\n              </th>\r\n              <!--<th>\r\n               手环编号\r\n              </th>\r\n              <th >\r\n                注册时间\r\n              </th>-->\r\n              <th >\r\n                所属分组\r\n              </th>\r\n              <th style="width:100px;" >\r\n                备注\r\n              </th>\r\n              <th >\r\n                操作\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class="" ms-repeat-obj="users">\r\n              <td>\r\n                {{obj.Phone}}\r\n              </td>\r\n              <td>\r\n                {{obj.Name}}\r\n              </td>\r\n              <td>\r\n                {{obj.IDCard}}\r\n              </td>\r\n              <td>\r\n                {{obj.Gender}}\r\n              </td>\r\n              <!--<td>\r\n                {{obj.Age}}\r\n              </td>-->\r\n              <td>\r\n                {{obj.SignIn}}\r\n                <a href="javascript:void(0);" ms-visible="obj.SignIn == \'已签到\'" ms-click="confirmSignIn(obj)" class="btn blue icn-only" style="padding:0px;">\r\n                  <i>确认签到</i>\r\n                </a>\r\n               \r\n              </td>\r\n              <!--<td>\r\n                {{obj.BraceletCode}}\r\n              </td>\r\n              <td>\r\n                {{obj.RegisterTime| datetostring | date("yyyy-MM-dd")}}\r\n              </td>-->\r\n              <td>\r\n                {{obj.ActivityGroup?obj.ActivityGroup.Name:\'\'}}\r\n              </td>\r\n              <td>\r\n                {{obj.Mark}}\r\n              </td>\r\n              <td>\r\n                <a class="btn mini blue" href="javascript:void(0);" ms-click="ShowSetActivityGroupWin(obj)">\r\n                  设置分组\r\n                </a>\r\n                <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowUpdateUser(obj)">\r\n                  修改信息\r\n                </a>\r\n                <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowDeleteUser(obj)">\r\n                  删除\r\n                </a>\r\n              </td>\r\n\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              <i class="icon-step-backward">\r\n              </i>上一页\r\n            </a>\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              第{{currentPage}}页/共{{pageCount}}页   共{{total}}条数据\r\n            </a>\r\n            <a class="btn green" ms-click="NextPage()">\r\n              <i class="icon-step-forward">\r\n              </i>下一页\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n     \r\n      <div class="pagination pagination-large">\r\n        <ul>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n  <!--设置分组窗口-->\r\n  <div id="ShowSetActivityGroupWin" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        设置分组\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body" style="height: 300px;">\r\n      <div class="portlet box yellow">\r\n        <div class="portlet-title">\r\n          <div class="caption">\r\n            <i class="icon-coffee"></i>分组列表\r\n          </div>\r\n          <div class="tools">\r\n            <a href="javascript:void(0);" ms-click="loadActivityGroup" class="reload"></a>\r\n          </div>\r\n        </div>\r\n        <div class="portlet-body">\r\n          <table class="table table-striped table-hover table-bordered">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  分组名称\r\n                </th>\r\n                <th>\r\n                  报名费\r\n                </th>\r\n                <th>\r\n                  当前人数\r\n                </th>\r\n                <th>\r\n                  创建时间\r\n                </th>\r\n                <th>\r\n                  管理\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr class="" ms-repeat-obj="activityGroup " style="max-height:100px;">\r\n                <td style="max-width:200px;">\r\n                  {{obj.Name}}\r\n                </td>\r\n                <td>\r\n                  {{obj.Cost}}\r\n                </td>\r\n                <td>\r\n                  {{obj.CurrentNumber}}\r\n                </td>\r\n                <td>\r\n                  {{obj.CreateTime| datetostring | date("yyyy-MM-dd")}}\r\n                </td>\r\n                <td>\r\n                  <a class="btn mini blue" ms-click="SetActivityGroup(obj.ID)" href="javascript:void(0);">\r\n                    选择该组\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n  \r\n    </div>\r\n  </div>\r\n\r\n  <!--新增和修改-->\r\n  <div id="Add_Update_User_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增人员\':\'修改人员信息\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="GroupFrom"  class="form-horizontal">\r\n          <div class="alert alert-error hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            请按照规则填写以下信息\r\n          </div>\r\n          <div class="alert alert-success hide">\r\n            <button class="close" data-dismiss="alert"></button>\r\n            信息已通过验证，正在提交...\r\n          </div>\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    姓名:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placholder="请填写姓名" ms-duplex="CurrentUser.Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label span3" for="NumOfPeriod">身份证号码:</label>\r\n                  <div class="controls span9">\r\n                    <input type="text" name="IDCard" class="m-wrap span11" placholder="请输入身份证号码"  ms-duplex="CurrentUser.IDCard" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    手机号:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Phone" class="m-wrap span11" placholder="请输入手机号" ms-duplex="CurrentUser.Phone" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class="span6 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    备注:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea type="text" name="Mark" class="m-wrap span11" placholder="请输入备注" ms-duplex="CurrentUser.Mark" ></textarea>\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="SaveUser()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除用户项目-->\r\n  <div id="deleteUserDialog" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="deleteUserDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3>删除确认</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <p>确定要删除所选项吗？</p>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="doDeleteUser()">确定</button>\r\n    </div>\r\n  </div>\r\n  <!--删除分期项目结束-->\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.user = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "user",
    limit: 100,
    total:'',
    currentPage: 1,
    ActivityId: '',
    ActivityGroupId: '',
    SignIn: '全部',
    pageCount: 0,
    pageList: 0,
    CurrentUser: { Name: '', Phone: '', IDCard: '', ID: '',Mark:'' },
    users: [],
    pageList: 0,
    phone: '',
    IDCard: '',
    Name: '',
    isAdd: false,
    LoadRefreshTime: 0, //刷新时间
    LoadRefreshTimeLabel: '不自动刷新',
    timer: '',
    activityGroup: [], //分组数据
    loadActivityGroup: function () {
        ajax.group.List(9999, 1, model.ActivityId).done(function (data) {
            model.activityGroup = data.items;
        });
    },
    load: function () {
        ajax.user.List(model.currentPage, model.limit, model.ActivityId, model.SignIn, model.phone, model.IDCard, model.Name, model.ActivityGroupId).done(function (data) {
            model.users = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.total = data.total;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    PreviouPage: function () {
        if (model.currentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.currentPage--;
            model.load();
        }
    },
    NextPage: function () {
        if (model.currentPage == model.pageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.currentPage++;
            model.load();
        }
    },
    SetSignIn: function (flag) {
        model.SignIn = flag;
        model.load();
    },
    confirmSignIn: function (record) {
        ajax.user.confirmSignIn(record.$model).done(function (data) {
            model.load();
        });
    },
    SetLoadRefreshTime: function (LoadRefreshTime) {
        model.LoadRefreshTime = LoadRefreshTime;
        model.setIntervalTimer();
    },
    setIntervalTimer: function () {
        if (model.timer) {
            clearInterval(model.timer);
        }
        if (model.LoadRefreshTime != 0) {
            if (model.LoadRefreshTime == 30000) {
                model.LoadRefreshTimeLabel = '30秒';
            } else if (model.LoadRefreshTime == 60000) {
                model.LoadRefreshTimeLabel = '1分钟';
            } else if (model.LoadRefreshTime == 300000) {
                model.LoadRefreshTimeLabel = '5分钟';
            } else if (model.LoadRefreshTime == 600000) {
                model.LoadRefreshTimeLabel = '10分钟';
            }

            model.timer = setInterval(model.load, model.LoadRefreshTime)
        } else {
            model.LoadRefreshTimeLabel = '不自动刷新';
        }
    },
    ShowSetActivityGroupWin: function (record) {
        model.CurrentUser = record.$model;
        $("#ShowSetActivityGroupWin").modal('show');
    },
    SetActivityGroup: function (groupId) {
        ajax.user.setActivityGroup(groupId, model.CurrentUser.ID).done(function (data) {
            if (data.success) {
                model.load();
                $("#ShowSetActivityGroupWin").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //初始化数据
    init: function () {
        model.loadActivityGroup();
    },
    ShowAddUser: function () {
        model.CurrentUser.ID = 0;
        model.CurrentUser.Name = '';
        model.CurrentUser.IDCard = '';
        model.CurrentUser.Phone = '';
        model.CurrentUser.Mark = '';
        $('#Add_Update_User_modal').modal('show');
        isAdd = true;
    },
    ShowUpdateUser: function (record) {
        model.CurrentUser.ID = record.$model.ID;
        model.CurrentUser.Name = record.$model.Name;
        model.CurrentUser.IDCard = record.$model.IDCard;
        model.CurrentUser.Phone = record.$model.Phone;
        model.CurrentUser.Mark = record.$model.Mark;
        $('#Add_Update_User_modal').modal('show');
        isAdd = false;
    },
    ShowDeleteUser: function (record) {
        model.CurrentUser = record.$model;
        $('#deleteUserDialog').modal('show');
    },
    doDeleteUser: function () {
        ajax.user.Delete(model.CurrentUser.ID).done(function (data) {
            if (data.success) {
                model.load();
                $("#deleteUserDialog").modal('hide');
                rootVm.$alert('提示', data.msg, 'success');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    SaveUser: function () {
        if (model.CurrentUser.Name == '') {
            rootVm.$alert('提示', '请输入姓名', 'error');
            return;
        }
        if (model.CurrentUser.IDCard == '') {
            rootVm.$alert('提示', '请输入身份证号码', 'error');
            return;
        }
        if (!model.isIdCardNo(model.CurrentUser.IDCard)) {
            rootVm.$alert('提示', '身份证输入有误', 'error');
            return;
        }
        if (model.CurrentUser.Phone == '') {
            rootVm.$alert('提示', '请输入手机号', 'error');
            return;
        }
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(model.CurrentUser.Phone) || model.CurrentUser.Phone.length != 11) {
            rootVm.$alert('提示', '手机号输入错误', 'error');
            return;
        }
        ajax.user.Save(model.CurrentUser.$model, model.ActivityId).done(function (data) {
            if (data.success) {
                model.load();
                rootVm.$alert('提示', data.msg, 'success');
                $("#Add_Update_User_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //身份证号码的验证规则
    isIdCardNo: function (num) {
        //if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        else {
            //alert("输入的数字位数不对。"); 
            return false;
        }
        var a = num.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
                return false;
            }
        }
        if (!re.test(num)) {
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    }

});
avalon.scan();
avalon.vmodels.page.content = "user";


exports.setActivityId = function (ActivityId, ActivityGroupId) {
    avalon.vmodels.page.content = "user";
    model.ActivityId = ActivityId;
    model.ActivityGroupId = ActivityGroupId;
    model.load();
    model.init();
}
 
});