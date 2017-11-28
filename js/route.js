var router=new VueRouter({
    linkActiveClass: "active",
    routes:[
        {path: "/", component: Home},
        {path: "/Info", component: Info,
            children: [
                {path: "",component: List},
                {path: "list/:id",component: Con}
            ],
        },
        {path: "/doc", component:Doc,
        children:[
            {path: "",components:{left:Menu,right:Detail}}
        ]},
        {path: "/login", component: Login},
        {path: "/*", redirect: "/"},
    ]
})