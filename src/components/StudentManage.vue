<template>
    <div>
  <el-row class="container" style="border-bottom: 1px solid #eee">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap" id="nav">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" alt="logo" style="padding-left: 8px;"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">困难学生管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i>{{userName}}
          <i class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div><span style="color:#555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" style="color: #555;font-size: 14px;">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <el-container style="height: 100%">
    <el-aside width="200px" style="background-color: #333744">
        <!-- 侧边栏 -->
        <el-menu default-active="2"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff">
        <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>困难学生管理系统</template>
              <el-menu-item-group>
                <template slot="title">已完成</template>
                <router-link :to="{name:'archivedStudent'}"><el-menu-item index="1-1">已建档</el-menu-item></router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">新增</template>
                <router-link :to="{name:'newRecord'}"><el-menu-item index="1-2">新增记录</el-menu-item></router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">历史</template>
                <router-link :to="{name:'archiveRecord'}"><el-menu-item index="1-3">建档记录</el-menu-item></router-link>
                <!-- <router-link :to="{name:'helpType'}"><el-menu-item index="1-4">帮扶类型</el-menu-item></router-link> -->
              </el-menu-item-group>
            </el-submenu>
              <el-submenu index="2" @click="toggle(2)">
                  <template slot="title">
                      <i class="iconfont icon-student"></i>
                      <span>学生信息管理</span>
                </template>
                <router-link :to="{name:'basicStudent'}"><el-menu-item index="2-1">基本信息库</el-menu-item></router-link>
                <router-link :to="{name:'historicStudents'}"><el-menu-item index="2-2">历史学生库</el-menu-item></router-link>
                <router-link :to="{name:'statisticalNumber'}"><el-menu-item index="2-3">人数统计</el-menu-item></router-link>
              </el-submenu>
        </el-menu>
      </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
  </el-container>
</div>
</template>

<script>
export default {
    data(){
        return {
            userName:''
        }
    },
    beforeRouteEnter:(to,from,next)=>{
        let token = sessionStorage.getItem('token');
        if(!token){
            alert('请先登录！');
            next('/');
        }else{
            next(vm => {
                vm.userName=sessionStorage.getItem('userName')
            })
        }
    },
    methods:{
        logout(){
        sessionStorage.clear();
        this.$router.push('/');
    }
    }
}
</script>


<style scoped>
.el-main{
    position:absolute;
    right: 0px;
    left: 200px;
    top: 51px;
    bottom:0px;
}
.topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;
}
.topbar-logo {
    float: left;
    width: 59px;
    line-height: 26px;
}
.topbar-btn {
    color: #fff;
}
.topbar-logo img {
    height: 40px;
    margin-top: 5px;
    margin-left: 2px;
}
.topbar-title {
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 10px;
}
.topbar-account {
    float: right;
    padding-right: 12px;
}
.topbar-btn {
    color: #fff;
}
.userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
}
.el-aside {
    position:absolute;
    color: #333;
    text-align: center;
    line-height: 200px;
    top:51px;
    bottom: 0px;
}
.el-menu {
    border-right: 0px;
}
.el-menu-item,.el-submenu{
    text-align: left;
    background-color: #333744;
}
.el-menu-item.is-active {
    background-color: #00c1de;
    color: #fff;
}
.router-link-active {
    text-decoration: none;
}
</style>

