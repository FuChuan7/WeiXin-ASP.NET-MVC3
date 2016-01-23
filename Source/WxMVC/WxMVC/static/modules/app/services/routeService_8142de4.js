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
    // 文章分类管理
    avalon.router.get('/ArticleCategory', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '文章分类管理',
            breads: [{
                icon: 'icon-user',
                title: '文章管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '文章分类管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/article/articleCategory', function () {
            avalon.vmodels.page.content = 'articleCategory';
        });
    });
    // 文章管理
    avalon.router.get('/Article', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '文章管理',
            breads: [{
                icon: 'icon-user',
                title: '文章管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '文章列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/article/article', function () {
            avalon.vmodels.page.content = 'article';
        });
    });

    /*// 权限管理
    avalon.router.get('/Authority', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '权限管理',
            breads: [{
                icon: 'icon-user',
                title: '权限管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '权限列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/authority/authority', function () {
            avalon.vmodels.page.content = 'authority';
        });
    });*/

    // 权限分组管理
    avalon.router.get('/AuthorityGroup', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'userCenter',
            title: '权限分组管理',
            breads: [{
                icon: 'icon-user',
                title: '权限管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-info-sign',
                title: '权限分组列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/authority/authorityGroup', function () {
            avalon.vmodels.page.content = 'authorityGroup';
        });
    });

    // 城市管理
    avalon.router.get('/city', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'city',
            title: '城市',
            breads: [{
                icon: 'icon-user',
                title: '城市列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/city/city', function () {
            avalon.vmodels.page.content = 'city';
        });
    });/*
    // 路线信息
    avalon.router.get('/profile', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'line',
            title: '路线',
            breads: [{
                icon: 'icon-user',
                title: '路线列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/line/line', function () {
            avalon.vmodels.page.content = 'line';
        });
    });*/
    // 人员管理
    avalon.router.get('/user/:activityId/:activityGroupId', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'user',
            title: '人员管理',
            breads: [{
                icon: 'icon-book',
                title: '人员管理',
                href: 'javascript:;'
            }, {
                icon: 'icon-book',
                title: '人员详情',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/user/user', function (m) {
            m.setActivityId(params.activityId, params.activityGroupId);
            avalon.vmodels.page.content = 'user';
        });
    });

    // 活动管理
    avalon.router.get('/activity', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'activity',
            title: '分类管理',
            breads: [{
                icon: 'icon-book',
                title: '分类管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/activity/activity', function () {
            avalon.vmodels.page.content = 'activity';
        });
    });
    // 文章管理
    avalon.router.get('/news', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'news',
            title: '文章管理',
            breads: [{
                icon: 'icon-book',
                title: '文章管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/news/news', function () {
            avalon.vmodels.page.content = 'news';
        });
    });
    // 任务管理
    avalon.router.get('/task', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'task',
            title: '任务管理',
            breads: [{
                icon: 'icon-book',
                title: '任务管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/task/task', function () {
            avalon.vmodels.page.content = 'task';
        });
    });
    // 商品管理
    avalon.router.get('/product', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '用户管理',
            breads: [{
                icon: 'icon-book',
                title: '用户管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/product/product', function () {
            avalon.vmodels.page.content = 'product';
        });
    });

    // 商品管理
    avalon.router.get('/productdetail/:productId', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '图片列表',
            breads: [{
                icon: 'icon-book',
                title: '图片列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/product/productdetail', function (m) {
            m.setProductId(params.productId);
            avalon.vmodels.page.content = 'productdetail';
        });
    });


    // 参与任务的微信用户
    avalon.router.get('/wxuser/:taskid', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'product',
            title: '参与用户管理',
            breads: [{
                icon: 'icon-book',
                title: '参与用户列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/wxuser/wxuser', function (m) {
            m.setTaskId(params.taskid);
            avalon.vmodels.page.content = 'wxuser';
        });
    });
    // 地区管理
    avalon.router.get('/Region/:PID', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'region',
            title: '地区管理',
            breads: [{
                icon: 'icon-user',
                title: '地区管理',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/region/region', function (m) {
            m.setPID( params.PID);
            avalon.vmodels.page.content = 'region';
        });
    });

    // 图文文章类别管理
    avalon.router.get('/PageCategory', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'region',
            title: '文章管理',
            breads: [{
                icon: 'icon-user',
                title: '文章类别列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/pageCategory/pageCategory', function (m) {
            avalon.vmodels.page.content = 'pageCategory';
        });
    });
    // 图文管理
    avalon.router.get('/text/:categoryid', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'region',
            title: '文章管理',
            breads: [{
                icon: 'icon-user',
                title: '文章类别列表',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/pageCategory/text', function (m) {
            m.setCategoryId(params.categoryid);
            avalon.vmodels.page.content = 'text';
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
    // 参数设置
    avalon.router.get('/datadic', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'datadic',
            title: '参数设置',
            breads: [{
                icon: 'icon-book',
                title: '参数设置',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/datadic/datadic', function () {
            avalon.vmodels.page.content = 'datadic';
        });
    });
    // 轮播图设置
    avalon.router.get('/image', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'image',
            title: '轮播图设置',
            breads: [{
                icon: 'icon-book',
                title: '轮播图设置',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/image/image', function () {
            avalon.vmodels.page.content = 'image';
        });
    });
    // 投诉建议
    avalon.router.get('/suggest', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'suggest',
            title: '投诉建议',
            breads: [{
                icon: 'icon-book',
                title: '投诉建议',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/suggest/suggest', function () {
            avalon.vmodels.page.content = 'suggest';
        });
    });

    // 起床的标语
    avalon.router.get('/getupword', function () {
        setParams.call(this, rootVm, menuVm, {
            actived: 'getupword',
            title: '起床标语',
            breads: [{
                icon: 'icon-book',
                title: '起床标语',
                href: 'javascript:;'
            }]
        });
        var params = this.params;
        require.async('app/views/getup/getupword', function () {
            avalon.vmodels.page.content = 'getupword';
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