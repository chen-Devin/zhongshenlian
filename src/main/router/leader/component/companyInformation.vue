<template>
  <div class="company-detail-wrapper">
    <card>
      <div class="company-detail-box">
        <h1 class="title">天津市科学技术委员会科技有限公司</h1>
        <h5 class="main-title">公司信息</h5>
        <div class="company-detail">
          <el-row>
            <el-col :span="9" :offset="2">
              <p>公司编号：G001</p>
              <p>公司名称：天津市科学技术委员会科技有限公司</p>
              <p>社会统一信用代码：44030019612391L</p>
              <p>公司法人：G001</p>
              <p>公司负责人：G001</p>
            </el-col>
            <el-col :span="9" :offset="4">
              <p>参审人员标签：参审注师</p>
              <p>经营范围：会计、审计服务等</p>
              <p>开户银行：招商银行</p>
              <p>开户银行账号：11014714864000</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <div class="post-type">
                <div class="title">
                  分管公司出具报告类型：
                </div>
                <div class="selections">
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="3" v-model="filterState" id="1">
                  <label for="1">
                    已中标
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="2" v-model="filterState" id="2">
                  <label for="2">
                    已入围
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="1" v-model="filterState" id="3">
                  <label for="3">
                    已摘牌
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
                  <label for="4">
                    未摘牌
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="3" v-model="filterState" id="1">
                  <label for="1">
                    已中标
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="2" v-model="filterState" id="2">
                  <label for="2">
                    已入围
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="1" v-model="filterState" id="3">
                  <label for="3">
                    已摘牌
                  </label>
                  <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
                  <label for="4">
                    未摘牌
                  </label>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <button type="button" class="btn my-btn submit-btn f-r">编辑</button>
    </card>
    <card></card>
  </div>
</template>

<script>
import card from '../../../component/card.vue';

export default {
  name: 'companyInformation',
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    
  },
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';

.company-detail-wrapper {
  .company-detail-box {
    > .title {
      font-size: 15px;
      margin: 0;
      text-align: center;
    }
    .company-detail {
      width: 100%;
      background-color: #fafafa;
      padding: 10px 30px;
    }
    .post-type {
      display: flex;
      .title {
        width: 220px;
      }
    }
    + button {
      margin-top: 10px;
    }
  }
}
</style>