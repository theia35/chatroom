<template>
  <div class="chatroom">
    <div class="container">
      <div class="modal is-active" v-show="isOpen">
        <div class="modal-background"></div>
        <div class="modal-content">
          <h1>輸入姓名</h1>
          <div class="field">
            <input class="input" type="text" v-model.trim="userName" @keydown.enter="setUserName($event)">
          </div>
          <div class="field">
            <button class="button" @click="setUserName($event)">送出</button>
          </div>
        </div>
      </div>

      <div class="chatbox">
        <div class="chat-header">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <h1>Chatroom</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <h1>{{ userName }}</h1>
              </div>
            </div>
          </nav>
          <div class="notice">
            <div class="notice-text">你還在忙著刪訊息嗎? 時間管理人</div> 
          </div>
        </div>

        <ChatBody :messages="messages" :isUpload="isUpload" :progress="progress" :userName="userName"/>
        <ChatFooter :userName="userName" @updateUpload="updateUpload"/>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseObj from '@/middleware/firebaseHelper.js';
const messageRef = firebaseObj.database.ref('/message/');

export default {
  name: 'Chatroom',
  components: {
    ChatBody: () => import('@/components/ChatBody'),
    ChatFooter: () => import('@/components/ChatFooter'),
  },
  data: () => ({
    userName: '',
    message: '',
    messages: null,
    isOpen: true,
    isUpload: false,
    progress: 0,
  }),
  mounted() {
    this.getMessage();
  },
  methods: {
    setUserName (e) {
      if (e.shiftKey || e.keyCode === 229) {
        return false;
      }
      if (this.userName.length <= 1 && this.userName.trim() == '') {
        e.preventDefault();
        return false;
      }
      this.isOpen = false;
    },
    getMessage () {
      const self = this;  
      messageRef.on('value', function(snapshot) {
        self.messages = snapshot.val();
      })
    },
    updateUpload (param) {
      this.progress = param.progress;
      this.isUpload = param.isUpload;
    }
  },
}
</script>

<style lang="sass" scoped>
.chatroom
  width: 100%
  h1
    font-size: 24px
    font-weight: bold
  .modal
    .modal-content
      background-color: #ffffff
      padding: 1em
      border-radius: 10px
  .chatbox
    max-width: 600px
    height: 100vh
    margin: 0 auto
    border: 1px solid #e8e8e8
    .chat-header
      .level
        background-color: #f2f2f2
        margin-bottom: 0
        .level-left,
        .level-right
          padding: 1rem
        .level-right
          color: #ffffff
          background-color: #3273dc
      .notice
        display: flex
        justify-content: space-between
        padding: 1em 1.5em
        background-color: #dfceff
        font-weight: bold
</style>
