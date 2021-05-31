<template>
  <div id="app">
    <MessageList>
      <template v-slot:header>
          El titulo
      </template>
      <Message
        @message-clicked="handleMessageClick"
        :message="message"
        v-for="(message, index) in messages"
        :key="index"
      />
    </MessageList>
  </div>
</template>

<script>
import MessageList from './components/MessageList'
import Message from './components/Message'
export default {
  name: 'app',
  data: () => ({ messages: ['Perro'] }),
  methods: {
    handleMessageClick (message) {
      console.log('HandleMessageClick: ', message)
    }
  },
  components: {
    MessageList, Message
  }
}
</script>
