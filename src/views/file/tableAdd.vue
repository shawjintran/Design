<template>
  <el-row>
    <el-col style="max-height: 300px;overflow-y: scroll">
      <div v-for="(xdoc,index) of tableData" :key="index" class="docDiv" @click="toDetail(xdoc)">
        <i class="el-icon-document-checked docIcon"></i>
        <div style="width: 100%;display: flex;justify-content: space-between;align-items: flex-end;">
          <div style="display: inline-block" class="docWord" >
            <span class="docName docName-wrap">{{xdoc.name}}</span>
            <div>
              <span class="docSize">No.{{xdoc.docId}}&nbsp|&nbsp</span>
              <span class="docSize">共&nbsp{{xdoc.size}}&nbsp篇文档</span>
            </div>
          </div>
          <div style="display: inline-block;height:30px;width: 50px;" @click.stop>
            <div @click.stop>
              <el-dropdown trigger="click" placement="bottom-start"  @click.stop>
              <span style="width: 100%" class="el-dropdown-link" >
                <i class="el-icon-arrow-down divOperate"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" divided @click.native="toDetail(xdoc)">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "tableManage",
  props:["docs"],
  data(){
    return{
      // 表格数据
      tableData: [
        {
          id:1,
          name:'ss'
        }
      ],
    }
  },
  mounted() {
    this.tableData=this.docs
  },
  methods:{
    toDetail(row){
      console.log(row)
      this.$router.push({
        path: '/filedetail/filedetail',
        query: {
          docId: row.docId,
          docName: row.name,
          docAuth:row.auth,
          docType:2,
        }
      })
    },
  }
}
</script>

<style scoped>
.docDiv{
  padding: 15px 5px;
  display: flex;
  justify-items: flex-start;
  align-items: center;
  border: 1px solid #eff2f5;
  border-right: none;
  border-left: none;
}
.docName{
  font-size: 18px;
  font-weight: bold;
}
.docName-wrap{
  display:inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 500px;
}
.docWord{
  padding-left: 15px;
  line-height: 20px;
}
.docSize{
  color:#5a5e66;
}
.docIcon{
  font-size: 35px;
  background-color: #3a8ee6;
  padding:5px;

}
::-webkit-scrollbar {
  display: none;
}
@media screen and (max-width: 767px) {
  .docName-wrap{
    max-width: 200px;
  }
}

</style>
