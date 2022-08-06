<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑:带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>

            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>

            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>

            <!-- 售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(propsInfo, index) in searchParams.props"
              :key="index"
            >
              {{ propsInfo.split(":")[1] }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademark="getTrademark" @getProps="getProps" />

        <!--details-->
        <div class="details clearfix">
          <!-- nav:综合+价格 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeSort('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowBottom-fill': isDesc,
                        'icon-arrowTop': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeSort('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-arrowBottom-fill': isDesc,
                        'icon-arrowTop': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 商品item -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 分页器 -->
        <Pagination
          :pageNo="searchParams.pageNo"
          :pageSize="searchParams.pageSize"
          :total="total"
          :continues="5"
          @getPageNo="getPageNo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类id
        category2Id: "",
        //三级分类id
        category3Id: "",
        //分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序:初始状态是"综合:降序"
        order: "1:desc",
        //分页器：代表当前时第几页
        pageNo: 1,
        //每一页展示的数据个数
        pageSize: 5,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    //在发请求之前，把接口需要传递的参数进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log('before', this.searchParams);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取search模块一共多少条数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //封装发请求函数,需要时便调用
    getData() {
      this.$store.dispatch("searchList", this.searchParams);
    },
    //清除分类面包屑
    removeCategoryName() {
      //此时带给服务器的参数是可有可无的，如果字符串属性值为空，还是会带给服务器字段
      //但是把相应字段改成undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      // this.searchParams.category1Id = undefined
      // this.searchParams.category2Id = undefined
      // this.searchParams.category3Id = undefined
      //还需要向服务器发请求（置空后的）
      // this.getData()
      // this.$router.push({ name: 'search' })
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //清除关键字面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined;
      // this.getData()
      // 通知兄弟组件清除keyword
      this.$bus.$emit("clearKeyword");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件:点击品牌后(苹果、小米)发送请求
    getTrademark(trademark) {
      // console.log('我是父组件', trademark)
      //整理参数:trademark的格式为"ID:名字,如"4:小米",见接口文档
      // this.searchParams.trademark = trademark.tmName
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //自定义事件:点击售卖属性后发送请求
    getProps(info, childInfo) {
      // console.log('我是父组件', info, childInfo)
      //整理参数:商品属性格式为["属性ID:属性值:属性名"],见接口文档
      // this.searchParams.props = ['info.attrId:childInfo:info.attrName']
      let props = `${info.attrId}:${childInfo}:${info.attrName}`;
      //⭐要判断
      // this.searchParams.props.push(props)
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    //清除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //清除售卖属性面包屑
    removeProps(index) {
      //⭐不能直接undefined
      // console.log(index);
      // this.searchParams.props = undefined
      // this.getData()
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //⭐排序
    changeSort(flag) {
      let originOrder = this.searchParams.order;
      console.log("旧 " + originOrder);
      // order的第一个
      let originFlag = originOrder.split(":")[0];
      // order的第二个
      let origninSort = originOrder.split(":")[1];
      let newOrder = "";
      // 初始值为"综合:降序"，点击相同的切换asc、desc
      if (originFlag == flag) {
        newOrder = `${flag}:${origninSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击不同的切换1、2
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      console.log("新 " + this.searchParams.order);
      this.getData();
    },
    //自定义事件:获取当前第几页
    getPageNo(i) {
      //整理点击分页器带给服务器的参数
      this.searchParams.pageNo = i;
      this.getData();
    },
  },
  watch: {
    //路由变化便发请求
    $route(newValue, oldValue) {
      //再次发请求之前整理带给服务器参数
      //发请求前完应把相应的1、2、3级分类的id置空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>