<template>
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
            <textarea class="textarea" v-model.trim="message" @keypress.enter="sendMessage($event)" rows="1"></textarea>
          </div>

          <div class="level-right">
            <img class="level-item icon-submit" src="@/images/icon-send.png" @click="sendMessage($event)"/>
          </div>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import firebaseObj from '@/middleware/firebaseHelper.js';
const messageRef = firebaseObj.database.ref('/message/');

export default {
  name: 'ChatFooter',
  props: {
    userName: String
  },
  data: () => ({
    message: '',
    isSticker: false,
    file: ''
  }),
  methods: {
    sendMessage(e) {
      if (e.shiftKey || e.keyCode === 229) {
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
        url: './img/sticker-'+ stickerId + '.png',
        timeStamp: new Date()
      });
      this.isSticker = false;
    },
    onFileChange (e) {
      let self = this;
      self.file = e.target.files[0];
      self.$emit('updateUpload', {
        progress: 0,
        isUpload: true
      });
      let storageRef = firebaseObj.storage.ref(new Date().getTime() + self.file.name).put(self.file);
      storageRef.on('state_changed', (snapshot) => {
        self.$emit('updateUpload', {
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          isUpload: true
        });
      }, (error) => {
        console.log(error);
      }, () => {
        storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          messageRef.push({
            userName: self.userName,
            type: 'image',
            url: downloadURL,
            timeStamp: new Date()
          })
          self.$emit('updateUpload', {
            progress: 100,
            isUpload: false,
          });
        });
      });
    }
  },
}
</script>

<style lang="sass" scoped>
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
  .chat-footer
    .footer
      .dropdown-menu
        min-width: 90vw
        left: -40px
        margin-bottom: 22px
</style>
