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
//datadic
exports.datadic = {
    List: function (limit, page, pid) {
        return lib.ajax({
            url: '/DataDic/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                pid: pid
            }
        });
    },
    save: function (id, code, name, des, value, pid) {
        return lib.ajax({
            url: '/DataDic/Save',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                code: code,
                name: name,
                des: des,
                value: value,
                pid: pid
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/DataDic/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
//image
exports.image = {
    List: function (page, limit) {
        return lib.ajax({
            url: '/Image/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/Image/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
}
exports.user = {
    List: function (limit,page) {
        return lib.ajax({
            url: '/Manager/UserList',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    confirmSignIn: function (record) {
        return lib.ajax({
            url: '/User/ConfirmSignIn',
            type: 'get',
            dataType: 'json',
            data: record
        });

    },
    setActivityGroup: function (groupId, userId) {
        return lib.ajax({
            url: '/User/SetActivityGroup',
            type: 'get',
            dataType: 'json',
            data: {
                groupId: groupId,
                userId: userId
            }
        });
    },
    Delete:function(id){
        return lib.ajax({
            url: '/User/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id:id
            }
        });
    },
    Save: function (user, ActivityId) {
        return lib.ajax({
            url: '/User/Save',
            type: 'get',
            dataType: 'json',
            data: {
                ActivityId: ActivityId,
                Name: user.Name,
                userId: user.ID,
                Phone: user.Phone,
                IDCard: user.IDCard,
                Mark:user.Mark
            }
        });
    }
};
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
            data: {id:id}
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
    },
    SetCP:function(cpId,managerId){
        return lib.ajax({
            url: '/Manager/SetCP',
            type: 'post',
            dataType: 'json',
            data: {
                cpId: cpId,
                managerId: managerId
            }
        });
    }

}
exports.acitivity = {
    List: function (id) {
        return lib.ajax({
            url: '/ActivityImg/ListAll',
            type: 'get',
            dataType: 'json',
            data: {
                productId:id
            }
        });
    },
    save: function (id, name) {
        return lib.ajax({
            url: '/Activity/Save',
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name
            }
        });
    },
    delPic: function (id,userid) {
        return lib.ajax({
            url: '/ActivityImg/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                UserId: userid
            }
        });
    
    },
    del: function (id) {
        return lib.ajax({
            url: '/Activity/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    
    }
};
exports.news = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/ActivityGroup/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    SetCategory: function (categoryId, id) {
        return lib.ajax({
            url: '/ActivityGroup/SetCategory',
            type: 'get',
            dataType: 'json',
            data: {
                categoryId: categoryId,
                id: id
            }
        });
    },
    SynchronizedData: function () {
        return lib.ajax({
            url: '/ActivityGroup/synchronizedData',
            type: 'get',
            dataType: 'json',
            data: {
            }
        });
    }
};
exports.task = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/Task/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                type: 1
            }
        });
    },
    save: function (id, BrandID, Title, rule) {
        return lib.ajax({
            url: '/Task/Save',
            type: 'post',
            dataType: 'json',
            data: {
                ID: id,
                BrandID: BrandID,
                Title: Title,
                rule: rule
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/Task/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
};
exports.product = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/product/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                type: 1
            }
        });
    },
    save: function (id, BrandID, Title, rule, reward) {
        return lib.ajax({
            url: '/product/Save',
            type: 'get',
            dataType: 'json',
            data: {
                ID: null,
                BrandID: BrandID,
                Title: Title,
                rule: rule,
                reward: reward
            }
        });
    },
    UpdateScanNum: function (id, scanNum) {
        return lib.ajax({
            url: '/product/UpdateScanNum',
            type: 'get',
            dataType: 'json',
            data: {
                ID: id,
                scanNum: scanNum
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/product/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    get: function (id) {
        return lib.ajax({
            url: '/ActivityImg/GetById',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    },
    SaveFailReason: function (productId, FailReason) {
        return lib.ajax({
            url: '/product/SaveFailReason',
            type: 'get',
            dataType: 'json',
            data: {
                FailReason: FailReason,
                productId: productId
            }
        });
    
    }
};
exports.wxuser = {
    List: function (page,limit, taskid) {
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

exports.city = {
    List: function (limit, page, pid) {
        return lib.ajax({
            url: '/City/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (id, name, Mark, Coordinate) {
        return lib.ajax({
            url: '/City/Save',
            type: 'get',
            dataType: 'json',
            data: {
                id:id,
                name: name,
                Coordinate: Coordinate,
                Mark:Mark
            }
        });
    },
    Del: function (id) {
        return lib.ajax({
            url: '/City/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
}

//文章类别管理
exports.articleCategory = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/ArticleCategory/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (id, name) {
        return lib.ajax({
            url: '/ArticleCategory/Save',
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/ArticleCategory/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    }
};

//文章管理
exports.article = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/Article/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    SetCategory: function (categoryId, id) {
        return lib.ajax({
            url: '/Article/SetCategory',
            type: 'get',
            dataType: 'json',
            data: {
                categoryId: categoryId,
                id: id
            }
        });
    },
    SynchronizedData: function () {
        return lib.ajax({
            url: '/Article/synchronizedData',
            type: 'get',
            dataType: 'json',
            data: {
        }
    });
}
};

//地区
exports.region = {
    List: function (limit, page, pid) {
        return lib.ajax({
            url: '/Region/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                pid: pid
            }
        });
    },
    save: function (id, name, pid) {
        return lib.ajax({
            url: '/Region/Save',
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name,
                pid: pid
            }
        });
    },
    Del: function (id) {
        return lib.ajax({
            url: '/Region/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });
    }
}



exports.authorityGroup = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/AuthorityGroup/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (record, auths) {
        record.authorityIds = auths;
        return lib.ajax({
            url: '/AuthorityGroup/Save',
            type: 'post',
            dataType: 'json',
            data: record
        });
    },
    dele: function (id) {
        return lib.ajax({
            url: '/AuthorityGroup/Delete',
            type: 'post',
            dataType: 'json',
            data: {
                ids: id
            }
        });
    }
};


//文章类别管理
exports.pageCategory = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/PageCategory/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (id, name) {
        return lib.ajax({
            url: '/PageCategory/Save',
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/PageCategory/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    }
};


//文章管理
exports.text = {
    List: function (limit, page,categoryid) {
        return lib.ajax({
            url: '/Page/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit,
                categoryid: categoryid
            }
        });
    },
    save: function (id, title, text, categoryid) {
        return lib.ajax({
            url: '/Page/Save',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                title: title,
                text: text,
                categoryid: categoryid
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/Page/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    }
};

//起床标语
exports.getupword = {
    List: function (limit, page) {
        return lib.ajax({
            url: '/PagGetUpWorde/List',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                limit: limit
            }
        });
    },
    save: function (id, title, text, StartTime, EndTime) {
        return lib.ajax({
            url: '/GetUpWord/Save',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                title: title,
                text: text,
                StartTime: StartTime,
                EndTime: EndTime
            }
        });
    },
    del: function (id) {
        return lib.ajax({
            url: '/GetUpWord/Delete',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
        });

    }
}; 
});