<template>
  <card class="customer-info-edit">
    <p class="btns f-r">
      <button class="btn my-btn submit-btn">保存</button>
      <button class="btn my-btn cancel-btn">取消</button>
    </p>
    <h4 class="main-title">客户信息录入</h4>
    <div class="edit-form">
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户名称：</span>
            <span>天津市科学技术委员会科级</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">公司联系人:</span>
            <input class="form-control" type="text" placeholder="请输入公司联系人">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户ID：</span>
            <span>C0000001</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人电话：</span>
            <input class="form-control" type="text" placeholder="请输入联系人电话">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">信用代码：</span>
            <span>1234567890000</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人职务：</span>
            <input class="form-control" type="text" placeholder="请输入联系人职务">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">经营范围：</span>
            <span>会计、审计服务</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人部门：</span>
            <input class="form-control" type="text" placeholder="请输入联系人部门">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司法人：</span>
            <span>王铁松</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册地址：</span>
            <span>广东省深圳市南山区科兴科学园A3栋110室</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">成立日期：</span>
            <span>2017/09/30</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">创建人：</span>
            <input class="form-control" type="text" placeholder="请输入创建人">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">所属行业：</span>
            <span>金融业</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">创建时间：</span>
            <input class="form-control" type="text" placeholder="请输入创建时间">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户性质：</span>
            <span>私企</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">资产规模：</span>
            <span>100（万元）</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">注册资本：</span>
            <span>1000（万元）</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">可见状态：</span>
            <el-select v-model="value" placeholder="请选择可见状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
        </el-col>
      </el-row>
    </div>
  </card>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';

export default {
  name: 'customerModModal',
  data() {
    return {
      paths: [
        { name: '客户信息', url: '/customer-infor-list', present: false },
        { name: '客户信息录入', url: '/customer-infor-list/add', present: true }
      ],
      disSubmit: true,
      loading: true,
      success: false,
      fail: false,
      options: [{
          value: '同部门之间可见',
          label: '同部门之间可见'
        }, {
          value: '同部门之间不可见',
          label: '同部门之间不可见'
        }]
    }
  },
  methods: {
    
  },
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-edit {
    .edit-form {
      p {
        display: flex;
        line-height: 34px;
        padding: 6px 50px;
        > .title {
          width: 110px;
        }
      }
    }
  }
</style>