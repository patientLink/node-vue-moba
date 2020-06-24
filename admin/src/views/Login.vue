<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="userLogin">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button type="info" @click="visitorLogin">游客登录</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      model: {
      }
    }
    
  },
  methods: {
    ...mapActions('user',['login']),
    userLogin() {
      this.login({that:this, model:this.model}).then(() => {
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      }).then(() => {
        this.model.password = ''
      })
    },
    visitorLogin() {
      this.model = {username: 'visitor', password: '123456'}
      this.userLogin()
    }
  }
  
}
</script>

<style>
  .login-card {
    width: 25rem;
    margin: 10rem auto;
  }

</style>