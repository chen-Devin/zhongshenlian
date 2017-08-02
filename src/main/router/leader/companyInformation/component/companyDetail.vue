<template>
<div>
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
  <div class="company-detail-box">
    <h1 class="title">分公司信息录入</h1>
    <h5 class="main-title">公司信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p class="input-wrapper">
            公司编号：
            <input type="text" class="form-control" v-model="company" placeholder="请输入公司编号">
          </p>
          <p class="input-wrapper">
            公司名称：
            <input type="text" class="form-control" v-model="company" placeholder="请输入公司名称">
          </p>
          <p class="input-wrapper">
            社会统一信用代码：
            <input type="text" class="form-control" v-model="company" placeholder="请输入信用代码">
          </p>
          <p class="input-wrapper">
            公司法人：
            <input type="text" class="form-control" v-model="company" placeholder="请输入公司法人">
          </p>
          <p class="input-wrapper">
            公司负责人：
            <input type="text" class="form-control" v-model="company" placeholder="请输入公司负责人">
          </p>
        </el-col>
        <el-col :span="9" :offset="4">
          <p class="input-wrapper">
            参审人员标签：
            <input type="text" class="form-control" v-model="company" placeholder="请输入参审人员标签">
          </p>
          <p class="input-wrapper">
            经营范围：
            <input type="text" class="form-control" v-model="company" placeholder="请输入经营范围">
          </p>
          <p class="input-wrapper">
            开户银行：
            <el-select v-model="value" placeholder="请选择开户银行">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="input-wrapper">
            开户银行账号：
            <input type="text" class="form-control" v-model="company" placeholder="请输入开户账号">
          </p>
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
              <a href="javascript:void(0);" @click="showType">添加/删除报告类型</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <modal class="type-modal" modalWidth="550px" v-if="true">
    <div slot="body">
      <span class="f-r" @click="closeType">x</span>
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="3" v-model="filterState" id="1">
        <label for="1">
          审字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="2" v-model="filterState" id="2">
        <label for="2">
          专字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="1" v-model="filterState" id="3">
        <label for="3">
          资字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
        <label for="4">
          基决审字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="3" v-model="filterState" id="1">
        <label for="1">
          外汇检字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="2" v-model="filterState" id="2">
        <label for="2">
          验字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="1" v-model="filterState" id="3">
        <label for="3">
          外审字
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
        <label for="4">
          无报告
        </label>
        <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
        <label for="4">
          <input class="form-control type-input" type="text">
        </label>
      </section>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn">删除</button>
      <button class="btn my-btn draft-btn" @click="addType">添加</button>
      <button class="btn my-btn submit-btn">保存</button>
    </div>
  </modal>
</div>
</template>

<script>
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }],
              value: '',
      typeShow: false
    };
  },
  computed: {
    
  },
  methods: {
    showType () {
      this.typeShow = true;
    },
    closeType () {
      this.typeShow = false;
    },
    addType () {

    }
  },
  created() {
    
  },
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

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
    .input-wrapper {
      display: flex;
      height: 34px;
      line-height: 34px;
      .form-control {
        display: inline-block;
        flex: 1;
      }
      .el-select {
        flex: 1;
      }
    }
  }
  .post-type {
    display: flex;
    .title {
      width: 235px;
    }
  }
  + button {
    margin-top: 10px;
  }
}
.type-modal {
  h5 {
    margin: 0;
    margin-bottom: 20px;
  }
  section {
    box-sizing: border-box;
    width: 100%;
    padding: 50px 20px;
    background-color: #fafafa;
    .type-input {
      height: 20px;
      width: 100px;
      padding: 0;
    } 
  }
}
</style>