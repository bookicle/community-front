<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '标题',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '30%',
  },
  top: {
    type: String,
    default: '50px',
  },
  buttons: {
    type: Array,
  },
  showCancel:{
    type:Boolean,
    default:true
  }
})

const emit = defineEmits();
const close = () => {
  // noinspection JSValidateTypes
  emit('close');
}
</script>

<template>
  <div>
    <el-dialog
        :close-on-click-modal="false"
        :draggable="true"
        :show-close=showClose
        :title=title
        :top=top
        :width=width
        class="cust-dialog"
        :model-value=show
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template v-if="(buttons && buttons.length>0) || showCancel">
        <div class="dialog-footer">
          <el-button link @click="close" vi-if="showCancel">取消</el-button>
          <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">
            {{btn.text}}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<style lang="scss">
.cust-dialog{
  margin-bottom: 10px;
  .el-dialog__body{
    padding: 0;
  }
  .dialog-body{
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding: 15px;
    min-height: 100px;
    max-height: calc(100vh - 200px);
  }
  .dialog-footer{
    text-align: right;
    padding: 10px 20px;
  }
}
</style>
