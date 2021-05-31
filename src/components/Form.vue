<template>
  <div>
    <form action="" @submit.prevent="onSubmit(inputValue)">
      <input type="text" v-model="inputValue">
      <span class="reversed">{{ reversedInput }}</span>

      <button type="submit"> Send </button>
    </form>
    <br />
    <p v-for="(result, index) in results" :key="index" class="result"> {{ result.title }}</p>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  props: ['reversed'],
  data: () => {
    return {
      inputValue: '',
      results: []
    }
  },
  computed: {
    reversedInput () {
      return this.reversed
        ? this.inputValue.split('').reverse().join('')
        : this.inputValue
    }
  },
  methods: {
    async onSubmit (value) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${value}`)
      // axios.get('https://jsonplaceholder.typicode.com/posts?q=' + value)
      // getPromise.then(results => {
      //  this.results = results.data
      // })
      this.results = await response.json()
      return this.results
    }
  },
  watch: {
    async inputValue (newVal, oldVal) {
      if (newVal.trim().length && newVal !== oldVal) {
        console.log(newVal)
      }
    }
  }
}
</script>
