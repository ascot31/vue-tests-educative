<template>
  <li
    class="message"
    @click="handleClick">
      {{message}}
  </li>
</template>

<script>
export default {
  props: {
    message: String,
    author: String,
    nickname: {
      type: String,
      required: true,
      validator: nickname => nickname.length > 4
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('message-clicked', this.message)
    }
  }
}
</script>
