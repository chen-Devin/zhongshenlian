<template>
  <modal>
    <form class="form-horizontal clearfix"
          slot="body">
      <div class="form-group">
        <label class="col-sm-3 control-label">报告类型</label>
        <div class="col-sm-9">
          <template v-for="(TYPE, index) in type">
            <h5>{{TYPE.name}}</h5>
            <label class="checkbox-inline"
                   v-for="(WORD, index) in TYPE.words"
                   :key="index">
              <input type="checkbox"
                     v-model="WORD.state"
                     @change="reportTypeChan(TYPE, WORD)"> {{WORD.name}}
            </label>
            <hr>
          </template>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-3 control-label">编号样式</label>
        <div class="col-sm-9">
          <p class="form-control-static">
            {{number}}
          </p>
        </div>
      </div>
    </form>
    <div slot="footer">
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
      type: this.initBusiness.report.type,
      subBtn: {
        dis: false,
        cont: '确定'
      },
      number: ''
    };
  },
  props: ['initBusiness'],
  created() {
    this.reportTypeChan();
  },
  methods: {
    reportTypeChan(TYPE, WORD) {
      let flag = false;
      let type = '';
      let word = '';
      let t = new Date();
      let year = t.getFullYear();
      outermost2:
      for (let i = 0; i < this.type.length; i++) {
        for (let j = 0; j < this.type[i].words.length; j++) {
          if (this.type[i].words[j].state) {
            flag = true;
            type = this.type[i].code;
            word = this.type[i].words[j].code;
            break outermost2;
          }
        }
      }

      if (flag) {
        this.number = `${type}-${word}-${year}-XXXX`;
      } else {
        this.number = '';
      }
    },
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
              id: this.initBusiness.id,
              reportType: (() => {
                let out = [];
                for (let i = 0; i < this.type.length; i++) {
                  let flag = false;
                  let typeArray = [];
                  for (let j = 0; j < this.type[i].words.length; j++) {
                    if (this.type[i].words[j].state) {
                      flag = true;
                      typeArray.push({
                        name: this.type[i].words[j].name
                      });
                    }
                  }
                  if (flag) {
                    out.push({
                      department: this.type[i].name,
                      typeArray
                    });
                  }
                }
                return out;
              })()
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
      }, (rep) => { });
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>

</style>
