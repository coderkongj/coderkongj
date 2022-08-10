<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in cartInfoList"
          :key="item.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="changeChecked(item.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handleCount('minus', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handleCount('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handleCount('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="changeAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelected">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartData();
  },
  computed: {
    ...mapGetters(["ShopCartList"]),
    // 计算购物车数据
    cartInfoList() {
      return this.ShopCartList.cartInfoList || {};
    },
    // 计算购物车商品总价格
    totalPrice() {
      let sum = 0;
      if (this.cartInfoList.length > 0) {
        this.cartInfoList.forEach((element) => {
          sum += element.skuNum * element.skuPrice;
        });
      }
      return sum;
    },
    // 判断底部全选框是否勾选
    isAllChecked() {
      if (this.cartInfoList.length > 0) {
        return this.cartInfoList.every((element) => element.isChecked == 1);
      }
    },
  },
  methods: {
    // 获取个人购物车商品数据
    getShopCartData() {
      this.$store.dispatch("getShopCartList");
    },
    // 修改购物车商品个数（使用节流函数防止用户点击“-”过快出现商品数量为负数）
    handleCount: throttle(async function (type, changeNum, goodsitem) {
      // 修改数量的三种方式
      switch (type) {
        // 点击+
        case "add":
          changeNum = 1;
          break;
        // 点击-
        case "minus":
          changeNum = goodsitem.skuNum > 1 ? -1 : 0;
          break;
        // 输入框输入
        case "change":
          if (isNaN(changeNum) || changeNum < 1) {
            changeNum = 0;
          } else {
            changeNum = parseInt(changeNum) - goodsitem.skuNum;
          }
          break;
      }
      try {
        // 修改成功并再次发请求获取修改后的数据
        await this.$store.dispatch("addToShopcart", {
          skuId: goodsitem.skuId,
          skuNum: changeNum,
        });
        this.getShopCartData();
      } catch (error) {
        alert(error.message);
      }
    }, 800),
    // 删除购物车商品
    async deleteCartItem(goodsid) {
      try {
        await this.$store.dispatch("deleteCartItem", goodsid);
        this.getShopCartData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 切换购物车商品选中状态
    async changeChecked(goodsid, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("changeChecked", {
          skuId: goodsid,
          isChecked,
        });
        this.getShopCartData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的购物车商品
    async deleteSelected() {
      try {
        await this.$store.dispatch("deleteSelected");
        this.getShopCartData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 切换全选状态
    async changeAllChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("changeAllChecked", isChecked);
        this.getShopCartData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>