<template>
  <modal>
    <div slot="body">
      确定删除员工{{initalStaff.name}}吗？
    </div>
    <div slot="footer">
      <button class="btn btn-danger modal-default-button" v-on:click="del()" v-bind:disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button" v-on:click="cancel()">
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
  name: 'delModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '删除'
      }
    };
  },
  props: ['initalStaff'],
  methods: {
    del() {
      this.subBtn.dis = true;
      this.subBtn.cont = '删除中...';
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'delUser',
              platform: 'web',
              delUserId: this.initalStaff.id
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep)=>{
        if (rep.data.statusCode = '10001') {
          this.subBtn.cont = '已删除';
          this.$emit('deleted', this.initalStaff);
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

<style>
.staff-sex {
  display: block;
}
</style>
