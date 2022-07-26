<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="seriesNum.startNum > 1">1</button>

    <button v-if="seriesNum.startNum > 2">···</button>
    <!-- 分页器中间部分 -->
    <div v-for="(page, index) in seriesNum.endNum" :key="index">
      <button v-if="page >= seriesNum.startNum">
        {{ page }}
      </button>
    </div>

    <button v-if="seriesNum.endNum + 1 < totalPages">···</button>
    <button v-if="seriesNum.endNum < totalPages">{{ totalPages }}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    {{ seriesNum }}---当前{{ pageNo }}---共{{ totalPages }}
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算总共多少页
    totalPages() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字
    seriesNum() {
      const { continues, pageNo, totalPages } = this;
      let startNum = 0;
      let endNum = 0;
      if (continues > totalPages) {
        //如果出现不正常现象：总页数不够5页
        startNum = 1;
        endNum = totalPages;
      } else {
        //正常现象[连续页码数为5（分页器至少有5页数据）]
        startNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        //不正常现象:起始页码小于1
        if (startNum < 1) {
          startNum = 1;
          endNum = 5;
        }
        //不正常现象:末尾页码大于totalPages
        if (endNum > totalPages) {
          startNum = endNum - continues;
          endNum = totalPages;
        }
      }
      return { startNum, endNum };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
