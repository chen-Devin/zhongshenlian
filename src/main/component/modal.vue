<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" :style="{alignSelf: alignSelf}">
        <div class="modal-container" :style="{width: modalWidth, padding: setPadding}">
          <div class="modal-body" :style="{padding: setPadding}">
            <slot name="body">
              default body
            </slot>
          </div>
          <hr>
          <div class="modal-footer">
            <slot name="footer">
              default footer
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: ['alignSelf','modalWidth', 'setPadding']
}
</script>

<style lang="sass" scoped>
.modal-mask {
  position: fixed;
  z-index: 12;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 20px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  max-height: 600px;
  overflow: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-footer {
  border-top: none;
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
