<template>
  <div class="col-sm-12">
    <h4 class="strong">
      <slot>error</slot>
    </h4>
    <ul class="list-group approver-list">
      <li class="list-group-item" v-for="(ADVICE, index) in advices" v-bind:key="index">
        <span>{{ADVICE.approverName}}</span>
        <span class="label label-success" v-if="ADVICE.approverResult==='1'">已通过</span>
        <span class="label label-danger" v-else-if="ADVICE.approverResult==='2'"  v-on:click="open(ADVICE.approverOpinion)">未通过</span>
        <span class="label label-info" v-else>未审核</span>
      </li>
    </ul>
    <modal v-if="showModal">
      <div slot="body">
        <p>{{reason}}</p>
      </div>
      <div slot="footer">
        <button class="btn btn-primary modal-default-button"
              v-on:click="close()">
          确定
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'approverAdvice',
  data() {
    return {
      showModal: false,
      reason: ''
    };
  },
  props: ['advices'],
  method: {
    open(REA) {
      this.reason = REA;
      this.showModal = true;
    },
    close() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

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
</style>
