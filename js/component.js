var Home=Vue.component("Home",{
    template: `<div class="home">
                    <Nav></Nav>
                    <div style="padding-top: 44px">index</div>
                </div>`,
});
var Nav=Vue.component("Nav",{
    template:`
       <ul class="Nav">
           <router-link :to="item.url" v-for="(item,key) in menuData" :key="key" exact>{{item.title}}</router-link>
           <router-link to="/login" v-if="!islogin">登录</router-link>
           <span v-if="islogin" class="info" @click="show">
                {{name}} 
                <span class="logout" v-show="isshow" @click="logout">退出</span>
           </span>
       </ul>
    `,
    data() {
        return{
            menuData:[
                {title: "首页",url:"/"},
                {title: "公司简介",url:"/Info"},
                {title: "文档说明",url:"/doc"},
            ],
            islogin: false,
            isshow: false,
            name:""
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow;
        },
        logout(){
            this.del("login");
            router.push("/");
        }
    }
});
var Info=Vue.component("Info",{
    template: `<div class="Info">
                    <Nav></Nav>
                    <!--mode设置动画的模式先出后进out-to-->
                    <transition name="opacity" mode="out-in">
                        <router-view style="padding-top: 44px"></router-view>
                    </transition>   
                </div>`,
});
var List=Vue.component("List",{
    template: `
    <ul class="mui-table-view" style="padding-top: 44px;position: absolute;width: 100%">
        <li class="mui-table-view-cell mui-media">
            <router-link to="/Info/list/1" tag="a">
                <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                </div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media">
            <router-link to="/Info/list/2" tag="a">
                <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                </div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media">
            <router-link to="/Info/list/3" tag="a">
                <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                </div>
            </router-link>
        </li>
    </ul>
`,
    beforeRouteEnter(to,from,next){
        next();
    },
    beforeRouteLeave(to,from,next){
        next();
    }
});
var Con=Vue.component("Con",{
    template:`
    <div style="padding-top: 44px;position: absolute">
        {{$route.params.id}}
    </div>
    `
});
var Doc=Vue.component("Doc",{
    template: `<div style="position: absolute;left: 0;top: 0;width: 100%">
                    <Nav></Nav>
                    <div class="Doc" style="padding-top: 44px">
                        <router-view class="left" name="left"></router-view>
                        <router-view class="right" name="right"></router-view>
                    </div>
                </div>`,
    beforeRouteEnter(to,from,next){
        next(function (vm) {
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
    });
var Menu=Vue.component("Menu",{
    template: `<ul>
                    <li>
                        <router-link to="#js">JavaScript</router-link>
                    </li>
                    <li>
                        <router-link to="#one">基本语法</router-link>
                    </li>
                    <li>
                        <router-link to="#two">变量命名</router-link>
                    </li>
                    <li>
                        <router-link to="#three">函数定义</router-link>
                    </li>
                    <li>
                        <router-link to="#four">DOM元素的操作</router-link>
                    </li>
                </ul>`,
    watch:{
        $route() {
            var hash=this.$route.hash.slice(1);
            // console.log(num);
            var vm = this;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ start: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ start: (document.querySelector("#"+hash).offsetTop)-50 }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.start.toFixed(0)
                })
                .start();
            animate();
        }
    }
});
var Detail=Vue.component("Detail",{
    template:`<div class="detail">
                <div id="js">js</div>
                <div id="one">js的基本语法</div>
                <div id="two">js中变量的命名规则</div>
                <div id="three">js中函数的定义及语法规范</div>
                <div id="four">DOM元素的操作</div>
              </div>`
});
var Login=Vue.component("Login",{
    template:`
        <div>
<header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div></div>
    `,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name": document.querySelector("#name").value};
            this.save("login",obj);
            router.push("/doc");
        }
    }
})