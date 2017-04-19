<template>
  <div class="col-sm-12 approver-advice">
    <h4>
      <slot>error</slot>
    </h4>
    <ul class="list-group approver-list">
      <li class="list-group-item" v-for="(ADVICE, index) in advices" :key="index">
        <span>{{ADVICE.approverName}}</span>
        <span class="label label-success pull-right" v-if="ADVICE.approveResult==='通过'">已通过</span>
        <span class="label label-danger pull-right" v-else-if="ADVICE.approveResult==='不通过'"  @click="open(ADVICE.approveOpinion)">未通过</span>
        <span class="label label-info pull-right" v-else>未审核</span>
      </li>
    </ul>
    <modal v-if="showModal">
      <div slot="body">
        <p>{{reason}}</p>
      </div>
      <div slot="footer">
        <button class="btn btn-primary modal-default-button"
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
  }
};
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';
.approver-advice {
  padding: 0 50px;
  .approver-list {
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
      span.label-danger:hover {
        cursor: pointer;
        background-color: darken($btn-danger-bg, 5%);
      }
    }
    > li.list-group-item:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    > li.list-group-item:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
