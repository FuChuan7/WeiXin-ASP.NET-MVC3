define('app/views/image/image', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="image">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        \r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAddPic()">\r\n            <i class="icon-plus">\r\n            </i>新增\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              图片\r\n            </th>\r\n            <th>\r\n              链接\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:600px;">\r\n            <td >\r\n              <span >\r\n                <img style=" height:200px;" ms-src="/Content/Attachment/Img/{{obj.Path}}"/>\r\n              </span>\r\n            </td>\r\n            <td style="max-width:200px;overflow-wrap: break-word;">\r\n              {{obj.Link}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-click="ShowUpdatePic(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" ms-click="Delete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    \r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  \r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除活动</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除活动吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--文件上传窗口-->\r\n  <div id="uploadDialog" class="modal modal-large hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">上传文件(文件大小不要超过5M)</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n\r\n      <div class="row-fluid">\r\n        <div class="span12">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片链接:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input type="text" name="Name" class="m-wrap span12" placholder="请填写图片链接" ms-duplex="CurrentObj.Link" />\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="row-fluid">\r\n        <div class="span12 ">\r\n          <div class="control-group">\r\n            <label class="control-label " for="Name">\r\n              图片文件【宽与高比例为2:1】:<span class="required">*</span>\r\n            </label>\r\n            <div class="controls">\r\n              <input id="file_upload" name="file_upload" type="file" multiple="true"/>\r\n              <span class="help-block"></span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="ImgUpload()">上传</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.image = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "image",
    limit: 100,
    total: '',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    dataList:[],
    CurrentObj: { ID: '', Path: '', Link: '' },
    load: function () {
        ajax.image.List(model.currentPage, model.limit).done(function (data) {
            model.dataList = data.items;
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
    ShowAddPic: function () {
        model.CurrentObj.ID = 0;
        model.CurrentObj.Link = '';
        model.CurrentObj.Path = '';
        $('#uploadDialog').modal('show');
    },
    //初始化数据
    ShowUpdatePic: function (obj) {
        model.CurrentObj = obj.$model;
        $('#uploadDialog').modal('show');
    },
    ImgUpload: function () {
        $.ajaxFileUpload({
            url: '/Image/UploadFile',
            secureuri: false,
            data: { id: model.CurrentObj.ID, Link: model.CurrentObj.Link },
            fileElementId: 'file_upload',
            dataType: 'text',
            success: function (data) {
                if (data == '1') {
                    rootVm.$alert('提示', '请选择合适的图片', 'success');
                } else if (data == '2') {
                    rootVm.$alert('提示', '上传成功', 'success');
                    $('#uploadDialog').modal('hide');
                    model.load();
                } else if (data == '0') {
                    rootVm.$alert('提示', '上传失败', 'success');
                }

            },
            error: function (data) {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    //初始化数据
    $init: function () {
        model.load();
     
    },
    updateFile: function (obj) {
        model.uploader[obj.$model.ID].upload();
    },
    ShowDelete: function (record) {
        model.CurrentPrize = record.$model;
        $('#Delete_modal').modal('show');
    },
    Delete: function (obj) {
        rootVm.$confirm('警告', '你确认删除吗？', function () {
            ajax.image.del(obj.ID).done(function (data) {
                if (data.success) {
                    rootVm.$alert('提示', data.msg, 'success');
                    $('.confirm-dialog').modal('hide');
                    model.load();
                } else {
                    rootVm.$alert('提示', data.msg, 'error');
                }
            });
        });
    }

});
avalon.scan();
avalon.vmodels.page.content = "image"; 
});