# angular4_demo

Angular Cli 命令

	创建新的 angular 项目 ng new project-name
	
	初始化 ng init
	
	开启服务 ng server
	
	ng generate 命令
	
	ng generate class my-new-class: 新建 class
		--spec (false | true) 是否生成单元测试相关的 spec 文件
    ng generate component my-new-component: 新建组件
        --flat: boolean, 默认为 false, 表示在 src/app 目录下生成组件而不是在 src/app/site-header 目录中
        --inline-template: boolean, 默认为 false, 表示使用内联模板而不是使用独立的模板文件
        --inline-style: boolean, 默认为 false, 表示使用内联样式而不是使用独立的样式文件
        --prefix: boolean, 默认为 true, 使用 .angular-cli.json 配置的前缀作为组件选择器的前缀
        --spec: boolean, 默认为 true, 表示生成包含单元测试的 spec 文件
        --view-encapsulation: string, 用于设置组件的视图封装策略
        --change-detection: string, 用于设置组件的变化检测策略
    ng generate directive my-new-directive: 新建指令
    ng generate enum my-new-enum: 新建枚举
    ng generate module my-new-module: 新建模块
    ng generate pipe my-new-pipe: 新建管道
    ng generate service my-new-service: 新建服务
    
    简写
    ng g cl my-new-class: 新建 class
    ng g c my-new-component: 新建组件
    ng g d my-new-directive: 新建指令
    ng g e my-new-enum: 新建枚举
    ng g m my-new-module: 新建模块
    ng g p my-new-pipe: 新建管道
    ng g s my-new-service: 新建服务

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

6. 属性操作 
	
	1. 插值表达式
		
			<p>{{product}}</p> 
	
	2. 属性
		
			<img src="{{imgsrc}}" />
			<img [src]="imgsrc" />
	
	3. 事件
		
			<p (click)="clickEvent($event)">click</p>
		
	4. dom 属性
		
			event.target.value
		
	5. html 属性
		
			event.target.getAttribute("value")
			
			<div class="aaa bbb" [class]="ccc">这种方式会替换原class属性的值</div>
	        <div class="aaa bbb" [class.ccc]="true">这种方式不会替换原class属性的值</div>
	        <div [ngClass]="{aaa:isTrue,bbb:isShow}">这种方式可以控制多个属性的显示</div>
        
    6. 双向数据绑定
        
            <p [(ngModel)]="name">双向数据绑定</p>
            
        表单控件双向绑定
            
            <input name="username" [(ngModel)]="username" />
            
            app.module.ts
            
            import { FormsModule } from '@angular/forms';
            @NgModule({
              declarations: [],
              imports: [ ..., FormsModule ]
            })
            

7. 管道
	
	1. 定义
		
			{{name | filter}}
			eg:{{birthday | data}}// 将生日转化成日期格式
	        eg:{{birthday | data:'yyyy-MM-dd HH:mm:ss'}}// 将生日转化成指定日期格式
        
    2. 自定义
        
        在项目中生成一个管道，然后在管道类的transform方法中对值进行操作。
        
            export class PipeName implements PipeTransform {
                transform(value: any, arg: any): any {
                    // value 是要在管道做处理的值
                    // arg 是管道后面跟着的参数
                }
            }
            
    3. 响应式编程
        
        1、在项目模块中引入ReactiveFormsModule模块
            
            import { ReactiveFormsModule } from ''
        
        2、在组件中声明FormControl类型的字段
        
            eg:formControlName
        
        3、在页面中控件上声明
            
            [formControl]="formControlName"
        
        4、在组件中订阅formControlName的valueChanges事件
        
            eg:this.formControlName.valueChanges.subscribe(value => this.keyword = value);

8. 组件通信

		[(ngModel)]="attribute"; 报错
		
		需要在 app.modules.ts 中
		
		import {FormsModule, FormControl, ReactiveFormsModule} from '@angualar/forms';
		
		@NgModule({
			...
			imports : [
				...
				FormsModule
				...
			]
			...
		})
		

	1. 生命周期
		
		被调用一次的钩子
		
			constructor（组件构造方法，调用该方法时，组件的输入属性没有值）
            
            ngOnInit（初始化组件或指令，调用该方法时，OnChanges方法已被调用，组件的输入属性有值）
            
            ngAfterContentInit（和angular的内容投影相关的）
            
            ngAfterViewInit（和angular的视图初始化和检查相关的,在此方法不可修改组件的属性）
            
            ngOnDestroy（组件销毁，在路由到其他组件时当前组件被销毁）
            
        被调用多次的钩子
            
            ngOnChanges（父组件初始化或修改子组件的输入属性的值的时候被调用，如果一个方法没有输入属性，则该方法不会被调用）
            
            ngDoCheck（用来检测，在每个angular的变更检测周期调用）
            
            ngAfterContentChecked（和angular的内容投影相关的）
            
            ngAfterViewChecked（和angular的视图初始化和检查相关的,在此方法不可修改组件的属性）
        
        调用顺序：
            
            constructor、ngOnChanges、ngOnInit、ngDoCheck、ngAfterContentInit、ngAfterContentChecked、ngAfterViewInit、ngAfterViewChecked、ngAfterContentChecked、ngAfterViewChecked
            
	2. 输入输出属性
		
		输入属性
			
			在需要注入的属性上用@Input注解
            在父组件中用[propName]="value"来赋值
		
		输出属性
			
			在子组件属性上用@Output解属性类型为EventEmitter<DataType>类型
            @Output()
            prop:EventEmitter<DataType> = new EventEmitter();
            用 prop.emit(dataTypeObj)
            
            在父组件中声明dataTypeObj:DataType = DataType();//用来存放子组件Output出来的属性
            
            在父组件引用子组件的标签上用事件订阅来订阅自组建发射的事件
            用<child-comp (prop)="propHandler($event);"></child-comp>
            // 监控的事件名 prop 和@Output中的参数一致，不传参时默认和属性名一致
            
            在父组件中声明
            propHandler(event:DataType){
                // 把子组件Output出来的属性赋值到父组件的属性上
                this.dataTypeObj = event;
            }
            
        中间人
            
            两个子组件，通过@Output数据到父组件和@Input从父组件接收数据来实现组件间通讯，父组件为中间人
            
        父组件调用子组件的方法

			在父组件的模块中调用子组件的方法
            1、在子组件上声明模版变量 #childName
            2、在父组件中声明一个类型为 ChildeComponent 的变量 child
            3、用 @ViewChild("childName") 注解声明的变量 child
            4、在代码块中用 this.child.methodName(args) 来调用子组件的方法
            
            #在父组件的模版中调用子组件的方法
            
            1、在子组件上声明模版变量 #childName
            2、在父组件的模版中绑定事件 (click)="childName.methodName('args')"
            
        父组件内容投影到子组件中
        
            #父组件
            <div>
                <child-comp>
                    <div class="header">这是头部</div>
                    <div class="footer">这是底部</div>
                </child-comp>
            </div>
            
            #子组件
            <div>
                <ng-content select=".header"></ng-content>
                <ng-content select=".footer"></ng-content>
            </div>
            
            定义单个投影点时可以不写class属性和select属性
		

9.

10. 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        