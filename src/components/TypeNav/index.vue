<template>
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShowsort">
      <h2 class="all" @mouseenter="enterShowsort">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="showsort">
          <!-- 利用事件的委派和编程式导航实现路由的跳转与传递参数,存在一些问题 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3
                @mouseenter="enterIndex(index)"
                :class="{ current: currentIndex == index }"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类
      currentIndex: -1, //! 不能是0-15
      showsort: true,
    };
  },
  mounted() {
    //组件挂载完毕showsort变为false
    if (this.$route.path != "/home") {
      this.showsort = false;
    }
  },
  computed: {
    ...mapState({
      //使用对象写法，右侧需要的是一个函数，右侧函数会立即执行一次
      //注入一个state，为大仓库中的数据
      categoryList: (state) => {
        // console.log(state)
        return state.home.categoryList.slice(0, 16);
      },
    }),
  },
  methods: {
    //鼠标悬浮一级分类修改currentIndex
    // enterIndex(index) {
    //   this.currentIndex = index
    //   console.log('鼠标进入' + index)
    // },
    //throttle回调函数别用箭头函数，可能会出现上下文this
    //这里加的节流有bug，鼠标快速移动蓝色会停留
    enterIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log('鼠标进入' + index)
    }, 50),
    //鼠标悬浮一级分类修改currentIndex
    leaveShowsort() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.showsort = false;
      }
    },
    goSearch(event) {
      //获取出发点击事件的节点
      let element = event.target;
      // console.log(element);
      //获取节点的自定义属性和值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //有categoryname为a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //区分各级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //整理完参数
        // console.log(location, query);
        /*原:只携带query跳转
        //动态给location配置对象添加属性query属性
        location.query = query
        //路由跳转
        this.$router.push(location)
        */
        /*现:跳转时加上param参数*/
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    enterShowsort() {
      this.showsort = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .current {
          background-color: #d4d1d1;
        }
      }
    }

    //过渡动画的样式表
    //进入状态
    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.15s linear;
    }
  }
}
</style>