export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'home', component: 'Dashboard' },
        {
            key: '/app/ui', title: '车辆', icon: 'car',
            subs: [
                { key: '/app/vehicles', title: '车辆', component: 'Vehicles' }
            ]
            // subs: [
            //     { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
            //     { key: '/app/ui/icons', title: '图标', component: 'Icons'},
            //     { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
            //     { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
            //     { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
            //     { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
            //     { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
            //     { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
            //     { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
            //     { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
            //     { key: '/app/ui/map', title: '地图', component: 'MapUi'},
            // ],
        },
        {
            key: '/app/animation', title: '线路', icon: 'pause',
            subs: [
                { key: '/app/lines', title: '线路', component: 'Lines' },
                // { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
                // { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
            ],
        },
        {
            key: '/app/device', title: '设备', icon: 'sliders',
            subs: [
                { key: '/app/device/devices', title: '设备', component: 'Devices' },
                // { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
                // { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
                // { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },
        {
            key: '/app/resources', title: '资源', icon: 'resource',
            subs: [
                { key: '/app/resources', title: '资源', component: 'Resources' },
            ],
        },
        {
            key: '/app/form', title: '监控', icon: 'video-camera',
            subs: []
            // subs: [
            //     { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
            // ],
        },
        {
            key: '/app/chart', title: '日志', icon: 'laptop',
            subs: [
                { key: '/app/logs', title: '日志', component: 'Logs' },
            ]
            // subs: [
            //     { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
            //     { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            // ],
        },
        {
            key: '/app/org', title: '客户', icon: 'user', role: 'ADMIN',
            subs: [
                { key: '/app/org/orgs', title: '客户管理', component: 'Orgs' }
            ],
            // subs: [
            //     { key: '/login', title: '登录' },
            //     { key: '/404', title: '404' },
            // ],
        },
        // {
        //     key: '/app/auth', title: '权限管理', icon: 'safety',
        //     subs: [
        //         { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
        //         { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
        //     ],
        // },
        // {
        //     key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        // },
        // {
        //     key: '/app/extension', title: '功能扩展', icon: 'bars',
        //     subs: [
        //         { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
        //     ],
        // },
    ],
    others: [
        {
            key: '/app/org/accounts', title: '账号管理', component: 'Accounts'
        },
        { key: '/app/stations', title: '站点', component: 'Station' }
    ] // 非菜单相关路由
}