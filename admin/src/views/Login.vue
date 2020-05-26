<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      model: {
      }
    }
    
  },
  methods: {
    login() {
      this.$http.post('login', this.model).then((res) => {
        // console.log(res)
        localStorage.token = res.data.token
        localStorage.username = res.headers.user
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      }).then(() => {
        this.model.password = ''
      })
      
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