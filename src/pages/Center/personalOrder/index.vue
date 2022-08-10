<template>
  <!-- 右侧内容 -->
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="(order, index) in personalorder.records"
          :key="order.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <!-- v-for="(goods, index) in order.orderDetailList" :key="goods.id" -->
          <tbody>
            <tr v-for="(goods, index) in order.orderDetailList" :key="goods.id">
              <td width="60%">
                <div class="typographic">
                  <img style="wight: 82px; height: 82px" :src="goods.imgUrl" />
                  <a href="#" class="block-text">{{ goods.skuName }}</a>
                  <span>x{{ goods.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-if="index == 0"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-if="index == 0"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ goods.splitTotalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-if="index == 0"
              >
                <a href="#" class="btn">{{ order.orderStatusName }} </a>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-if="index == 0"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- <div class="pagination">
          <ul>
            <li class="prev disabled">
              <a href="javascript:">«上一页</a>
            </li>
            <li class="page actived">
              <a href="javascript:">1</a>
            </li>
            <li class="page">
              <a href="javascript:">2</a>
            </li>
            <li class="page">
              <a href="javascript:">3</a>
            </li>
            <li class="page">
              <a href="javascript:">4</a>
            </li>

            <li class="next disabled">
              <a href="javascript:">下一页»</a>
            </li>
          </ul>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
          </div>
        </div> -->
        <!-- 分页器 -->
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="personalorder.pages"
          :continues="5"
          @getPageNo="getPageNo"
        />
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalOrder",
  data() {
    return {
      // 默认第一页
      page: 1,
      // 每页展示的数据个数
      limit: 3,
      //
      personalorder: {},
    };
  },
  mounted() {
    this.getPersonalOrder();
  },
  methods: {
    // 获取我的订单
    async getPersonalOrder() {
      let result = await this.$API.reqGetPresonalOrder(this.page, this.limit);
      if (result.code == 200) {
        this.personalorder = result.data;
      }
    },
    // 获取当前点击的哪一页
    getPageNo(p) {
      this.page = p;
      this.getPersonalOrder();
    },
  },
};
</script>

<style>
</style>