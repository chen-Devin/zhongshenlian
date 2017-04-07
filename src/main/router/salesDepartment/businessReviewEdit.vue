<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务详情
        <div class="pull-right">
          <template v-if="!editable">
            <button class="btn btn-primary">编辑</button>
          </template>
          <template v-if="editable">
            <button class="btn btn-success">提交</button>
            <button class="btn btn-danger">撤销</button>
          </template>
        </div>
      </h3>
      <business-editor v-bind:initBusiness="business"
                       v-bind:editable="editable"
                       v-on:saved="saved"
                       v-on:submited="submited"></business-editor>
      <hr>

    </card>
    <business-del-modal v-if="showDelModal"
                        v-bind:initalBusiness="business"
                        v-on:deleted="deleted"
                        v-on:canceled="delCanceled"></business-del-modal>
  </div>
</template>

<script>
export default {
  name: 'businessReviewEditSales',
}
</script>

<style lang="sass" scoped>

</style>
