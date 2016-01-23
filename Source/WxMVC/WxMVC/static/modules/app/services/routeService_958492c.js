define('app/services/routeService', function(require, exports, module){ 
var avalon = require('vendor/avalon/mmRouter');

function initRoute() {
    var rootVm = avalon.vmodels.root;
    var menuVm = avalon.vmodels.sidebar;

	
    avalon.router.get('/', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'home',
            title: '主页',
            breads: [{
                icon: 'icon-home',
                title: '主页',
                href: 'javascript:;'
            }]
        });
        require.async('app/views/home/home', function (m) {
            m.reload();
        });
    });

    // 个人中心
    avalon.router.get('/profile', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '我的信息',
            breads: [{
                icon: 'icon-user',
                title: '个人中心',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '我的信息',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/userCenter/userCenter', function () {
            avalon.vmodels.page.content = 'userCenter';
        });
    });

    // 管理员管理
    avalon.router.get('/manager', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'manager',
            title: '管理员管理',
            breads: [{
                icon: 'icon-book',
                title: '管理员管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/manager/manager', function () {
            avalon.vmodels.page.content = 'manager';
        });
    });
    // 微信用户管理
    avalon.router.get('/manager', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'manager',
            title: '微信用户管理',
            breads: [{
                icon: 'icon-book',
                title: '微信用户管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/manager/manager', function () {
            avalon.vmodels.page.content = 'manager';
        });
    });
    avalon.history.start({
        basepath: "/Home/Index"
    });
}

function setParams(rootVm, menuVm, opts) {
    rootVm.currPath = this.path
    var params = this.params
    rootVm.params = params
    rootVm.query = this.query
    //rootVm.args = "[" + [].slice.call(arguments, 0) + "]"

    // 菜单的视图变化
    //menuVm.actived = opts.actived;
    // 标题的变化
    rootVm.title = opts.title;
    // 组装面包屑
    rootVm.breads = opts.breads.length ? opts.breads : rootVm.bread;
}

exports.initRoute = initRoute; 
});