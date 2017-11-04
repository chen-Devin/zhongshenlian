<template>
  <modal modalWidth="500px">
    <div class="inputs" slot="body">
      <p>
        <span>部门编号：</span>
        <input class="form-control" type="text" v-model="companyDepartment.number">
      </p>
      <p>
        <span>部门名称：</span>
        <input class="form-control" type="text" v-model="companyDepartment.name">
      </p>
      <p>
        <span>项目权限：</span>
        <el-select v-model="companyDepartment.authorityType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn" @click="submit">保存</button>
      <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
    </div>
  </modal>
</template>

<script>
import modal from '@/main/component/modal.vue';

export default {
  name: 'addCompanyDepartment',
  data() {
    return {
      options: [{
        value: '同部门之间项目可见',
        label: '同部门之间项目可见'
      }, {
        value: '同部门之间项目不可见',
        label: '同部门之间项目不可见'
      }],
      companyDepartment: {
        id: '',
        name: '',
        number: '',
        principalId: '',
        principalName: '',
        principalTelephone: '',
        authorityType: '',
        editing: false
      }
    };
  },
  computed: {
    companyId () {
      return this.$route.params.id
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.companyDepartment)
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  created() {

  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.inputs {
  p {
    display: flex;
    height: 34px;
    line-height: 34px;
    span {
      width: 100px;
    }
    input, .el-select {
      flex: 1;
    }
  }
}
</style>
