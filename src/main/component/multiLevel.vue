<template>
  <div class="multi-level">
    <card>
      <h1 class="title">部门筛选</h1>
      <div class="list-wrap">
        <tree></tree>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import tree from '@/main/component/tree.vue';

export default {
  name: 'companyList',
  data() {
    return {
      companyList: [{
        name: '',
        id: '',
        isActive: ''
      }],
      reload: true
    };
  },
  computed: {

  },
  methods: {
    getCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyList = rep.data.data.companyList
            this.companyList.push({
              name: '新建公司',
              id: 'add'
            }, {
              name: '删除公司',
              id: 'del'
            })
            this.companyList.forEach((item, index) => {
              if (index === 0) {
                item.isActive = true
              } else {
                item.isActive = false
              }
            });
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getCompanyLink (company) {
      this.companyList.forEach((item, index) => {
        if (company.id === item.id) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      })
      this.reload = false;
      this.reload= true;
      this.jumpId = company.id
      this.$emit('noticeJump', this.jumpId)
    }
  },
  created() {
    this.getCompanyList().then(() => {
      this.jumpId = this.companyList[0].id
      this.$emit('noticeJump', this.jumpId)
    }, () => { });
  },
  components: {
    card,
    tree
  }
};
</script>

<style lang="sass" scoped>
  .multi-level {
    width: 400px;
    .title {
      margin: 0;
      font-size: 16px;
    }
    .list-wrap {
      width: 100%;
      padding-top: 10px;
      background-color: #f9fbfe;
    }
  }
</style>