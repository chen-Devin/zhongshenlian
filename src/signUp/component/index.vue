<template>
  <main>
    <section class="section">
      <form>
        <div class="form-group">
          <img :src="userHead"
               alt="头像"
               class="img-responsive img-rounded center-block">
        </div>
        <div class="form-group"
             :class="{focus: tel.foc, error: tel.err}">
          <div class="input-group input-group-lg">
            <div class="input-group-addon"><span class="fa fa-phone"></span></div>
            <input type="tel"
                   class="form-control"
                   id="telephone"
                   placeholder="请输入手机号"
                   maxlength="11"
                   @focus="inputFocus('telephone')"
                   @blur="inputBlur('telephone')"
                   @input="judgeTel()"
                   v-model="tel.val">
            <span class="input-group-btn">
                <button class="btn text-primary" type="button" :disabled="getBtn.dis" @click="getBtnTog()">{{getBtn.cont}}</button>
              </span>
          </div>
        </div>
        <div class="form-group"
             :class="{focus: ver.foc, error: ver.err}">
          <div class="input-group input-group-lg">
            <div class="input-group-addon"><span class="fa fa-shield"></span></div>
            <input type="text"
                   class="form-control"
                   id="verCode"
                   placeholder="请输入验证码"
                   maxlength="6"
                   @focus="inputFocus('verCode')"
                   @blur="inputBlur('verCode')"
                   @input="judgeVer()"
                   v-model="ver.val">
          </div>
        </div>
        <div class="alert alert-danger well-sm"
             v-show="alert.show">
          {{alert.cont}}
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block btn-lg"
                  type="button"
                  :disabled="subBtn.dis"
                  @click="subBtnTog()">{{subBtn.cont}}</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'index',
  data() {
    return {
      tel: {
        foc: false,
        err: false,
        val: ''
      },
      ver: {
        foc: false,
        err: false,
        val: ''
      },
      getBtn: {
        dis: true,
        cont: '获取验证码',
        setInter: false
      },
      subBtn: {
        dis: true,
        cont: '确定'
      },
      alert: {
        show: false,
        cont: ''
      },
      user: {
        id: '',
        telephone: '',
        name: '',
        jobNumber: '',
        department: '',
        duties: '',
        authority: [],
        gender: '',
        wechatName: '',
        wechatHeadImg: ''
        }
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    userHead() {
      return this.user.wechatHeadImg || require('../../img/head.jpg');
    }
  },
  methods: {
    getInfo() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              platform: 'web',
              command: 'getUserInfo'
            };
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.user.id = rep.data.data.id;
          this.user.telephone = rep.data.data.telephone;
          this.user.name = rep.data.data.name;
          this.user.jobNumber = rep.data.data.jobNumber;
          this.user.department = rep.data.data.department;
          this.user.duties = rep.data.data.duties;
          this.user.authority = rep.data.data.authority;
          this.user.gender = rep.data.data.gender;
          this.user.wechatName = rep.data.data.wechatName;
          this.user.wechatHeadImg = rep.data.data.wechatHeadImg;
        }
      }, (rep) => {

      });
    },
    inputFocus(input) {
      if (input === 'telephone') {
        this.tel.foc = true;
      } else if (input === 'verCode') {
        this.ver.foc = true;
      }
    },
    inputBlur(input) {
      if (input === 'telephone') {
        this.tel.foc = false;
      } else if (input === 'verCode') {
        this.ver.foc = false;
      }
    },
    judgeTel() {
      var reg = /^(1+\d{10})$/;
      if (reg.test(this.tel.val)) {
        this.tel.err = false;
        this.alert.cont = '';
        this.alert.show = false;

        if (!(this.tel.err || this.getBtn.setInter)) {
          this.getBtn.dis = false;
          this.getBtn.cont = '获取验证码';
        }
      } else {
        this.tel.err = true;
        this.alert.cont = '手机号输入有误';
        this.alert.show = true;

        if (!this.getBtn.setInter) {
          this.getBtn.dis = true;
          this.getBtn.cont = '获取验证码';
        }
      }
    },
    judgeVer() {
      var reg = /^(\d{1,8})$/;
      if (reg.test(this.ver.val)) {
        this.ver.err = false;
        this.alert.cont = '';
        this.alert.show = false;

        if (!(this.ver.err || this.tel.err)) {
          this.subBtn.dis = false;
          this.subBtn.cont = '确定';
        }
      } else {
        this.ver.err = true;
        this.alert.cont = '验证码输入有误';
        this.alert.show = true;

        this.subBtn.dis = true;
        this.subBtn.cont = '确定';
      }
    },
    getBtnTog() {
      this.getBtn.dis = true;
      this.getBtn.cont = '获取中...';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              platform: 'web',
              command: 'getPhoneCode',
              telephone: this.tel.val
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.getBtnInter();
        }
      }, (rep) => {});
    },
    getBtnInter() {
      var count = 60;
      this.getBtn.dis = true;
      this.getBtn.setInter = true;
      this.getBtn.cont = `${count}s后获取`;
      let inter = setInterval(()=>{
        if(count === 1) {
          clearInterval(inter);
          this.getBtn.dis = false;
          this.getBtn.setInter = false;
          this.getBtn.cont = `再次获取`;
        } else {
          count--;
          this.getBtn.cont = `${count}s后获取`;
        }
      }, 1000);
    },
    subBtnTog() {
      this.subBtn.dis = true;
      this.subBtn.cont = '提交中...';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'login',
              platform: 'web',
              phone: this.tel.val,
              phoneCode: this.ver.val,
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '注册成功';
          window.location.href = 'index.html';
        } else {
          this.alert.show = true;
          this.alert.cont = rep.data.msg;
          this.subBtn.dis = false;
          this.subBtn.cont = '确定';
        }
      }, (rep) => {});
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.section {
  order: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.9);
  form {
    margin: 0 70px;
    .form-group {
      border: 1px solid transparent;
      border-radius: $border-radius-large;
      &.focus {
        border: 1px solid $brand-primary;
      }
      &.error {
        border: 1px solid $brand-danger;
      }
    }
    img {
      width: 150px;
      height: 150px;
      margin-bottom: 50px;
    }
    input.form-control {
      border: none;
      box-shadow: none;
      &:focus {
        border: none;
        box-shadow: none;
      }
    }
    .input-group-addon,
    .input-group-btn > button {
      border: none;
      box-shadow: none;
      background-color: rgba(255,255,255,1);
      &:hover,
      &:focus {
        border: none;
        box-shadow: none;
        outline: none;
      }
    }
    .input-group-btn > button {
      &:hover,
      &:focus {
        color: $link-hover-color;
      }
      &:disabled {
        color: #777;
      }
    }
  }
}
</style>
