(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c95bc3e4"],{"66e3":function(e,t,s){},7156:function(e,t,s){var r=s("861d"),a=s("d2bb");e.exports=function(e,t,s){var i,n;return a&&"function"==typeof(i=t.constructor)&&i!==s&&r(n=i.prototype)&&n!==s.prototype&&a(e,n),e}},"724c":function(e,t,s){"use strict";var r=s("66e3"),a=s.n(r);a.a},a9e3:function(e,t,s){"use strict";var r=s("83ab"),a=s("da84"),i=s("94ca"),n=s("6eeb"),o=s("5135"),c=s("c6b6"),u=s("7156"),l=s("c04e"),f=s("d039"),d=s("7c73"),p=s("241c").f,h=s("06cf").f,g=s("9bf2").f,m=s("58a8").trim,v="Number",N=a[v],y=N.prototype,_=c(d(y))==v,I=function(e){var t,s,r,a,i,n,o,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=m(u),t=u.charCodeAt(0),43===t||45===t){if(s=u.charCodeAt(2),88===s||120===s)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(i=u.slice(2),n=i.length,o=0;o<n;o++)if(c=i.charCodeAt(o),c<48||c>a)return NaN;return parseInt(i,r)}return+u};if(i(v,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var b,w=function(e){var t=arguments.length<1?0:e,s=this;return s instanceof w&&(_?f((function(){y.valueOf.call(s)})):c(s)!=v)?u(new N(I(t)),s,w):I(t)},E=r?p(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;E.length>A;A++)o(N,b=E[A])&&!o(w,b)&&g(w,b,h(N,b));w.prototype=y,y.constructor=w,n(a,v,w)}},d277:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{ref:"chatBody",staticClass:"chat-body"},[e._l(e.messages,(function(t){return s("div",{key:t.id,staticClass:"message-box",class:{"is-selfuser":t.userName===e.userName}},[s("div",{staticClass:"message-name"},[e._v(e._s(t.userName))]),"sticker"===t.type?s("img",{staticClass:"message-sticker",attrs:{src:t.url}}):e._e(),"image"===t.type?s("img",{staticClass:"message-image",attrs:{src:t.url}}):e._e(),"text"===t.type?s("div",{staticClass:"message-text"},[e._v(e._s(t.message))]):e._e()])})),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isUpload,expression:"isUpload"}],staticClass:"upload-img"},[s("progress",{staticClass:"progress is-primary",attrs:{max:"100"},domProps:{value:e.progress}},[e._v(e._s(e.progress))])])],2)},a=[],i=(s("a9e3"),{name:"ChatBody",props:{messages:Object,isUpload:Boolean,progress:Number,userName:String},data:function(){return{}},mounted:function(){var e=this;/iPhone|iPad|Android/i.test(navigator.userAgent)&&(this.$refs.chatBody.style.maxHeight=window.innerHeight-207+"px",window.addEventListener("resize",(function(){e.$refs.chatBody.style.maxHeight=window.innerHeight-207+"px"})))},updated:function(){this.$refs.chatBody.scrollTop=this.$refs.chatBody.scrollHeight},watch:{progress:function(){var e=this;100===this.progress&&setTimeout((function(){e.$refs.chatBody.scrollTop=e.$refs.chatBody.scrollHeight}),1e3)}}}),n=i,o=(s("724c"),s("2877")),c=Object(o["a"])(n,r,a,!1,null,"f37e18a0",null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-c95bc3e4.02543fed.js.map