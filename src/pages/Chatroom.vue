<template>
  <div class="chatroom">
    <div class="container">
      <div class="modal is-active" v-show="isOpen">
        <div class="modal-background" @click="isOpen = false;"></div>
        <div class="modal-content">
          <h1>輸入姓名</h1>
          <div class="field">
            <input class="input" type="text" v-model.trim="userName">
          </div>
          <div class="field">
            <button class="button" @click="setUserName($event)">送出</button>
          </div>
        </div>
      </div>

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
          <div v-for="item in messages" :key="item.id" :class="{'is-selfuser' : item.userName === userName}" class="message-box">
             <div class="message-name">{{ item.userName }}</div>
             <div class="message-text">{{ item.message }}</div>
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
                  <textarea class="textarea" @keydown.enter="sendMessage($event)" v-model.trim="message" rows="1"></textarea>
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
const messageRef = firebaseObj.database.ref('/message/');

export default {
  name: 'Chatroom',
  data: () => ({
    userName: '',
    message: '',
    messages: [],
    isOpen: false
  }),
  mounted() {
    this.isOpen = true;
    this.getMessage();
  },
  methods: {
    setUserName () {
      this.isOpen = false;
    },
    getMessage () {
      const self = this;
      messageRef.on('value', function(snapshot) {
        self.messages = snapshot.val();
      })
    },
    sendMessage(e) {
      if (e.shiftKey) {
        return false;
      }
      if (this.message.length <= 1 && this.message.trim() == '') {
        e.preventDefault();
        return false;
      }
      messageRef.push({
        userName: this.userName,
        type: 'text',
        message: this.message,
        timeStamp: new Date()
      })

      this.message = '';
      e.preventDefault();
    },
  },
}
</script>

<style lang="sass" scoped>
.chatroom
  width: 100%
  .modal
    .modal-content
      background-color: #ffffff
      padding: 1em
      border-radius: 10px
      h1
        font-size: 30px
  .chatbox
    width: 100%
    .chat-header
      .user-name
        color: #ffffff
        background-color: #3273dc
    .chat-body
      height: calc( 100vh - 132px )
      padding: 1em
      .message-box
        width: fit-content
        margin-bottom: 1em
        .message-name
          color: #7b7b7b
        .message-text
          padding: 5px 10px
          border: 1px solid #fdab56
          border-radius: 20px
          border-top-left-radius: 0
      .is-selfuser
        position: absolute
        text-align: right
        .message-text
          border-radius: 20px
          border-top-right-radius: 0
    .chat-footer
      .footer
        padding: 0 1em
        .user-message
          padding: 1em
        .icon-sticker,
        .icon-submit
          width: 30px
</style>
