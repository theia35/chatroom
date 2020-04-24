<template>
  <div ref="chatBody" class="chat-body">
    <div v-for="item in messages" :key="item.id" :class="{'is-selfuser' : item.userName === userName}" class="message-box">
      <div class="message-name">{{ item.userName }}</div>
      <img v-if="item.type === 'sticker'" :src="item.url" class="message-sticker" />
      <img v-if="item.type === 'image'" :src="item.url" class="message-image" />
      <div v-if="item.type === 'text'" class="message-text">{{ item.message }}</div>
    </div>
    <div v-show="isUpload" class="upload-img">
      <progress class="progress is-primary"  :value="progress" max="100">{{ progress }}</progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBody',
  props: {
    messages: Object,
    isUpload: Boolean,
    progress: Number,
    userName: String
  },
  data: () => ({
  }),
  mounted() {
    if ((/iPhone|iPad|Android/i.test(navigator.userAgent))) {
      this.$refs.chatBody.style.maxHeight = (window.innerHeight - 207) + 'px';
      window.addEventListener('resize', () => {
        this.$refs.chatBody.style.maxHeight = (window.innerHeight - 207) + 'px';
      });
    }
  },
  updated() {
    this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
  },
  watch: {
    progress () {
      if (this.progress === 100) {
        setTimeout(() => {
          this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
        }, 1000)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.chat-body
  height: calc( 100vh - 207px )
  padding: 1em
  overflow-y: scroll
  .message-box
    width: fit-content
    max-width: 100%
    margin-bottom: 1em
    word-wrap: break-word
    .message-name
      color: #7b7b7b
    .message-text
      padding: 5px 15px
      border: 1px solid #ff3860
      border-radius: 20px
      border-top-left-radius: 0
      white-space: pre-wrap
    .message-sticker
      width: 200px
    .message-image
      max-width: 80%
      max-height: 340px
  .upload-img
    max-width: 50%
    margin-left: auto
  .is-selfuser
    margin-left: auto
    text-align: right
    .message-text
      text-align: left
      color: #000000b3
      background-color: #ffdd57
      border: 1px solid #ffdd57
      border-radius: 20px
      border-top-right-radius: 0
</style>
