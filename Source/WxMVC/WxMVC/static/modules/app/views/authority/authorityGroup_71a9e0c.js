define('app/views/authority/authorityGroup', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="authorityGroup">\r\n\t<div class="span4">\r\n\t\t<!-- BEGIN EXAMPLE TABLE PORTLET-->\r\n\t\t<div class="portlet box blue">\r\n\t\t\t<div class="portlet-title">\r\n\t\t\t\t<div class="caption"><i class="icon-edit"></i>分组列表</div>\r\n\t\t\t\t<div class="tools">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="portlet-body">\r\n\t\t\t\t<div class="clearfix">\r\n\t\t\t\t\t<div class="btn-group">\r\n\t\t\t\t\t\t<a class="btn green" ms-click="add()">\r\n              添加分组 <i class="icon-plus"></i>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<table class="table table-striped table-hover table-bordered">\r\n\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th>名称</th>\r\n                            <th>描述</th>\r\n                            <th>操作</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody>\r\n                        <tr class="" ms-repeat-group="groups">\r\n\t\t\t\t\t\t\t<td>{{group.Name}}</td>\r\n                            <td>{{group.Des}}</td>\r\n\t\t\t\t\t\t\t<td>\r\n                                <a class="btn mini blue" href="javascript:;" ms-click="update(group.$model)">编辑</a>\r\n                                <a class="btn mini black" href="javascript:;" ms-click="dele(group.ID)">删除</a>\r\n                                <a class="btn mini green" href="javascript:;" ms-click="showUserList(group.$model)">查看员工</a>\r\n                            </td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n                <!-- 分页组件 -->\r\n                <div class="pagination">\r\n                    <ul>\r\n                        <li ms-if="currentPage!=1"><a href="javascrip:;" ms-click="reload(-1)">«</a></li>\r\n                        <li ms-repeat-page="pageList" ms-class="active:page==currentPage"><a href="javascript:;" ms-click="reload(page-currentPage)">{{page}}</a></li>\r\n                        <li ms-if="{{currentPage < pageCount }}"><a href="javascript:;" ms-click="reload(1)">»</a></li>\r\n                    </ul>\r\n                </div>\r\n                <!-- 分页组件结束 -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- END EXAMPLE TABLE PORTLET-->\r\n\t</div>\r\n    <div class="span8">\r\n        <div ms-include-src="userView"></div>\r\n    </div>\r\n    <div id="group_modal" class="modal hide fade" tabindex="-1" data-focus-on="input:first">\r\n\t    <div class="modal-header">\r\n\t\t    <button type="button" class="close" ms-click="close"></button>\r\n\t\t    <h3>{{isAddMode ? \'新增权限分组\' : \'修改权限分组信息\'}}</h3>\r\n\t    </div>\r\n\t    <div class="modal-body">\r\n            <form action="/" onsubmit="return false;" id="groupDetails" class="horizontal-form">\r\n                <div class="alert alert-error hide">\r\n\t\t\t\t    <button class="close" data-dismiss="alert"></button>\r\n                    请按照规则填写以下信息\r\n\t\t\t    </div>\r\n\t\t\t    <div class="alert alert-success hide">\r\n\t\t\t\t    <button class="close" data-dismiss="alert"></button>\r\n\t\t\t\t    信息已通过验证，正在提交...\r\n\t\t\t    </div>\r\n                <div class="control-group">\r\n                    <label for="Name">\r\n                        权限分组名称 <span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls">\r\n                        <input name="Name" type="text" ms-duplex="group.Name" />\r\n                        <span class="help-inline"></span>\r\n                    </div>\r\n                </div>\r\n                <div class="control-group">\r\n                    <label for="Des">描述</label>\r\n                    <div class="controls">\r\n                        <input name="Des" type="text" ms-duplex="group.Des" />\r\n                        <span class="help-inline"></span>\r\n                    </div>\r\n                </div>\r\n                <div class="control-group">\r\n                    <label>权限</label>\r\n                    <div class="controls">\r\n                        <div class="ms-container">\r\n                            <div class="ms-selectable">\r\n                                <span class="label label-info">未选</span>\r\n                                <ul class="ms-list ms-focus">\r\n                                    <li class="ms-elem-selectable" ms-hover="ms-hover" ms-repeat-auth="authorities" ms-click="select(auth)">\r\n                                        <span>{{auth.Des}}</span>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class="ms-selection">\r\n                                <span class="label label-info">已选</span>\r\n                                <ul class="ms-list">\r\n                                    <li class="ms-elem-selection" ms-hover="ms-hover" ms-repeat-auth="authSelected" ms-click="unselect(auth)">\r\n                                        <span>{{auth.Des}}</span>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <span class="help-inline"></span>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n\t    </div>\r\n\t    <div class="modal-footer">\r\n\t\t    <button type="button" class="btn" ms-click="close">关闭</button>\r\n\t\t    <button type="button" class="btn red" ms-click="save">保存</button>\r\n\t    </div>\r\n    </div>\r\n</div>';
}
return __p;
};
avalon.templateCache.authorityGroup = tmpl();

var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "authorityGroup",
    $skipArray: ["validation", "isvalidated"],
    group: {
        ID: 0,
        Name: '',
        Des: ''
    },
    groups: [],
    // 权限列表
    authorities: [],
    // 已选择的权限列表
    authSelected: [],
    // 是新增还是修改
    isAddMode: true,
    // 分页信息
    currentPage: 1,
    pageCount: 1,
    pageList: [1],
    limit: 5,
    // 子页面
    userView: 'empty',
    // 表单内容是否通过验证
    isvalidated: false,
    // 表单验证控件
    validation: null,

    // 刷新列表
    reload: function (offset) {
        // 如果传了位移(offset)参数过来，就将当前页数加上位移，以完成翻页
        if (offset != void 0) {
            model.currentPage += offset;
        }
        // ajax请求成功后的回调函数
        var successCallback = function (data) {
            model.groups = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        };
        ajax.authorityGroup.List(model.limit, model.currentPage).done(successCallback);
    },
    // 获取权限列表并加载当前权限
    loadAuths: function () {
        ajax.authority.getByGroupId(model.group.ID).done(function (sdata) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < sdata.length; j++) {
                    if (data[i].ID == sdata[j].ID) {
                        data.splice(i, 1);
                    }
                }
            }
            model.authorities = data;
            model.authSelected = sdata;
        });

    },
    // 添加员工
    add: function () {
        model.isAddMode = true;
        model.group = {
            ID: 0,
            Name: '',
            Des: ''
        };
        model.loadAuths();
        model.$init();
        var form1 = $('#groupDetails');
        $('.alert-success', form1).hide();
        $('.alert-error', form1).hide();
        if (model.validation) {
            model.validation.resetForm();
        }
        $('#group_modal').modal('show');
    },
    // 更新员工
    update: function (group) {
        model.isAddMode = false;
        model.group = group;
        model.loadAuths();
        model.$init();
        var form1 = $('#groupDetails');
        $('.alert-success', form1).hide();
        $('.alert-error', form1).hide();
        if (model.validation) {
            model.validation.resetForm();
        }
        $('#group_modal').modal('show');
    },
    // 保存信息
    save: function () {
        $("#groupDetails").submit();
        if (model.isvalidated) {
            var auths = [];
            model.authSelected.map(function (n) {
                auths.push(n.ID);
            });
            ajax.group.save(model.group.$model, auths.join(',')).done(function (data) {
                rootVm.$alert('提示', data.msg, 'info');
                if (data.success) {
                    var form1 = $('#groupDetails');
                    $('.alert-success', form1).hide();
                    $('.alert-error', form1).hide();
                    if (model.validation) {
                        model.validation.resetForm();
                    }
                    $('#group_modal').modal('hide');
                    model.reload();
                }
            }).fail(function () {
                rootVm.$alert('提示', '保存失败', 'error');
            });
        }
    },
    // 删除信息
    dele: function (id) {
        rootVm.$confirm('提示', '确定删除此项吗？', function () {
            $(this).parents('.vanke-confirm').modal('hide');
            ajax.authorityGroup.dele(id).done(function (data) {
                if (data.success) {
                    rootVm.$alert('提示', data.msg, 'success');
                    $('#group_modal').modal('hide');
                    model.reload();
                } else {
                    rootVm.$alert('提示', data.msg, 'info');
                }
            }).fail(function () {
                rootVm.$alert('提示', '删除失败', 'error');
            });
        });
    },
    // 关闭用户对话框
    close: function () {
        $('#group_modal').modal('hide');
    },
    // 查看权限分组下的员工
    showUserList: function (group) {
       // require.async('app/views/department/user', function (m) {
         //   m.showUserList(group, 'group');
        //});
    },
    // 选择权限
    select: function (auth) {
        model.authorities.remove(auth);
        model.authSelected.push(auth);
    },
    // 取消选择权限
    unselect: function (auth) {
        model.authSelected.remove(auth);
        model.authorities.push(auth);
    },
    // 初始化验证控件
    $init: function () {
        var form1 = $('#groupDetails');
        var error1 = $('.alert-error', form1);
        var success1 = $('.alert-success', form1);

        model.validation = form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                Name: {
                    minlength: 2,
                    required: true
                },
                Des: {
                    minlength: 2
                }
            },
            messages: {
                Name: {
                    minlength: jQuery.format("请至少输入{0}个字!"),
                    required: "请输入权限组名称"
                },
                Des: {
                    minlength: jQuery.format("请至少输入{0}个字!")
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                model.isvalidated = false;
                success1.hide();
                error1.show();
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.help-inline').removeClass('ok'); // display OK icon
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change dony by hightlight
                $(element)
                    .closest('.control-group').removeClass('error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
            },

            submitHandler: function (form) {
                model.isvalidated = true;
                success1.show();
                error1.hide();
            }
        });
    }
});

model.reload(0);
avalon.scan();
avalon.vmodels.page.content = "authorityGroup"; 
});