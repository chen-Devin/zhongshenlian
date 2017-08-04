<template>
  <div class="company-list-wrapper">
    <ul>
      <li
        v-for="(company, index) in companyList"
        :key="index"
        :class="{ active: company.isActive }"
        @click="getCompanyLink(company)"
        v-if="reload">{{ company.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';

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
      this.$router.push(`/company-management/${company.id}`);
    }
  },
  created() {
    this.getCompanyList().then(() => {
      this.$router.push(`/company-management/${this.companyList[0].id}`);
    }, () => { });
  },
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-list-wrapper {
  position: relative;
  width: 150px;
  float: left;
  margin: 0 10px;
  background-color: $origin-color;
  border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
  ul {
    width: 100%;
    font-size: 0;
    margin: 0;
    padding: 0;
    li {
      width: 100%;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      text-align: center;
      list-style: none;
      cursor: pointer;
      &.active {
        background-color: #27b1e5;
        color: #fff;
      }
      &:hover {
        background-color: #27b1e5;
        color: #fff;
      }
    }
  }
}
</style>
