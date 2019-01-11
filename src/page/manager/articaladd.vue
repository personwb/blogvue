<template>
  <div style="padding-left: 30px;padding-right: 30px;">
    <div style="margin-top: 20px;">
      <div style="display: inline-block;width: 150px;color: #4a4a4a;">关联一级菜单：</div>
      <el-select v-bind:value="data.levelOneId"
                 v-on:input="onSelectedLevelOne($event)"
                 style="width: 250px;margin-top: 10px;">
        <el-option v-for="item in levelOneList" v-bind:key="item.id" v-bind:label="item.title" v-bind:value="item.id"></el-option>
      </el-select>
    </div>
    <div style="margin-top: 20px;">
      <div style="display: inline-block;width: 150px;color: #4a4a4a;">关联二级菜单：</div>
      <el-select v-model="data.levelTwoId"
                 style="width: 250px;margin-top: 10px;">
        <el-option v-for="item in levelTwoList" v-bind:key="item.id" v-bind:label="item.title" v-bind:value="item.id"></el-option>
      </el-select>
    </div>
    <TitleInput v-model="data.title"
                style="margin-top: 20px;"
                title-width="150"
                placeholder="文章名称"
                title="文章名称："></TitleInput>
    <div style="margin-top: 10px;display: flex;flex-direction: row;align-items: center;height: 44px;">
      <span style="font-size: 16px;width: 150px;text-align: left;display: inline-block;color: #4a4a4a;">Markdown文件：</span>
    </div>
    <el-upload
      style="margin-top: 10px;"
      class="avatar-uploader"
      action="aa"
      :onError="handleError"
      :show-file-list="false">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div style="margin-top: 20px;">
      <a v-if="data.markDownFilePath"
         :href="data.markDownFilePath"
         style="font-size: 16px;color: #4a4a4a;text-decoration: underline;">{{'当前：' + data.markDownFilePath}}</a>
    </div>
    <div style="margin-top: 20px;">
      <a v-if="localFile" style="font-size: 16px;color: #4a4a4a;text-decoration: underline;">{{'已选择：' + localFile.name}}</a>
    </div>
    <el-button v-on:click="onSubmit"
               style="margin-top: 30px;width: 100px;"
               type="primary">保存</el-button>
    <el-button v-if="!isAdd" v-on:click="onPreview"
               style="margin-top: 30px;width: 100px;"
               type="primary">预览</el-button>
    <br/>
  </div>
</template>

<script>
import { articalDetalRouteByArtical } from '../../router/index'
import TitleInput from '../../components/TitleInput'
import {request, URLDefines, articalAdd} from '../../api/api'
export default {
  name: "articaladd",
  props: {
    update: Function,
  },
  components: {
    TitleInput
  },
  data: function () {
    return {
      data: {
        id: null,
        levelOneId: null,
        levelTwoId: null,
        imageUrl: null,
        imageFile: null,
        routePath: null,
        markDownFilePath: null,
        title: null,
        content: null,
      },
      levelOneTwoList: [],
      localFile: null,
    }
  },
  watch: {
    '$route'(to, from) {
      this.getData()
    },
  },
  computed: {
    isAdd () {
      return !(this.$route.query && this.$route.query.id)
    },
    levelOneList () {
      return this.levelOneTwoList
    },
    levelTwoList () {
      if (this.data.levelOneId) {
        for (let item of this.levelOneList) {
          if (item.id === this.data.levelOneId) {
            return item.levelTwoList
          }
        }
      }
      return []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    onPreview () {
      let path = articalDetalRouteByArtical(this.data)
      let routeData = this.$router.resolve({ path: path});
      window.open(routeData.href, '_blank');
    },
    onSelectedLevelOne (id) {
      this.data.levelOneId = id
      if (this.levelTwoList.length) {
        this.data.levelTwoId = this.levelTwoList[0].id
      }
    },
    handleError (error, file) {
      this.localFile = file
    },
    onSubmit () {
      if (!this.data.levelOneId) {
        this.$message.error('请选择一级菜单')
        return
      }
      if (!this.data.levelTwoId) {
        this.$message.error('请选择二级菜单')
        return
      }
      if (!this.data.title) {
        this.$message.error('请输入文章名称')
        return
      }
      if (!this.data.routePath && !(this.data.markDownFilePath || this.localFile)) {
        this.$message.error('请输入路由名称或者选择文件')
        return
      }
      articalAdd({
        data: {
          id: this.isAdd ? null : this.$route.query.id,
          levelOneId: this.data.levelOneId,
          levelTwoId: this.data.levelTwoId,
          title: this.data.title,
        },
        callBack: ({error, inData}) => {
          if (error) {
            this.$message.error(error.message)
            return
          }
          this.$message.success('修改成功')
          this.$emit('update')
        }
      }, (this.localFile || {}).raw)
    },
    getData () {
      this.data = {
        levelOneId: null,
        levelTwoId: null,
        imageUrl: null,
        imageFile: null,
        routePath: null,
        markDownFilePath: null,
        title: null,
      }
      this.localFile = null
      if (this.isAdd) {
        this.getLevelOneTwoList(function () { })
        return
      }
      this.getLevelOneTwoList( () => {
        request({
          path: URLDefines.articalManagerDetail,
          data: {
            id: this.$route.query.id
          },
          callBack: ({error, inData}) => {
            if (error) {
              this.$message.error(error.message)
              return
            }
            this.data = inData;
          }
        })
      })
    },
    getLevelOneTwoList (success) {
      request({
        path: URLDefines.levelOneTwoList,
        callBack: ({error, inData}) => {
          if (error) {
            this.$message.error(error.message)
            return
          }
          this.levelOneTwoList = inData;
          success()
        }
      })
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
