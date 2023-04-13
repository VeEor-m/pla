<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logofinal.png" alt="logo" class="logo"></el-col>
          <el-col :span="16"><h2>云原生管理系统</h2></el-col>
          <el-col :span="4" class="col-btn">
            <el-button @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              text-color="#fff"
              active-text-color="#2DC469FF"
              router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!--设置路由出口-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "Index",
  setup() {
    const router = useRouter()
    const list = router.getRoutes().filter(v => v.meta.isShow)
    const logout=()=>{
      localStorage.removeItem('uid')
      router.push('/')
    }
    return {list,logout};
  },
}
</script>

<style lang="scss" scoped>

.el-header {
  height: 80px;
  background: #aeae07;

  .logo {
    height: 80px;
  }
  .col-btn{
  height: 80px;
    line-height: 80px;
  }
  h2, .logout {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #ffffff;
  }
}

.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
    background-color: #2d90c4;
  }

  height: calc(100vh - 80px);
}

</style>