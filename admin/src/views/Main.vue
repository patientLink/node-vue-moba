<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="submenuIndex" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">攻略</template>
            <el-menu-item index="/intros/create">新建攻略</el-menu-item>
            <el-menu-item index="/intros/list">攻略列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>运营管理</template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item :disabled="isAdmin" index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item :disabled="isAdmin" index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{username}}</span>
      </el-header>
      
      <el-main>
        <router-view :key="$route.path"/>
      </el-main>
    </el-container>
  </el-container>
</template>



<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import {mapActions} from 'vuex' 
  export default {
    data() {
      return {
        submenuIndex: ['1'],
        username: localStorage.username || ''
      }
    },
    computed: {
      isAdmin() {
        return !this.$store.state.user.roles.includes('admin')
      }
    },
    methods: {
      ...mapActions('user',['resetToken']),
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.$confirm(`是否确定要退出?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.resetToken()
            }).then(() => {
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
              this.$router.push({name: 'Login'})
            });
            break;
          default:
            return;
        }
      }
    }
  }
</script>