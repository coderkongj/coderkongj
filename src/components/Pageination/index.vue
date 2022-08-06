<template>
  <div class="pagination">
    <!-- 分页器前部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="seriesNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="seriesNum.startNum > 2">···</button>

    <!-- 分页器中间部分 -->
    <button
      v-for="(page, index) in seriesNum.endNum"
      :key="index"
      v-show="page >= seriesNum.startNum"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 分页器后部分 -->
    <button v-if="seriesNum.endNum < totalPages - 1">···</button>
    <button
      v-if="seriesNum.endNum < totalPages"
      @click="$emit('getPageNo', totalPages)"
      :class="{ active: pageNo == totalPages }"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo == totalPages"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <!-- <button style="margin-left: 30px">共 {{ totalPages }} 页</button> -->
    <span style="margin-left: 30px">共 {{ totalPages }} 页</span>
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
    //⭐计算出连续的页码的起始数字与结束数字
    seriesNum() {
      //解构出连续页码数，当前页码，总页数
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
        //纠正不正常现象:起始页码小于1
        if (startNum < 1) {
          startNum = 1;
          endNum = continues;
        }
        //纠正不正常现象:末尾页码大于totalPages
        if (endNum > totalPages) {
          startNum = totalPages - continues + 1;
          endNum = totalPages;
        }
      }
      return { startNum, endNum };
    },
  },
};
</script>

<style lang="less" scoped>
span {
  line-height: 28px;
  font-size: 14px;
}
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
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
