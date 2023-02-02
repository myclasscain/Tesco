<template>
  <div>
    <TypeNav :flag="true" />
    <div class="main">
      <div class="py-container">
        <!--bread: 面包屑, 带有 x 的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名称的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryname">
              {{ searchParams.categoryname
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTradmark">×</i>
            </li>
            <!-- 产品售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :attrsList="attrsList"
          :trademarkList="trademarkList"
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangshang': isAsc,
                        'icon-jiantou_xiangxia': isDesc
                      }"
                      v-show="isOne"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangshang': isAsc,
                        'icon-jiantou_xiangxia': isDesc
                      }"
                      v-show="isTwo"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 详情跳转路由 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
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
          <!-- 分页器 模拟数据-->
          <Pagination
            :pageNo="searchParams.pageNo"
            :continues="5"
            :total="searchInfo.total"
            :pageSize="searchParams.pageSize"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        // 一级分类的id
        category1id: '',
        // 二级分类的id
        category2id: '',
        // 三级分类的id
        category3id: '',
        // 分类名称
        categoryname: '',
        // 关键字
        keyword: '',
        // 排序
        order: '1:desc',
        // 分页器用的: 代表的是当前是第几页
        pageNo: 1,
        // 每一页展示多少数据
        pageSize: 5,
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    ...mapGetters('search', ['attrsList', 'trademarkList', 'goodsList']),
    ...mapState('search', ['searchInfo']),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  methods: {
    // 获取搜索商品列表数据
    getData() {
      this.$store.dispatch('search/reqSearchInfo', this.searchParams)
    },
    // 删除分类名称
    removeCategoryName() {
      // 这里的categoryid也要改 放止下次跳转时还保留上次的 categoryid
      this.searchParams.category1id = undefined
      this.searchParams.category2id = undefined
      this.searchParams.category3id = undefined
      this.searchParams.categoryname = undefined
      // 路径也要改

      // 这里的路径发生变化后 watch会监测到 再次发送请求
      // 这里使用if else 没必要  因为 this.$route.params 永远都是true
      this.$router.push({
        name: 'search',
        params: this.$route.params
      })
    },
    // 删除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined
      // 将search中的关键字置空 全局事件总线
      this.$bus.$emit('clearKeyword')

      // 修改路径
      this.$router.push({
        name: 'search',
        query: this.$route.query
      })
    },
    // 删除tradmark
    removeTradmark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 删除attr
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      // 整理品牌字段参数  'ID':'品牌名称'
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次请求获取数据
      this.getData()
    },
    attrInfo(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
      if (this.searchParams.props.indexOf(prop) === -1) {
        this.searchParams.props.push(prop)
        this.getData()
      }
    },
    // 排序的操作
    changeOrder(flag) {
      let originOrder = this.searchParams.order
      let originFlag = originOrder.split(':')[0]
      let originSort = originOrder.split(':')[1]
      console.log(originSort)

      let newOrder = ''
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'asc' ? 'desc' : 'asc'}`
      } else {
        newOrder = `${flag}:desc`
      }

      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件回调-----------获取当前第几页
    getPageNo(page) {
      this.searchParams.pageNo = page
      this.getData()
    }
  },
  watch: {
    $route(newVal, oldVal) {
      // 整合参数之前 应把 category id 置为空 确保每次发送请求时 只有一个category id
      this.searchParams.category1id = undefined
      this.searchParams.category2id = undefined
      this.searchParams.category3id = undefined
      // 整合参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      this.getData()
    }
  },
  // 整合参数
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  // 发送请求
  mounted() {
    this.getData()
  }
}
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
