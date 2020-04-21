<template>
  <div class="chatroom">
    <div class="container">
      <div class="modal is-active" v-show="isOpen">
        <div class="modal-background"></div>
        <div class="modal-content">
          <h1>輸入姓名</h1>
          <div class="field">
            <input class="input" type="text" @keydown.enter="setUserName($event)" v-model.trim="userName">
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

        <div ref="chatBody" class="chat-body">
          <div v-for="item in messages" :key="item.id" :class="{'is-selfuser' : item.userName === userName}" class="message-box">
            <div class="message-name">{{ item.userName }}</div>
            <img v-if="item.type === 'sticker'" :src="item.url" class="message-sticker" />
            <div v-else class="message-text">{{ item.message }}</div>
          </div>
        </div>

        <div class="chat-footer">
          <footer class="footer">
            <div class="content has-text-centered">
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="dropdown is-up" :class="{'is-active': isSticker}">
                    <div class="dropdown-trigger" @click="isSticker = !isSticker">
                      <img class="level-item icon-sticker" src="@/images/icon-smile.png" aria-haspopup="true" aria-controls="dropdown-menu"/>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <img v-for="num in 7" :key="num.id" :src="'img/sticker-'+ num + '.png'" class="dropdown-item sticker-item" @click="sendSticker(num)" />
                      </div>
                    </div>
                  </div>
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
    isOpen: false,
    isSticker: false
  }),
  mounted() {
    this.isOpen = true;
    this.getMessage();
  },
  updated() {
   this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
  },
  methods: {
    setUserName (e) {
      if (e.shiftKey) {
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
    sendSticker(stickerId) {
      messageRef.push({
        userName: this.userName,
        type: 'sticker',
        url: 'img/sticker-'+ stickerId + '.png',
        timeStamp: new Date()
      });
      this.isSticker = false;
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
    max-width: 600px
    height: 100vh
    margin: 0 auto
    border: 1px solid #e8e8e8
    .chat-header
      .navbar
        background-color: #f2f2f2
      .user-name
        color: #ffffff
        background-color: #3273dc
    .chat-body
      height: calc( 100vh - 132px )
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
        .message-sticker
          width: 200px
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
    .chat-footer
      .footer
        padding: 0 1em
        .dropdown-menu
          min-width: 560px
          .sticker-item
            width: 150px
        .user-message
          padding: 1em
        .icon-sticker,
        .icon-submit
          width: 30px
</style>
