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
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @click="changeGoodChecked(cartInfo, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeSkuNum('change', $event.target.value * 1, cartInfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteGoodFromCart(cartInfo)" class="sindelet">删除</a>
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
          :checked="allBtnState"
          @click="toggleAllGoodsState($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ isCheckedGoods }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 按需导入lodash
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  // 向服务器请求数据
  computed: {
    // 捞取仓库中的购物车列表数据
    ...mapGetters('shopcart', ['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 总价
    totalPrice() {
      let total = this.isAllChecked.reduce((preVal, curVal) => {
        return preVal + curVal.skuNum * curVal.skuPrice
      }, 0)

      return total
    },
    // 已选商品数量
    isCheckedGoods() {
      let totalNum = this.isAllChecked.reduce((preval, curval) => {
        return preval + curval.skuNum
      }, 0)

      return totalNum
    },
    // 全选按钮状态
    allBtnState() {
      if (this.cartInfoList.length < 1) {
        return false
      }
      return this.cartInfoList.every(item => item.isChecked === 1)
    },
    // 所有选中商品
    isAllChecked() {
      return this.cartInfoList.filter(item => item.isChecked == 1)
    }
  },
  methods: {
    // 获取服务器列表数据
    getData() {
      this.$store.dispatch('shopcart/getShopCartList')
    },
    // 更改产品数量 节流处理
    changeSkuNum: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case 'add':
          disNum = cartInfo.skuNum < 99 ? 1 : 0
          break
        case 'minus':
          disNum = cartInfo.skuNum > 1 ? -1 : 0
          break
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 1
          } else {
            disNum = parseInt(disNum - cartInfo.skuNum)
          }
          break
      }
      await this.$store.dispatch('detail/addGoodIntoCart', {
        skuId: cartInfo.skuId,
        skuNum: disNum
      })
      this.getData()
    }, 500),
    // 切换选中产品状态
    async changeGoodChecked(cartInfo, newState) {
      let isChecked = newState ? 1 : 0
      try {
        await this.$store.dispatch('shopcart/toggleCheckedById', {
          skuId: cartInfo.skuId,
          isChecked
        })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中商品
    async deleteGoodFromCart(cartInfo) {
      try {
        await this.$store.dispatch('shopcart/deleteGoodById', cartInfo.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch(
          'shopcart/deleteAllGoodsIsChecked',
          this.isAllChecked
        )
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 根据全选按钮状态 切换所有商品状态
    async toggleAllGoodsState(newState) {
      newState = newState ? 1 : 0
      try {
        await this.$store.dispatch('shopcart/toggleAllGoodsState', {
          goodInfoList: this.cartInfoList,
          newState
        })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

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
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
