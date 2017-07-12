# angular4_demo

1. 环境搭建

        node verison 8.1.3
        npm version 5.0.3
        os win32 x64

    安装 angular 脚手架

        npm install -g @angular/cli

        ng --version 1.2.0

    创建一个 angular4 的项目

        ng new projectName

    启动服务

        cd projectName
        ng server ( http:127.0.0.1:4200 默认端口为 4200 )

    安装 jquery 和 bootstrap

        npm install --save jquery bootstrap

    安装描述性文件

        npm install @types/jquery --save-dev
        npm install @types/bootstrap --save-dev

    .angular-cli.json 写入

        "scripts" : [
            "../node_modules/jquery/jquery.js",
            "../node_modules/bootstrap/dist/js/bootstrap.min.js"
        ],
        "styles" : [
            "../node_modules/bootstrap/dist/css/bootstrap.min.css"
        ]

    在 style.css 中引入 bootstrap.css

        @import "~bootstrap/dist/css/bootstrap.min.css"

2. 模块布局

    app	项目自带的默认component

        ng component g componentName,componentName( 多个组件以逗号隔开 )

    navbar	网页/APP导航条

    carousel   轮播图

    search	搜索区域

    product	商品详情

    stars	星级评分

    foot	底部信息