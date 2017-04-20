<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <button class="btn btn-primary pull-right" :user="user" type="button" v-if="this.user.department == '所长'" @click="editRule()">编辑</button>
    <card>
      <div class="getDetail" v-bind="detail">
          <input class="inputTitle" type="text" v-model="detail.title" readonly/>
          <!--<textarea name="textarea" onpropertychange="this.style.height = this.scrollHeight + 'px';"
           v-model="detail.content" class="inputContent" readonly v-if="edited"></textarea>
           <p class="inputContent">{{detail.content}}</p>-->
          <div class="contentArea" contenteditable="false"><pre>{{detail.content}}</pre></div>
          <div class="releasePart text-right">
             <p>{{detail.releaseDepartment}}</p>
            <p>{{detail.releaseTime}}</p>
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
        name: 'ruleRegulationDetail',
        data() {
            return {
               paths: [
                { name: '规章制度', url: '/rule-regulation', present: false },
                { name: '制度详情', url: `/rule-regulation-detail/${this.$route.params.id}`, present: true }
              ],
              detail: {
                  id: this.$route.params.id,
                  title: "",
                  content: "",
                  releaseDepartment: "",
                  releaseTime: ""
                      //numbering: ""
              }
            }
        },
        props: ['user'],
        created() {
            this.getRuleDetail();
        },
        methods: {
            getRuleDetail() {
                axios({
                    method: 'get',
                    url: '/service',
                    params: {
                        data: (() => {
                            var obj = {
                                command: 'getRegulationsInfo',
                                platform: 'web',
                                regulationsId: this.$route.params.id
                            }
                            return JSON.stringify(obj);
                        })()
                    },
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                        this.detail.title = rep.data.data.title,
                            this.detail.content = rep.data.data.content,
                            this.detail.releaseDepartment = rep.data.data.releaseDepartment,
                            this.detail.releaseTime = rep.data.data.releaseTime
                            // this.detail.numbering = rep.data.data.numbering
                    }
                }, (rep) => {})
            },
            editRule() {
                this.$router.push("/rule-regulation-edit/"+this.detail.id);
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
        pre{
           white-space: pre-wrap;
           white-space: -moz-pre-wrap;
           white-space: -pre-wrap;
           white-space: -o-pre-wrap;
           word-wrap: break-word;
           background: none;
           border: none;
           font-size: 14px;
        }
        button {
            width: 75px;
            height: 40px;
            font-size: 16px;
            margin-top: -50px;
            margin-right: 20px;
        }
        .getDetail {
            margin-top: 10px;
            .contentArea{
                width: 95%;
                min-height: 10px;
                max-height: 800px;
                _height: 10px;
                margin-left: auto;
                margin-right: auto;
                padding: 10px;
                outline: 0;
                border: 1px solid #fff;
                word-wrap: break-word;
                overflow-x: hidden;
                overflow-y: auto;
                font-size: 14px;
                //-webkit-user-modify: read-write-plaintext-only;
            }
            .inputContent {
                height: 100%;
                width: 95%;
               // overflow-y: hidden;
               // min-height: 400px;
                resize: none;
                font-size: 16px;
                overflow-y:visible;
            }
            .inputTitle {
                width: 50%;
                font-size: 18px;
                font-weight: bold;
            }
            .inputTitle,
            .inputContent {
                display: block;
                padding: 10px;
                margin: 20px;
                border: 1px solid #fff;
                outline: none;
            }
            .releasePart {
                font-size: 16px;
                margin: 20px;
                p {
                    margin-top: 10px;
                }
            }
        }
    }
</style>
