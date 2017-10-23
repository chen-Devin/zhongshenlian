<template>
  <modal>
    <div slot="body">
      <p class="d-f">
        <span>报告编号：</span>
        <el-input v-model="number" placeholder="请输入报告编号"></el-input>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn" @click="editProjectReport" :disabled="btnDis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn cancel-btn" @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from './modal.vue';

export default {
  name: 'reportNumberModal',
  data() {
    return {
      number: '',
      subBtn: {
        cont: '提交'
      }
    };
  },
  computed: {
    btnDis () {
      if (this.number) {
        return false
      } else {
        return true
      }
    }
  },
  props: ['id'],
  methods: {
    editProjectReport () {
      this.subBtn.cont = '提交中...'
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'editProjectReport',
              platform: 'web',
              id: this.id,
              number: this.number
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep)=>{
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已提交';
          this.$emit('submit', this.number);
          this.$message.success('已提交')
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        } else {
          this.$message.error(rep.data.msg)
        }
      }, (rep)=>{});
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
p {
  height: 36px;
  line-height: 36px;
  span {
    width: 100px;
  }
}
</style>