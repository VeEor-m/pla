<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="query.title" placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="query.status" placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-col
            v-for="item in list"
            :key="item.cid"
            :span="4"
            :offset="1"
        >
          <el-card :body-style="{ padding: '0px', height:'260px' }" shadow="hover">
            <span class="id">编号:{{ item.cid }}</span>
              <img
                  :src="item.url?item.url:'https://d33wubrfki0l68.cloudfront.net/69e55f968a6f44613384615c6a78b881bfe28bd6/42cd3/_common-resources/images/flower.svg'"
                  class="image"
              />
            <div style="padding: 14px" class="down">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ item.created }}</time>
                <el-button text class="button">详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="pageVo.count" />
    </div>
  </div>
</template>

<script lang="ts">
import {listBlogContent} from "../request/api";
import {reactive, toRefs} from "vue";
import {InitData} from "../type/blog";

export default {
  name: "bolgs.vue",
  setup() {
    const data = reactive(new InitData());
    listBlogContent(data.pageVo).then((res) => {
      data.list = res.data
      data.pageVo.count=data.list.length
    })
    const currentChange=(page:number)=>{
      data.pageVo.pageNumber=page
    }
    const sizeChange=(size:number)=>{
      data.pageVo.size=size
    }
    return {...toRefs(data),currentChange,sizeChange}
  }
}
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  margin-top: 10px;
  width: 100%;
  height: 70%;
  top: 40px;
  display: block;
}

.el-card {
  margin-bottom: 10px;
}

.id {
  position: absolute;
  top: 10px;
  margin-left: 10px;
  height: 10%;
}
.down{
  height: 10%;
}
</style>