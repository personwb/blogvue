<template>
    <div style="display: flex; flex-direction: row;align-items: center;height: 44px;">
      <label for="input" v-bind:style="{width: titleWidth + 'px', textAlign: 'left', color: '#4a4a4a', fontSize: '16px'}" >{{title}}</label>
      <el-input
        v-bind:style="{width: _inputWidth}"
        v-bind:placeholder="placeholder"
        v-model="p_value"
        clearable>
      </el-input>
      <p v-if="hint" style="color: #9b9b9b;margin-left: 10px;">{{hint}}</p>
    </div>
</template>

<script>
export default {
  name: 'TitleInput',
  props: {
    title: String,
    placeholder: String,
    titleWidth: {
      default: 100
    },
    inputWidth: {
      default:250,
      type: Number,
    },
    hint: String,
    value: String
  },
  data: function () {
    return {}
  },
  computed: {
    _inputWidth () {
      return this.inputWidth + 'px';
    },
    p_value: {
      get: function () {
        return this.value
      },
      // setter
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
