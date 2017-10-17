<template>
  <modal>
    <div slot="body">
      
    </div>
    <div slot="footer">
      <!-- <button class="btn my-btn submit-btn modal-default-button"
              @click="sub()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn draft-btn modal-default-button"
              @click="cancel()">
        取消
      </button> -->
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '../../../component/modal.vue';

export default {
  name: 'contractChangeModal',
  data() {
    return {
      
    };
  },
  props: [],
  methods: {
    
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>

</style>