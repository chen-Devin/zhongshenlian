<template>
  <div class="company-detail-wrapper">
    <card>
      <company-detail></company-detail>
      <button type="button" class="btn my-btn submit-btn f-r">编辑</button>
    </card>
    <card>
      <button type="button" class="btn my-btn submit-btn f-r">新建部门</button>
      <h5 class="main-title">部门信息</h5>
      <table class="table table-bordered table-hover com-list">
        <thead>
          <tr>
            <th>部门名称</th>
            <th>部门编号</th>
            <th>业务权限类型</th>
            <th>部门所属分公司</th>
            <th>所属部门</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>业务1部</td>
            <td>Y001</td>
            <td>同部门之间业务可见</td>
            <td>天津中审联会计事务所</td>
            <td>业务部</td>
            <td>
              <a href="javascript:void(0);">编辑</a>
              <a href="javascript:void(0);">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </card>
  </div>
</template>

<script>
import card from '@/main/component/card.vue';
import companyDetail from './companyDetail.vue';

export default {
  name: 'companyInformation',
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    
  },
  components: {
    card,
    companyDetail
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-detail-wrapper {
  .com-list {
    border: none;
    thead {
      background-color: #E6E6E6;
      th {
        text-align: center;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
        }
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>