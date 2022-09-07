<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img class="logo" src="../assets/logo.png"></el-col>
          <el-col :span="16"><h2 class="title">后台管理系统</h2></el-col>
          <el-col :span="4"><span class="loginout">退出登陆</span></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
            >
              <el-menu-item :index="item.path" v-for="item in navList" :key="item.path">
                <span>{{item.meta.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view/>
          <!-- <el-button @click="increment">点我</el-button>
          <button @click="toAbout">去about页面</button> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {  useStore } from 'vuex'

import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const store = useStore()

    const router = useRouter()

    const navList = router.getRoutes().filter(item => {
      return item.meta.isShow
    })


    console.log(navList)

    return {
      navList,
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),
      
      increment: () => {
        return store.dispatch('increment')
      },

      toAbout: () => {
        router.push({
          name: 'about'
        })
      }

    }
  }
});
</script>

<style lang="scss" scoped>
  .el-header {
    height: 100px;
  }
  .el-aside {
    height: calc(100vh - 80px);
    background-color: gray;
  }
  .logo {
    width: 80px;
    height: 80px;
  }
  .title {
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .loginout {
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .el-menu-vertical-demo {
    background-color: transparent;
  }

</style>
