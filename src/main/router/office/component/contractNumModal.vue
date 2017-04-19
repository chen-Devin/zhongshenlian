<template>
  <modal>
    <form class="clearfix"
          slot="body">
      <div class="form-group" v-for="(PLA, index) in contNumRule" :key="index">
        <label>PLA.name</label>
        <div class="checkbox" v-for="(VAL, index) in PLA.value" :key="index">
          <label>
            <input type="checkbox"
                   :value="VAL"
                   v-model="contType"> VAL.value
          </label>
        </div>
      </div>
    </form>
    <div class="footer">
      <button class="btn btn-primary modal-default-button"
              @click="sub()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button"
              @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from '../../../component/modal.vue';

export default {
  name: 'contractNumModal',
  data() {
    return {
      contNumRule: [
        { name: '会计所', value: [{ name: '会计所', value: '审字' }, { name: '会计所', value: '专字' }, { name: '会计所', value: '咨字' }, { name: '会计所', value: '基决审字' }, { name: '会计所', value: '外汇检字' }, { name: '会计所', value: '验字' }, { name: '会计所', value: '外审字' }] },
        { name: '评估所', value: [{ name: '会计所', value: '评字' }, { name: '会计所', value: '评咨字' }] },
        { name: '税务所', value: [{ name: '会计所', value: '税鉴字' }] },
        { name: '造价所', value: [{ name: '会计所', value: '基结审字' }, { name: '会计所', value: '评审字' }, { name: '会计所', value: '概审字' }, { name: '会计所', value: '咨字' }] }
      ],
      contType: (() => this.contNumRule[0].value[0])(),
      subBtn: {
        dis: false,
        cont: '确定'
      }
    };
  },
  props: ['business'],
  methods: {
    sub() {
      this.subBtn.dis = true;
      this.subBtn.cont = '提交中...';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'releaseContactNumber',
              platform: 'web',
              id: business.id,
              accounting: contType.value,
              evaluation: contType.value,
              costs: contType.value
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          let contNum = rep.data.data.contNum;
          this.subBtn.cont = '已提交';
          this.$emit('submited', contNum);
        }
      }, (rep) => {});
    },
    cancel() {
      this.$emit('canceled');
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
