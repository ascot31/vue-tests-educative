<template>
  <div>
    <header class="list-header">
      <slot name="header">
        Default slot
      </slot>
    </header>
    <ul class="list-messages">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['messages']
}
</script>
