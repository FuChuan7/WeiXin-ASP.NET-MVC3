define('app/services/ajaxService', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var lib = $;
// 全局jquery ajax应用时间戳
$.ajaxSetup({
    cache: false
});
// 拦截ajax请求，检测是否超时，以重新登录
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.dataType == 'json' && xhr.status == 200 && xhr.responseJSON != void 0 && xhr.responseJSON.timeout != void 0) {
        if (xhr.responseJSON.timeout) {
            avalon.vmodels['root'].$confirm('提示', 'Session已经失效，请重新登录', function () {
                location.href = "/User/Login" + window.location.hash;
            }, function () { });
        }
    }
});
exports.manager = {
    List: function (limit, currentPage, type) {
        return lib.ajax({
            url: '/Manager/List',
            type: 'get',
            dataType: 'json',
            data: {
                limit: limit,
                currentPage: currentPage,
                type: type
            }
        });
    },
    getuserbyid: function (id) {
        return lib.ajax({
            url: '/Manager/GetUserByID',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    save: function (record) {
        return lib.ajax({
            url: '/Manager/Save',
            type: 'post',
            dataType: 'json',
            data: { Account: record.Account, Pwd: record.Pwd, roleId: record.role }
        });
    },
    update: function (record) {
        return lib.ajax({
            url: '/Manager/UpdateUser',
            type: 'post',
            dataType: 'json',
            data: record
        });
    },
    Del: function (id) {
        return lib.ajax({
            url: '/Manager/Delete',
            type: 'post',
            dataType: 'json',
            data: { id: id }
        });
    },
    getcurrentuser: function () {
        return lib.getJSON('/Manager/GetCurrentUser');
    },
    update: function (record) {
        return lib.ajax({
            url: '/Manager/UpdateUser',
            type: 'post',
            dataType: 'json',
            data: record
        });
    },
    changepwd: function (oldpwd, newpwd) {
        return lib.ajax({
            url: '/Manager/UpdatePwd',
            type: 'post',
            dataType: 'json',
            data: {
                OldPwd: oldpwd,
                NewPwd: newpwd
            }
        });
    },
    UpdatePwd: function (id, newPwd) {
        return lib.ajax({
            url: '/Manager/UpdatePwdForManager',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                newPwd: newPwd
            }
        });
    }
};
exports.wxuser = {
    List: function (page, limit, taskid) {
        return lib.ajax({
            url: '/TaskWXUserMapping/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                taskid: taskid
            }
        });
    }

}; 
});