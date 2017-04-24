<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card class="detailCard">
      <div class="getDetail" v-bind="ruleAdd">
          <input class="inputTitle" type="text" ref="input" v-model="ruleAdd.title"/>
          <textarea name="textarea" onpropertychange="this.style.height = this.scrollHeight + 'px';"
          oninput="this.style.height = this.scrollHeight + 'px';" class="inputContent" v-model="ruleAdd.content"></textarea>
          <div class="isSaveBtn text-right">
            <button type="button" class="btn btn-primary" @click="saveEdit()">保存</button>
            <button type="button" class="btn btn-defalt" @click="canceled()">取消</button>
          </div>
      </div>
   </card>
</div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import router from '../index.js';

    import crumbs from '../../component/crumbs.vue';
    import card from '../../component/card.vue';
    export default {
        name: 'ruleRegulationAdd',
        data() {
            return {
              paths: [
                { name: '规章制度', url: '/rule-regulation', present: false },
                { name: '录入制度', url: `/rule-regulation-add`, present: true }
              ],
              ruleAdd: {
                  id: "",
                  title: "",
                  content: ""
              }
            }
        },
        methods: {
            saveEdit() {
              if(this.ruleAdd.title!==""&&this.ruleAdd.content!==""){
                axios({
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                method: 'post',
                url: '/service',
                data: qs.stringify({
                  data: (() => {
                    var obj = {
                      command: 'addOrEditRegulations',
                      platform: 'web',
                      title: this.ruleAdd.title,
                      content: this.ruleAdd.content
                    };
                    return JSON.stringify(obj);
                  })()
                })
              }).then((rep)=>{
                  if (rep.data.statusCode === '10001') {
                    this.ruleAdd.id = rep.data.data.id;
                    this.$router.push('/rule-regulation');
                  }
              }, (rep)=>{});
            }
            },
            canceled() {
                this.$router.push('/rule-regulation');
            }
        },
        components: {
            crumbs,
            card
        }
    }
</script>

<style lang="sass" scoped>
    .main {
        .getDetail {
            margin-top: 10px;
            .inputContent {
                width: 95%;
                overflow-y: hidden;
                min-height: 200px;
                resize: none;
            }
            .inputTitle {
                width: 50%;
                padding: 10px;
            }
            .inputTitle,
            .inputContent {
                font-size: 16px;
                display: block;
                margin: 20px;
                border: 1px solid #ccc;
                outline: none
            }
            .isSaveBtn {
                margin-top: 50px;
                margin-left: 20px;
                margin-bottom: 20px;
                //width: 70%;
                button {
                    margin-right: 20px;
                    width: 75px;
                    height: 40px;
                    font-size: 16px;
                }
            }
        }
    }
</style>
