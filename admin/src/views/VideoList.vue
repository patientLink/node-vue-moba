<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230">
      </el-table-column>
      <el-table-column prop="title" label="视频名称" >
      </el-table-column>
      <el-table-column prop="img" label="视频封面" >
        <template v-slot:default="scope">
          <img :src="scope.row.img" alt="" style="width: 13rem;">  
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template v-slot:default="scope">
          <el-button 
            type="text" 
            size="small" 
            @click="$router.push(`/videos/edit/${scope.row._id}`)"
            >
            编辑
          </el-button>
          <el-button 
            type="text" 
            size="small" 
            @click="remove(scope.row)"
            >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/videos')
      this.items = res.data
      console.log(res)
    },
    async remove(row) {
      this.$confirm(`是否确定要删除视频 "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/videos/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style>

</style>