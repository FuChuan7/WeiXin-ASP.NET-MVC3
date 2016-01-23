define('app/views/product/productdetail', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="productdetail">\r\n  <div class="span12">\r\n    <!-- BEGIN EXAMPLE TABLE PORTLET-->\r\n    <div class="portlet box blue">\r\n      <div class="portlet-title">\r\n        <div class="caption">\r\n          <i class="icon-edit"></i>上传图片\r\n        </div>\r\n      </div>\r\n      <div class="portlet-body">\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a id="backbtn" class="btn red" ms-href="{{productId==0 ? \'##\' : \'#!/product\'}}">\r\n              <i class="icon-step-backward">\r\n              </i>{{productId==0 ? \'主页\' : \'返回\'}}\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class="timeline-content">\r\n        \r\n          <div class="row-fluid">\r\n            <div class="span2">名称：</div>\r\n            <div class="span6">{{CurrentPrize.openid}}</div>\r\n          </div>\r\n         \r\n          <div class="tabbable tabbable-custom tabbable-custom-profile">\r\n            <ul class="nav nav-tabs">\r\n              <li class="active">\r\n                <a href="#tab_1_11" data-toggle="tab">\r\n                  图片\r\n                </a>\r\n              </li>\r\n            </ul>\r\n            <div class="tab-content">\r\n              <div class="tab-pane active" id="tab_1_11">\r\n                <div class="portlet box purple">\r\n                  <div class="portlet-title">\r\n                  </div>\r\n                  <div class="portlet-body">\r\n                    <div id="updatebutton" class="row-fluid">\r\n                      <div class="span9">\r\n                        <div id="uploader" class="wu-example">\r\n                          <!--用来存放文件信息-->\r\n                          <div id="thelist" class="uploader-list"></div>\r\n                          <div class="btns">\r\n                            <div id="picker">选择文件</div>\r\n                          \r\n                          </div>\r\n                            \r\n                        </div>\r\n                     \r\n                      </div>\r\n                      <div class="span3">\r\n                        <div class="span12">\r\n                          <div class="pull-right">\r\n                            <button type="submit" class="btn blue start " ms-click="updateFile()">\r\n                              <i class="icon-upload icon-white">\r\n                              </i>\r\n                              <span>\r\n                                开始上传\r\n                              </span>\r\n                            </button>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <hr class="clearfix"/>\r\n                    <div class="row-fluid">\r\n                      <div class="span3" ms-repeat-obj="pics" style="    margin:0px;">\r\n                        <div style="width:150px;" class="span12" >\r\n                          <a ms-href="/Attrachment/{{obj.ImgUrl}}" target="_blank"><img ms-src="/Attrachment/{{obj.ImgUrl}}" style="height:200px;width:150px;" class="span12" /></a>\r\n                          <img ms-click="ShowDelPic(obj)" src="/Content/img/del.png" style="float:right;width:20px;top: -200px;position: relative;"/>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n      <!-- END EXAMPLE TABLE PORTLET-->\r\n    </div>\r\n  </div>\r\n  <!--填写名称-->\r\n  <div id="PicName_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        填写上传的图片名称\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    名称:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placholder="请填写名称"  ms-duplex="productText" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="SavePicName()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--修改密码-->\r\n  <div id="WriteFailReason_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        请输入整改原因\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    原因:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea ms-duplex="FailReason" class="span12" ></textarea>\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="SaveFailReason()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--新增和修改-->\r\n  <div id="Add_Task_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        <!--{{isAdd?\'新增任务\':\'修改任务信息\'}}-->\r\n        审核通过，发布任务\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="Name">\r\n                    任务名称:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <input type="text" name="Name" class="m-wrap span11" placholder="请填写任务名称"  ms-duplex="Name" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="detail">\r\n                    任务规则:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea type="text" name="detail" class="m-wrap span11" placholder="请填写任务规则"  ms-duplex="detail" ></textarea>\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="reward">\r\n                    任务奖惩:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                    <textarea type="text" name="reward" class="m-wrap span11" placholder="请填写任务奖惩" ms-duplex="reward" >\r\n                    </textarea>\r\n                    <span class="help-block"></span>\r\n                  \r\n                  </div>\r\n                </div>\r\n\r\n                <div class="control-group">\r\n                  <label class="control-label  span3" for="reward">\r\n                    需要邀请人数:<span class="required">*</span>\r\n                  </label>\r\n                  <div class="controls  span9">\r\n                      <input type="text" name="UserNum" class="m-wrap span11" placholder="请填写邀请人数"  ms-duplex="UserNum" />\r\n            \r\n                    <span class="help-block"></span>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Savetask()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Pic_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\r\n      <h3 id="deleteDialogLabel">删除图片</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除该图片吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="DeletePic()">确定</button>\r\n    </div>\r\n  </div>\r\n</div>';
}
return __p;
};
avalon.templateCache.productdetail = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "productdetail",
    dataList: {},
    title: '上传图片',
    UpdateId: 0,
    productId: 0,
    productText: '',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    uploader: '',
    total:0,
    PicID: 0,
    pics: [],
    CurrentPrize: {  },
    load: function () {
        ajax.product.get(model.productId).done(function (data) {
            model.CurrentPrize = data.obj;
       });
    },
    $init: function () {
        model.load();
        model.reloadPic();
        model.uploader = WebUploader.create({
            multiple: false,
            // swf文件路径
            'swf': '/static/lib/webuploader/Uploader_8e6362e.swf',
            extensions: 'gif,jpg,jpeg,bmp,png',
            // 文件接收服务端。
            server: '/ActivityImg/UploadFile',
            formData: {
                'UserId': model.productId
            },
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });
        model.uploader.on('fileQueued', function (file) {
            $("#thelist").append('<div id="' + file.id + '" class="item">' +
                '<h4 class="info">' + file.name + '</h4>' +
                '<p class="state">等待上传...</p>' +
                '</div>');
        });
        model.uploader.on('uploadSuccess', function (file) {
            rootVm.$alert('提示', '已上传', 'success');
            $('#uploadDialog').modal('hide');
            $("#thelist").html('');
            model.reloadPic();
        });

        model.uploader.on('uploadError', function (file) {
            rootVm.$alert('提示', '上传出错', 'error');
            $('#uploadDialog').modal('hide');
            $("#thelist").html('');
        });
    },
    updateFile: function () {
       
     //   model.uploader.formData.'productId'=model.productId;
            //'productText': model.productText
       // };
        model.uploader.upload();
    },
    reloadPic: function () {
        ajax.acitivity.List(model.productId).done(function (data) {
            model.pics = data.items;
            model.total = data.total;
            rootVm.$alert('提示', '获取成功', 'success');
       
        });
    },
    SavePicName: function () {
        if (model.productText == '') {
            rootVm.$alert('提示', '未填写名称', 'error');
            return;
        }
        ajax.activity.SavePicName(model.UpdateId,model.productText).done(function (data) {
            if (data.success) {
                model.load();
                rootVm.$alert('提示', '保存成功', 'success');
               
                $("#PicName_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
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
    ShowDelPic: function (obj) {
        model.PicID = obj.ID;
        $("#Delete_Pic_modal").modal('show');
    },

    DeletePic: function () {
        ajax.acitivity.delPic(model.PicID,model.productId).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                $("#Delete_Pic_modal").modal('hide');
                model.reloadPic();
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }
});

avalon.scan();
avalon.vmodels.page.content = "productdetail";

exports.setProductId = function (productId) {
    model.productId = productId;
    model.$init();
    avalon.vmodels.page.content = "productdetail";
}
 
});