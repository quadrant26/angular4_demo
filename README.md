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

        ng g component componentName,componentName( 多个组件以逗号隔开 )

    navbar	网页/APP导航条

    carousel   轮播图

    search	搜索区域

    product	商品详情

    stars	星级评分

    foot	底部信息

3. 方法

    循环输出指令

        *ngFor="let item of items"

    属性参数传递

        [data] = "data"

    class绑定

        [class.className]="条件判断"

    组件属性值输入

        @Input() 和上一行之间不能换行，否则报错
        
4. 路由
    
    创建一个路由文件
        
        ng g cl app.router
        
    路由
        
        Routes	路由配置，保存着哪个URL对应展示哪个组件，以及在哪个RouterOutlet中展示组件
        Routerlet	在HTML中标记路由内容呈现位置的占位符指令
        Router	负责在运行时执行路由的对象，可以通过调用其navigate()和navigateByUrl()方法来导航到一个指定的路由
        RouterLink	在HTML中声明路由导航用的指令
        
            <a routerLink="/detail/1" routerLinkActive="active">detail</a>
            <a [routerLink]="['/detail', news.id]">{{news.title}}</a>
            <a [routerLink]="[{ outlets: { let2: ['news'] } }]">Contact</a>
            routerLinkActive="active" // 在本路由激活时添加样式 .active
            
        ActivatedRoute	当前激活的路由对象，保存着当前路由的信息，如路由地址，路由参数等
        
    配置
        
        path：路由URL   不能以斜杠 ('/') 开头, 否则报错
        
        component：路由对应的组件
        
            {path:"**",component:Page404Component}   //404页面，放到所有路由的最后
        
        children：[{path:"aaa",component:AaaComponent}]子路由
        
        redirectTo：重定向的URL
        
        pathMatch：指定匹配方式，匹配path中的 ''，（full完全匹配，prefix匹配前缀）
        
        loadChildren：延迟加载
        
        canActivate：[class]    //此处调用的类需要在providers里面声明，该类实现了CanActivate类 implements CanActivate
        
        canDeactivate：[class]  //此处调用的类需要在providers里面声明，该类实现了CanDeactivate类 implements CanDeactivate<component>
        
        resolve：{param1:value1,params2:value2}    //此处调用的类需要在providers里面声明，该类实现了Resolve类 implements Resolve<component>
        
    传参：
    
        方式1：/product?id=1&name=2
        
        方式2：{path:/product/:id}  =>  /product/1
        
        方式3：{path:/product,component:ProductComponent,data:[{flag:true}]}
    
    取值：
        
        ActivatedRoute.queryParams[id]    //适用于方式1
    
        ActivatedRoute.params[id]    //适用于方式2
        
        ActivatedRoute.data[0][flag]  //适用于方式3
              
    参数快照
        
        export class ProductComponent implements OnInit {
            
            private name;
        
            private id;
        
            constructor(private activatedRoute: ActivatedRoute) {
            }
        
            ngOnInit() {
                // 订阅方式 如果会有组件调用本身的情况就使用订阅方式
                this.activatedRoute.params.subscribe((params: Params ) => this.id = params["id"] );
                // 快照方式
                this.name = this.activatedRoute.snapshot.queryParams["name"];
                this.id = this.activatedRoute.snapshot.params["id"];
            }
            
        }
        
    辅助路由
    
        <router-outlet></router-outlet>
        <router-outlet name="aux"></router-outlet>
        
        {path:"xxx",component:XxxComponent,outlet:"aux"}
        {path:"yyy",component:YyyComponent,outlet:"aux"}
        
        <a [routerLink]="[{outlets:{aux:null}}]">xxx</a>
        <a [routerLink]="[{outlets:{primary:'home',aux:'yyy'}}]">yyy</a>
        
        primary：控制主路由
        
    路有守卫
        
        CanActivate：处理导航到某路由的情况。
        CanDeactivate：处理当前路由离开的情况。
        Resolve：在路由激活之前获取路由数据。

5. 依赖注入
    
    1. 注入服务
        
        服务文件 ( heroservice.ts )
            
            export class HeroService {
                heros: Array<{ id: number; name: string }> = [
                    { id: 11, name: 'Mr. Nice' },
                    { id: 12, name: 'Narco' },
                    { id: 13, name: 'Bombasto' },
                    { id: 14, name: 'Celeritas' },
                    { id: 15, name: 'Magneta' }
                ];
            
                getHeros() {
                    return this.heros;
                }
            }
        
        导入 
            
            import { HeroService } from './heroservice';
        
        声明服务
            
	        @component({
	            selector: 'app-hero',
	              ...
	            providers: [HeroService]
	        })
	        
	        ||
	        
	        @NgModule({
	            imports : [HeroComponent],
	            bootstrap : [AppComponent],
	            declarations : [AppComponent, HeroComponent],
	            providers : [HeroService]
	        })
	        
	    注入服务
	        
	        export class HeroComponent implements OnInit {
              constructor(private heroService: HeroService) { }
            }
            
    2. ClassProvider
        
        定义
            
            providers[{ provide: HeroService, useClass : HeroService }]
            
    3. FactoryProvider
        
            constructor(private heroService: HeroService,
                private loggerService: LoggerService) { }
        
            { provide: LoggerService, useFactory: () => { return new LoggerService(true);} }
            prividers : [
                consoleService, 
                HeroService, 
                { 
                    provide: LoggerService, 
                    useFactory: (consoleService) => { return new LoggerService(true, consoleService);}, 
                    deps : [consoleService]
                }
            ]
    
    4. Injectable装饰器
        
        表达式; 该表达式被执行后，返回一个函数; 入参分别为 targe、name 和 descriptor; 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象
        
        类装饰器 (Class decorators)
            
            declare type ClassDecorator = <TFunction extends Function>(target: TFunction) =>    
              TFunction | void
        
        属性装饰器 (Property decorators)
        
        方法装饰器 (Method decorators)
        
        参数装饰器 (Parameter decorators)
        
    5. ValueProvider 
        
        使用
            
            const provider: ValueProvider = {provide: 'someToken', useValue: 'someValue'};
        
        json-server 用于基于 JSON 数据快速地创建本地模拟的 REST API
            
            use: json-server --watch db.json
        
        example
            
            providers: [
	            {
	              provide: 'apiUrl',
	              useValue: 'http://localhost:4200/heros'
	            }
           ],
           
    6. OpaqueToken 
    
        OpaqueToken 用于创建可在 Provider 中使用的 Token
        
        使用
        
            export class OpaqueToken {
              constructor(protected _desc: string) {}
            
              toString(): string { return `Token ${this._desc}`; }
            }
            
            import { ReflectiveInjector } from '@angular/core';
            
            var t = new OpaqueToken("value");
            var injector = ReflectiveInjector.resolveAndCreate([
              {provide: t, useValue: "bindingValue"}
            ]);
            injector.get(t); // "bindingValue"
            
    7. InjectionToken
		
		定义  
			
			export class InjectionToken<T> extends OpaqueToken {
              private _differentiate_from_OpaqueToken_structurally: any;
              constructor(desc: string) { super(desc); }
            
              toString(): string { return `InjectionToken ${this._desc}`; }
            }
        
        使用 
            
            import { ReflectiveInjector } from '@angular/core';
            
            var t = new InjectionToken<string>("value");
            var injector = ReflectiveInjector.resolveAndCreate([
              {provide: t, useValue: "bindingValue"}
            ]);
            injector.get(t); // "bindingValue"
6.

7.
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        