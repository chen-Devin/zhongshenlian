<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <div class="getDetail" v-bind="editRule">
          <input class="inputTitle"  type="text" v-model="editRule.title"/>
          <textarea name="textarea" onpropertychange="this.style.height = this.scrollHeight + 'px';"
          oninput="this.style.height = this.scrollHeight + 'px';" class="inputContent" v-model="editRule.content"></textarea>
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
        name: 'ruleRegulationEdit',
         data() {
            return {
              paths: [
                { name: '制度详情', url: `/rule-regulation-detail/${this.$route.params.id}`, present: false },
                { name: '修改制度', url: `/rule-regulation-edit/${this.$route.params.id}`, present: true }
              ],
              editRule: {
                id: this.$route.params.id,
                title: "",
                content: ""
              }
            }
          },
          created(){
            this.getEditDetail();
          },
          methods: {
            getEditDetail() {
                axios({
                    method: 'get',
                    url: '/service',
                    params: {
                        data: (() => {
                            var obj = {
                                command: 'getRegulationsInfo',
                                platform: 'web',
                                regulationsId: this.editRule.id
                            }
                            return JSON.stringify(obj);
                        })()
                    },
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                            this.editRule.title = rep.data.data.title,
                            this.editRule.content = rep.data.data.content,
                            this.editRule.releaseDepartment = rep.data.data.releaseDepartment,
                            this.editRule.releaseTime = rep.data.data.releaseTime
                            // this.editRule.numbering = rep.data.data.numbering
                    }
                }, (rep) => {})
            },
            saveEdit(){
              axios({
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                method: 'post',
                url: '/service',
                data: qs.stringify({
                  data: (() => {
                    var obj = {
                      command: 'addOrEditRegulations',
                      platform: 'web',
                      regulationsId: this.$route.params.id,
                      title: this.editRule.title,
                      content: this.editRule.content
                    };
                    return JSON.stringify(obj);
                  })()
                })
              }).then((rep)=>{
                  if (rep.data.statusCode === '10001') {
                     alert(123)
                      //this.$router.push('/rule-regulation-detail/'+this.editRule.id)
                  }
              }, (rep)=>{});
            },
            canceled(){
              this.$router.push('/rule-regulation-detail/'+this.editRule.id)
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
                min-height: 50px;
                resize: none;
                font-size: 16px;
            }
            .inputTitle {
                width: 50%;
                font-size: 18px;
                font-weight: bold;
            }
            .inputTitle,
            .inputContent {
                padding: 10px;
                display: block;
                margin: 20px;
                border: 1px solid #ccc;
                outline: none;
            }
            .isSaveBtn {
                margin-top: 40px;
                margin-left: 20px;
                margin-bottom: 20px;
               // width: 70%;
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
