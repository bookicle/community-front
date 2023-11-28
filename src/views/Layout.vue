<script setup>
import {ref, reactive, getCurrentInstance} from "vue";
import {useRoute, useRouter} from "vue-router";
const {proxy} = getCurrentInstance()
const router = useRouter();
const route = useRoute();

const logoInfo = [
  {
    letter: "N",
    color: "#3285FF",
  },
  {
    letter: "W",
    color: "#FB3624",
  },
  {
    letter: "A",
    color: "#FFBA02"
  },
  {
    letter: "F",
    color: "#3285FF"
  },
  {
    letter: "U",
    color: "#25B24E"
  },
];

</script>

<template>
<div class="header">
  <div class="header-content" :style="{width: proxy.globalInfo.bodyWidth+'px'}">
<!--    logo-->
    <router-link to="/" class="logo ">
      <span v-for="item in logoInfo" :style="{color: item.color}" >{{item.letter}}</span>
    </router-link>
<!--    板块信息-->
    <div class="menu-panel"></div>
<!--    登录注册用户信息-->
    <div class="user-info-panel">
      <div class="op-btn">
        <el-button type="primary" >
          发帖 <span class="iconfont icon-post"> </span></el-button>
        <el-button type="primary" >
          搜索 <span class="iconfont icon-search" > </span> </el-button>
      </div>

      <el-button-group :style="{'margin-left':'20px'}">
        <el-button type="primary" plain >
          登录 <span class="iconfont icon-login"></span> </el-button>
        <el-button type="primary" plain >
          注册 <span class="iconfont icon-register"></span> </el-button>
      </el-button-group>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0 #ddd;
  .header-content {
    margin: 0 auto;
    align-content: center;
    height: 60px;
    display: flex;
    align-items: center;

    .logo {
      display: block;
      text-decoration: none;
      font-size: 25px;
      font-family: "Roboto", sans-serif;
      font-weight: bold;
      margin-right: 10px;

    }

    .menu-panel {
      flex: 1;
    }

   .user-info-panel {
      width: 300px;
      display: flex;
     .op-btn{
       .iconfont{
         margin-left: 5px;
       }
       .el-buttun + .el-button {
          margin-left: 5px;
     }
     }

   }
  }
}
</style>
