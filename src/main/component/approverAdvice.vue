<template>
  <div class="col-sm-12 approver-advice">
    <ul class="list-group com-list approver-list">
      <li class="list-group-item list-head">
        <span class="title">
          <slot></slot>
        </span>
        <span class="date pull-right">创建时间</span>
      </li>
      <li class="list-group-item" v-for="(ADVICE, index) in advices" :key="index">
        <span>{{index+1+'.'}}</span>
        <!-- <span class="people">{{ADVICE.approverName}}</span> -->
        <span class="pull-right">
          <a v-if="ADVICE.approveResult==='不通过'" @click="open(ADVICE.approveOpinion)">查看原因</a>
          <span class="label label-success" v-if="ADVICE.approveResult==='通过'">已通过</span>
          <span class="label label-danger" v-else-if="ADVICE.approveResult==='不通过'"  @click="open(ADVICE.approveOpinion)">未通过</span>
          <span class="label label-info" v-else>未审核</span>
          <span class="time">{{ADVICE.createAt.substring(0,10)}}</span>
        </span>
      </li>
    </ul>
    <modal v-if="showModal">
      <div slot="body">
        <p>{{reason}}</p>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn modal-default-button"
                @click="close()">
          确定
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from './modal.vue';

export default {
  name: 'approverAdvice',
  data() {
    return {
      showModal: false,
      reason: ''
    };
  },
  props: ['advices'],
  methods: {
    open(REA) {
      this.reason = REA;
      this.showModal = true;
    },
    close() {
      this.showModal = false;
    }
  },
  components: {
    modal
  },
  created() {

  }
};
</script>

<style lang="sass" scoped>
.approver-advice {
  .approver-list {
    .list-head {
      margin-left: 0;
      margin-right: 0;
      padding-left: 12px;
      padding-right: 12px;
    }
    > li.list-group-item {
      border-left: 1px solid #DDDDDD;
      border-right: 1px solid #DDDDDD;
      .people,
      .label,
      .time {
        margin-left: 5px;
      }
      a {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
