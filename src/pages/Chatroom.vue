<template>
  <div class="chatroom">
    <div class="container">
      <div class="modal is-active" v-show="isOpen">
        <div class="modal-background"></div>
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
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <h1>Chatroom</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <span>
                  {{ userName }}
                </span>
              </div>
            </div>
          </nav>
        </div>

        <div ref="chatBody" class="chat-body">
          <div v-for="item in messages" :key="item.id" :class="{'is-selfuser' : item.userName === userName}" class="message-box">
            <div class="message-name">{{ item.userName }}</div>
            <img v-if="item.type === 'sticker'" :src="item.url" class="message-sticker" />
            <img v-if="item.type === 'image'" :src="item.url" class="message-image" />
            <div v-if="item.type === 'text'" class="message-text">{{ item.message }}</div>
          </div>
          <div v-if="isUpload" class="upload-img">
            <progress class="progress is-primary"  :value="progress" max="100">{{ progress }}</progress>
          </div>
        </div>

        <div class="chat-footer">
          <footer class="footer">
            <div class="content">
              <nav class="level is-mobile">
                <div class="level-left">
                  <img class="level-item icon-uploadImg" src="@/images/icon-upload-img.png" @click="$refs.uploadImg.click()" :class="{ }"/>
                  <input class="uploadInput" style="display: none" type="file" ref="uploadImg" @change="onFileChange( $event )" accept="image/jpeg,image/jpg,image/png" >
                  
                  <div class="dropdown is-up" :class="{'is-active': isSticker}">
                    <div class="dropdown-trigger" @click="isSticker = !isSticker" @blur="isSticker = false">
                      <img class="level-item icon-sticker" src="@/images/icon-smile.png" aria-haspopup="true" aria-controls="dropdown-menu"/>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <div class="columns is-mobile is-multiline">
                          <div v-for="num in 9" :key="num.id" class="column is-one-third-desktop is-half-mobile">
                            <img :src="'./img/sticker-'+ num + '.png'" class="dropdown-item sticker-item" @click="sendSticker(num)" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="level-item user-message">
                  <textarea class="textarea" v-model.trim="message" rows="1"></textarea>
                </div>

                <div class="level-right">
                  <img class="level-item icon-submit" src="@/images/icon-send.png" @click="sendMessage($event)"/>
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
    isSticker: false,
    isUpload: false,
    progress: '',
    file: ''
  }),
  mounted() {
    this.isOpen = true;
    this.getMessage();
  },
  updated() {
   this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
  },
  methods: {
    setUserName () {
      // if (e.shiftKey) {
      //   return false;
      // }
      // if (this.userName.length <= 1 && this.userName.trim() == '') {
      //   e.preventDefault();
      //   return false;
      // }
      this.isOpen = false;
    },
    getMessage () {
      const self = this;
      messageRef.on('value', function(snapshot) {
        self.messages = snapshot.val();
      })
    },
    sendMessage(e) {
      // if (e.shiftKey) {
      //   return false;
      // }
      // if (this.message.length <= 1 && this.message.trim() == '') {
      //   e.preventDefault();
      //   return false;
      // }
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
<<<<<<< HEAD
        url: 'img/sticker-'+ stickerId + '.png',
=======
        url: './img/sticker-'+ stickerId + '.png',
>>>>>>> 5b96bb3632a4d5b8b63db756a8993da2c1b859fd
        timeStamp: new Date()
      });
      this.isSticker = false;
    },
    async onFileChange (e) {
      this.file = e.target.files[0];
      if (!this.file) {
        this.$refs.uploadImg.value = '';
        this.isUpload = false;
        return;
      } else {
        let self = this;
        let storageRef = firebaseObj.storage.ref(new Date().getTime() + this.file.name).put(this.file);
        this.progress = '0';
        this.isUpload = true;
        
        storageRef.on('state_changed', (snapshot) => {
          self.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        }, () => {
          storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            messageRef.push({
              userName: self.userName,
              type: 'image',
              url: downloadURL,
              timeStamp: new Date()
            })
            self.isUpload = false;
          });
        });
      }
    }
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
      .level
        background-color: #f2f2f2
        min-height: 3.25rem
        .level-left,
        .level-right
          padding: 1rem
          line-height: 1.5
          font-size: 1em
        .level-right
          color: #ffffff
          background-color: #3273dc
    .chat-body
      height: calc( 100vh - 136px )
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
        .message-image
          max-width: 80%
          max-height: 340px
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
          .dropdown-content
            height: 50vh
            overflow-x: hidden
            overflow-y: scroll
          .sticker-item
            width: 150px
        .user-message
          padding: 1em
          .textarea
            resize: none
        .icon-uploadImg,
        .icon-sticker,
        .icon-submit
          width: 30px
@media (max-width: 768px)
  .chatroom
    .chatbox
      .chat-footer
        .footer
          .dropdown-menu
            min-width: 90vw
</style>
