<template>
  <div class="chatroom">
    <div class="container">
      <div class="chatbox">
        <div class="chat-header">
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <div class="navbar-item">
                <h1>Chatroom</h1>
              </div>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <div class="navbar-item user-name">
                  <span>
                    {{ userName }}
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div class="chat-body">
          <div class="message-box">
             <div class="message-name"></div>
             <div class="message-text"></div>
          </div>
        </div>

        <div class="chat-footer">
          <footer class="footer">
            <div class="content has-text-centered">
              <nav class="level">
                <div class="level-left">
                  <img class="level-item icon-sticker" src="@/images/icon-smile.png"/>
                </div>
                <div class="level-item user-message">
                  <textarea class="textarea" @keydown.enter="sendMessage($event)" v-model.trim="messages" rows="1"></textarea>
                </div>
                <div class="level-right">
                  <img class="level-item icon-submit" src="@/images/icon-arrow-right.png" @click="sendMessage($event)"/>
                </div>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseObj from '@/middleware/firebaseHelper.js';

export default {
  name: 'Chatroom',
  data: () => ({
    userName: 'test1',
    messages: [],
  }),
  methods: {
    sendMessage(e) {
      if (e.shiftKey) {
        return false;
      }
      if (this.messages.length <= 1 && this.messages.trim() == '') {
        e.preventDefault();
        return false;
      }
      const messageRef = firebaseObj.database.ref('/message/');
      messageRef.push({
        userName: this.userName,
        type: 'text',
        message: this.messages,
        timeStamp: new Date()
      })

      this.messages = '';
      e.preventDefault();
    },
  },
  mounted() {
    
  },
}
</script>

<style lang="sass" scoped>
.chatroom
  width: 100%
  .chatbox
    width: 100%
    .chat-header
      .user-name
        color: #ffffff
        background-color: #3273dc
    .chat-body
      height: calc( 100vh - 132px )
    .chat-footer
      .footer
        padding: 0
        .user-message
          padding: 1em
        .icon-sticker,
        .icon-submit
          width: 30px
</style>
