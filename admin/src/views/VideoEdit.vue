<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item  label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item  label="链接">
        <el-input v-model="model.link"></el-input>
      </el-form-item>
      <el-form-item  label="封面">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          >
          <img v-if="model.img" :src="model.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        categories: [],
        model: {
          categories: [],
          title: '',
          link: '',
          img: ''
        }
      }
    },
    methods: {
      afterUpload(res) {
        console.log(res)
        this.$set(this.model, 'img', res.url)
      },
      async save() {
        let res
        if(this.id) {
          res = await this.$http.put(`rest/videos/${this.id}`, this.model)
        }else{
          res = await this.$http.post('rest/videos', this.model)
        }
        
        console.log(res)
        this.$router.push('/videos/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/videos/${this.id}`)
        console.log(res.data)
        this.model = res.data
      },
      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()
    }
  }
</script>

<style>

</style>