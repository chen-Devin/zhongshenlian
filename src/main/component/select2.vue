<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
import $ from 'jquery';
import select2 from 'select2';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/i18n/zh-CN.js';

export default {
  name: 'select2',
  props: ['options', 'value'],
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options })
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function () {
        vm.$emit('input', this.value)
      })
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el).val(value).trigger('change');
    },
    options: function (options) {
      // update options
      $(this.$el).select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
};
</script>

<style lang="sass">
.select2-container--default {
  .select2-selection--single {
    border: 1px solid #ccc;
    .select2-selection__rendered {
      line-height: 34px;
    }
    .select2-selection__arrow {
      height: 32px;
    }
  }
}
.select2-container {
  .select2-selection--single {
    height: 34px;
  }
}
</style>

