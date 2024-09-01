"use strict";(self["webpackChunkfullstack_ecommerce_pojui"]=self["webpackChunkfullstack_ecommerce_pojui"]||[]).push([[818],{881:function(e,t,s){s.r(t),s.d(t,{default:function(){return Oe}});var r=s(641),o=s(9322),a=s(2644),l=s(5518),i=s(7027),n=s(4492),u=s(4261),d=s(1743),c=s(6861),m=s(7278),p=s(3091),f=(s(2936),s(1963)),h=s(1470),b=s(5551),v=s(1766),g=s(9823),k=s(7487),y=s(6590),x=s(9841),w=s(1094),_=s(2636),C=s(4717),L=s(4675);const F=(0,w.j)({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...(0,b.V)(),...(0,h.tG)()},"VTextarea"),V=(0,_.RW)()({name:"VTextarea",directives:{Intersect:y.A},inheritAttrs:!1,props:F(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{attrs:s,emit:a,slots:l}=t;const i=(0,k.q)(e,"modelValue"),{isFocused:n,focus:u,blur:d}=(0,v.i)(e),c=(0,r.EW)((()=>"function"===typeof e.counterValue?e.counterValue(i.value):(i.value||"").toString().length)),m=(0,r.EW)((()=>s.maxlength?s.maxlength:!e.counter||"number"!==typeof e.counter&&"string"!==typeof e.counter?void 0:e.counter));function p(t,s){e.autofocus&&t&&s[0].target?.focus?.()}const y=(0,x.KR)(),w=(0,x.KR)(),_=(0,x.IJ)(""),F=(0,x.KR)(),V=(0,r.EW)((()=>e.persistentPlaceholder||n.value||e.active));function E(){F.value!==document.activeElement&&F.value?.focus(),n.value||u()}function I(e){E(),a("click:control",e)}function $(e){a("mousedown:control",e)}function T(t){t.stopPropagation(),E(),(0,r.dY)((()=>{i.value="",(0,C.P)(e["onClick:clear"],t)}))}function P(t){const s=t.target;if(i.value=s.value,e.modelModifiers?.trim){const e=[s.selectionStart,s.selectionEnd];(0,r.dY)((()=>{s.selectionStart=e[0],s.selectionEnd=e[1]}))}}const A=(0,x.KR)(),X=(0,x.KR)(+e.rows),O=(0,r.EW)((()=>["plain","underlined"].includes(e.variant)));function M(){e.autoGrow&&(0,r.dY)((()=>{if(!A.value||!w.value)return;const t=getComputedStyle(A.value),s=getComputedStyle(w.value.$el),r=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),o=A.value.scrollHeight,a=parseFloat(t.lineHeight),l=Math.max(parseFloat(e.rows)*a+r,parseFloat(s.getPropertyValue("--v-input-control-height"))),i=parseFloat(e.maxRows)*a+r||1/0,n=(0,C.qE)(o??0,l,i);X.value=Math.floor((n-r)/a),_.value=(0,C.Dg)(n)}))}let U;return(0,r.nT)((()=>{e.autoGrow||(X.value=+e.rows)})),(0,r.sV)(M),(0,r.wB)(i,M),(0,r.wB)((()=>e.rows),M),(0,r.wB)((()=>e.maxRows),M),(0,r.wB)((()=>e.density),M),(0,r.wB)(A,(e=>{e?(U=new ResizeObserver(M),U.observe(A.value)):U?.disconnect()})),(0,r.xo)((()=>{U?.disconnect()})),(0,L.C)((()=>{const t=!!(l.counter||e.counter||e.counterValue),a=!(!t&&!l.details),[u,v]=(0,C.ph)(s),{modelValue:g,...k}=b.Z.filterProps(e),x=(0,h.jz)(e);return(0,r.bF)(b.Z,(0,r.v6)({ref:y,modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":O.value},e.class],style:e.style},u,k,{centerAffix:1===X.value&&!O.value,focused:n.value}),{...l,default:t=>{let{id:s,isDisabled:a,isDirty:u,isReadonly:c,isValid:m}=t;return(0,r.bF)(h.xR,(0,r.v6)({ref:w,style:{"--v-textarea-control-height":_.value},onClick:I,onMousedown:$,"onClick:clear":T,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},x,{id:s.value,active:V.value||u.value,centerAffix:1===X.value&&!O.value,dirty:u.value||e.dirty,disabled:a.value,focused:n.value,error:!1===m.value}),{...l,default:t=>{let{props:{class:s,...l}}=t;return(0,r.bF)(r.FK,null,[e.prefix&&(0,r.bF)("span",{class:"v-text-field__prefix"},[e.prefix]),(0,r.bo)((0,r.bF)("textarea",(0,r.v6)({ref:F,class:s,value:i.value,onInput:P,autofocus:e.autofocus,readonly:c.value,disabled:a.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:E,onBlur:d},l,v),null),[[(0,r.gN)("intersect"),{handler:p},null,{once:!0}]]),e.autoGrow&&(0,r.bo)((0,r.bF)("textarea",{class:[s,"v-textarea__sizer"],id:`${l.id}-sizer`,"onUpdate:modelValue":e=>i.value=e,ref:A,readonly:!0,"aria-hidden":"true"},null),[[o.Jo,i.value]]),e.suffix&&(0,r.bF)("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:a?s=>(0,r.bF)(r.FK,null,[l.details?.(s),t&&(0,r.bF)(r.FK,null,[(0,r.bF)("span",null,null),(0,r.bF)(f.p,{active:e.persistentCounter||n.value,value:c.value,max:m.value,disabled:e.disabled},l.counter)])]):void 0})})),(0,g.O)({},y,w,F)}}),E=e=>((0,r.Qi)("data-v-db9b690c"),e=e(),(0,r.jt)(),e),I=E((()=>(0,r.Lk)("i",{class:"loading-box"},null,-1))),$=E((()=>(0,r.Lk)("div",{class:"cart-banner"},[(0,r.Lk)("h2",{class:"text-center"},"購物清單")],-1))),T={key:0,class:"container cost-list-box"},P={class:"row mobile-flex"},A={class:"col-lg-6 col-md-12 client-form-box"},X=E((()=>(0,r.Lk)("h3",{class:"font-weight-bold mb-3"},"訂單資料",-1))),O={class:"sent-from-btn"},M=["disabled"],U={key:0,class:"fas fa-spinner fa-spin"},N=E((()=>(0,r.Lk)("span",null,"送出訂單",-1))),R=E((()=>(0,r.Lk)("span",null,"送出訂單",-1))),W=[R],j=E((()=>(0,r.Lk)("i",{class:"fas fa-reply mr-2"},null,-1))),q={class:"col-lg-6 col-md-12"},B={class:"mx-2 my-4 order-total-box"},S=E((()=>(0,r.Lk)("h3",{class:"font-weight-bold mb-3"},"訂單總計",-1))),D={class:"d-flex"},G=["src"],K={class:"w-100"},z={class:"d-flex justify-content-between font-weight-bold"},H={class:"mb-0"},J={class:"mb-0"},Q={class:"d-flex justify-content-between"},Z={class:"mb-0 text-muted"},Y={class:"table total-table my-3 text-muted"},ee=E((()=>(0,r.Lk)("th",{scope:"row",class:"border-0 px-0 pt-3 font-weight-normal"},"小計",-1))),te={class:"text-right border-0 px-0 pt-3"},se={key:0},re=E((()=>(0,r.Lk)("th",{scope:"row",class:"border-0 px-0 pb-3 font-weight-bold text-orange"}," 優惠碼折扣 ",-1))),oe={class:"text-right text-orange font-weight-bold border-0 px-0 pb-3"},ae=E((()=>(0,r.Lk)("th",{scope:"row",class:"border-0 p-0 font-weight-normal"},"運費",-1))),le={class:"text-right border-0 p-0"},ie={key:0},ne={key:1},ue={colspan:"2",class:"text-right border-0 px-0 pt-0 pb-4"},de={class:"input-group mt-3 input-group-sm"},ce={class:"input-group-append"},me={class:"d-flex justify-content-between mt-2 totalnum-box"},pe={key:0,class:"total font-weight-bold"},fe={key:1,class:"total font-weight-bold text-success"},he={key:2,class:"total font-weight-bold"},be={key:0},ve={key:1},ge={key:3,class:"total font-weight-bold text-success"},ke={key:0},ye={key:1},xe={class:"btn-send-order font-weight-bold"},we=["disabled"],_e={key:0,class:"fas fa-spinner fa-spin"},Ce=E((()=>(0,r.Lk)("span",null,"送出訂單",-1))),Le=E((()=>(0,r.Lk)("span",null,"送出訂單",-1))),Fe=[Le];function Ve(e,t,s,f,h,b){const v=(0,r.g2)("loading"),g=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.bF)(v,{active:h.isLoading},{default:(0,r.k6)((()=>[I])),_:1},8,["active"]),$,h.carts.length>0?((0,r.uX)(),(0,r.CE)("div",T,[(0,r.Lk)("div",P,[(0,r.Lk)("div",A,[(0,r.bF)(i.n,{class:"form-data-box p-2",ref:"form",modelValue:h.isValid,"onUpdate:modelValue":t[8]||(t[8]=e=>h.isValid=e)},{default:(0,r.k6)((()=>[(0,r.bF)(n.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(u.L,null,{default:(0,r.k6)((()=>[(0,r.bF)(d.B,{cols:"12"},{default:(0,r.k6)((()=>[X,(0,r.bF)(p.W,{class:"font-weight-bold mb-1",modelValue:h.form.user.name,"onUpdate:modelValue":t[0]||(t[0]=e=>h.form.user.name=e),modelModifiers:{trim:!0},rules:[h.rules.required],label:"收件人姓名",placeholder:"輸入姓名",dense:"",outlined:"",required:""},null,8,["modelValue","rules"]),(0,r.bF)(p.W,{class:"font-weight-bold mb-1",modelValue:h.form.user.tel,"onUpdate:modelValue":t[1]||(t[1]=e=>h.form.user.tel=e),modelModifiers:{trim:!0},rules:[h.rules.required,h.rules.phone],label:"收件人電話",placeholder:"請輸入電話",required:"",type:"tel"},null,8,["modelValue","rules"]),(0,r.bF)(p.W,{class:"font-weight-bold mb-1",modelValue:h.form.user.email,"onUpdate:modelValue":t[2]||(t[2]=e=>h.form.user.email=e),modelModifiers:{trim:!0},rules:[h.rules.required,h.rules.email],label:"Email",placeholder:"輸入 email",required:"",type:"email"},null,8,["modelValue","rules"]),(0,r.bF)(p.W,{class:"font-weight-bold mb-1",modelValue:h.form.user.address,"onUpdate:modelValue":t[3]||(t[3]=e=>h.form.user.address=e),modelModifiers:{trim:!0},rules:[h.rules.required],label:"收件人地址",placeholder:"請輸入地址",required:""},null,8,["modelValue","rules"]),(0,r.bF)(m.d4,{class:"font-weight-bold mb-1",modelValue:h.form.payment_method,"onUpdate:modelValue":t[4]||(t[4]=e=>h.form.payment_method=e),items:h.paymentOptions,label:"付款方式",placeholder:"請選擇付款方式",required:""},null,8,["modelValue","items"]),(0,r.bF)(V,{class:"font-weight-bold mb-1",modelValue:h.form.message,"onUpdate:modelValue":t[5]||(t[5]=e=>h.form.message=e),modelModifiers:{trim:!0},label:"留言",placeholder:"輸入留言",rows:"5"},null,8,["modelValue"]),(0,r.bF)(g,{to:"/cart",class:"mt-md-0 mt-3"},{default:(0,r.k6)((()=>[(0,r.bF)(l.D,{class:"back-to-cart btn btn-outline-dark"},{default:(0,r.k6)((()=>[(0,r.bF)(c.w,null,{default:(0,r.k6)((()=>[(0,r.eW)("mdi-reply")])),_:1}),(0,r.eW)("返回購物車")])),_:1})])),_:1})])),_:1})])),_:1}),(0,r.Lk)("div",O,[h.isProcessing?((0,r.uX)(),(0,r.CE)("button",{key:0,onClick:t[6]||(t[6]=(0,o.D$)(((...e)=>b.createOrder&&b.createOrder(...e)),["prevent"])),class:"m-checkout btn btn-outline-success mb-3",disabled:h.isProcessing},[h.isProcessing?((0,r.uX)(),(0,r.CE)("i",U)):(0,r.Q3)("",!0),N],8,M)):((0,r.uX)(),(0,r.CE)("button",{key:1,onClick:t[7]||(t[7]=(0,o.D$)(((...e)=>b.createOrder&&b.createOrder(...e)),["prevent"])),class:"m-checkout btn btn-outline-success mb-3"},W)),(0,r.bF)(g,{to:"/cart",class:"m-return btn btn-outline-dark"},{default:(0,r.k6)((()=>[j,(0,r.eW)(" 返回購物車 ")])),_:1})])])),_:1})])),_:1},8,["modelValue"])]),(0,r.Lk)("div",q,[(0,r.Lk)("div",B,[S,((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(h.carts,(t=>((0,r.uX)(),(0,r.CE)("div",{class:"my-3",key:t.product.id+1},[(0,r.Lk)("div",D,[(0,r.Lk)("img",{src:t.product.imageUrl,alt:"",class:"mr-2"},null,8,G),(0,r.Lk)("div",K,[(0,r.Lk)("div",z,[(0,r.Lk)("p",H,(0,a.v_)(t.product.title),1),(0,r.Lk)("p",J,"x"+(0,a.v_)(t.qty),1)]),(0,r.Lk)("div",Q,[(0,r.Lk)("small",Z,(0,a.v_)(e.$filters.currency(t.product.price))+" / "+(0,a.v_)(t.product.unit),1)])])])])))),128)),(0,r.Lk)("table",Y,[(0,r.Lk)("tbody",null,[(0,r.Lk)("tr",null,[ee,(0,r.Lk)("td",te,(0,a.v_)(e.$filters.currency(h.orgTotal)),1)]),h.coupon_status?((0,r.uX)(),(0,r.CE)("tr",se,[re,(0,r.Lk)("td",oe," -"+(0,a.v_)(e.$filters.currency(h.orgTotal-Math.round(h.cartTotal))),1)])):(0,r.Q3)("",!0),(0,r.Lk)("tr",null,[ae,(0,r.Lk)("td",le,[(0,r.Lk)("div",null,[h.cartTotal>599?((0,r.uX)(),(0,r.CE)("span",ie," NT 0")):((0,r.uX)(),(0,r.CE)("span",ne," NT 60"))])])]),(0,r.Lk)("tr",null,[(0,r.Lk)("td",ue,[(0,r.Lk)("div",de,[(0,r.bo)((0,r.Lk)("input",{type:"text",class:"form-control m-coupon","onUpdate:modelValue":t[9]||(t[9]=e=>h.coupon_code=e),placeholder:"請輸入優惠碼"},null,512),[[o.Jo,h.coupon_code,void 0,{trim:!0}]]),(0,r.Lk)("div",ce,[(0,r.Lk)("button",{class:"btn coupon-btn",type:"button",onClick:t[10]||(t[10]=(0,o.D$)(((...e)=>b.addCoupon&&b.addCoupon(...e)),["prevent"]))}," 套用優惠碼 ")])])])])])]),(0,r.Lk)("div",me,[h.coupon_status?((0,r.uX)(),(0,r.CE)("p",fe,"折扣價")):((0,r.uX)(),(0,r.CE)("p",pe,"總計")),h.coupon_status?((0,r.uX)(),(0,r.CE)("p",ge,[h.cartTotal>=599?((0,r.uX)(),(0,r.CE)("span",ke,(0,a.v_)(e.$filters.currency(h.cartTotal)),1)):((0,r.uX)(),(0,r.CE)("span",ye,(0,a.v_)(e.$filters.currency(h.cartTotal+60)),1))])):((0,r.uX)(),(0,r.CE)("p",he,[h.orgTotal>=599?((0,r.uX)(),(0,r.CE)("span",be,(0,a.v_)(e.$filters.currency(h.orgTotal)),1)):((0,r.uX)(),(0,r.CE)("span",ve,(0,a.v_)(e.$filters.currency(h.orgTotal+60)),1))])),(0,r.Lk)("p",xe,[h.isProcessing?((0,r.uX)(),(0,r.CE)("button",{key:0,class:"btn btn-send-order btn-sm",onClick:t[11]||(t[11]=(...e)=>b.createOrder&&b.createOrder(...e)),disabled:h.isProcessing},[h.isProcessing?((0,r.uX)(),(0,r.CE)("i",_e)):(0,r.Q3)("",!0),Ce],8,we)):((0,r.uX)(),(0,r.CE)("button",{key:1,class:"btn btn-send-order btn-sm",onClick:t[12]||(t[12]=(0,o.D$)(((...e)=>b.createOrder&&b.createOrder(...e)),["prevent"]))},Fe))])])])])])])):(0,r.Q3)("",!0)])}var Ee=s(2541),Ie=s(8965),$e=s(1601),Te=s(1884),Pe={data(){return{carts:{},orgTotal:0,cartTotal:0,form:{user:{name:"",email:"",tel:"",address:""},payment_method:"WebATM",message:""},coupon_status:!1,coupon_code:"",final_total:0,isLoading:!1,isProcessing:!1,isValid:!1,shipFree:!1,userInfo:[],member:{isMember:!1,uid:""},userCartItems:[],paymentOptions:["WebATM","Credit","LinePay","ApplePay","GooglePay"],rules:{required:e=>!!e||"此欄位為必填",email:e=>/.+@.+\..+/.test(e)||"請輸入有效的 email 地址",phone:e=>/^\d{10}$/.test(e)||"請輸入有效的電話號碼"}}},created(){this.getAuthState()},mounted(){this.$emitter.on("logout-user",(()=>{this.member.isMember=!1,this.member.uid=""}))},beforeUnmount(){this.$emitter.off("logout-user",(()=>{}))},methods:{async fetchUserData(e,t,s){const r=(0,Te.H9)(Ie.db,"userInfo",e),o=await(0,Te.x7)(r),a=await(0,Te.x7)(t),l=o.data().orders||[],i=a.data();i.orderId=s,l.push(i),await(0,Te.mZ)(r,{orders:l})},getAuthState(){(0,$e.hg)(Ie.j2,(e=>{e?(this.form.user.email=e.email,this.form.user.name=e.displayName,this.member.isMember=!0,this.member.uid=e.uid,this.getUserInfo(e.uid),this.getCart(e.uid),Ee.A.fire({icon:"success",title:"成功帶入會員資訊"})):(this.member.isMember=!1,this.member.uid="",Ee.A.fire({icon:"info",title:"登入會員可獲得更多資訊"}))}))},async getUserInfo(e){const t=(0,Te.rJ)(Ie.db,"userInfo"),s=await(0,Te.GG)(t);this.userInfo=[],s.forEach((e=>{let t=e.data();t.id=e.id,this.userInfo.push({id:t.id,address:t.address,phoneNumber:t.phoneNumber})})),this.userInfo.forEach((t=>{t.id===e&&(this.form.user.address=t.address,this.form.user.tel=t.phoneNumber)}))},async updateUserCartItem(e){const t=(0,Te.rJ)(Ie.db,"userInfo"),s=(0,Te.H9)(t,this.member.uid),r=await(0,Te.x7)(s);r.exists()?(this.userCartItems=r.data().cartItem,void 0!==e&&(this.userCartItems=e,await(0,Te.mZ)(s,{cartItem:this.userCartItems}))):console.log("No such document!")},getCart(e){const t=`https://fullstack-ecommerce-pojui-backend-vercel.vercel.app/cart/${e}`;this.isLoading=!0,this.$http.get(t).then((e=>{this.carts=e.data.data.carts,""!==this.member.uid&&this.updateUserCartItem(this.carts),""!==this.coupon_code&&!1!==this.coupon_status||this.carts.forEach((e=>{"coupon"in e&&(delete e.coupon,e.final_total=e.total)})),this.updateTotal(),this.isLoading=!1})).catch((()=>{Ee.A.fire({title:"資料讀取失敗，請稍後再試",icon:"error"}),this.isLoading=!1}))},updateTotal(){let e=0;this.orgTotal=0,this.carts.forEach((t=>{"coupon"in t?(e+=t.final_total,this.orgTotal+=t.product.price*t.qty):(e+=t.product.price*t.qty,this.orgTotal=e)})),this.cartTotal=e},addCoupon(){this.isLoading=!0;const e=`https://fullstack-ecommerce-pojui-backend-vercel.vercel.app/cart/${this.member.uid}/coupon`,t={code:this.coupon_code};this.$http.post(e,{data:t}).then((e=>{!0===e.data.success?(this.coupon_status=!0,this.getCart(this.member.uid),this.isLoading=!1,Ee.A.fire({icon:"success",title:e.data.message})):""===this.coupon_code?(this.isLoading=!1,this.coupon_status=!1,this.getCart(this.member.uid),Ee.A.fire({icon:"error",title:"優惠碼不能為空"})):(this.isLoading=!1,this.coupon_status=!1,this.getCart(this.member.uid),Ee.A.fire({icon:"error",title:e.data.message}))})).catch((e=>{const t=e.response.data.errors;if(t)t.code.forEach((e=>{Ee.A.fire({title:`${e}`,icon:"error"})})),this.isLoading=!1;else{const{message:t}=e.response.data;Ee.A.fire({title:`${t}`,icon:"error"}),this.isLoading=!1}}))},createOrder(){this.$refs.form.validate().then((e=>{if(!1===e.valid)Ee.A.fire({icon:"error",title:"請輸入正確資訊"});else{this.isProcessing=!0,this.isLoading=!0;const e=`https://fullstack-ecommerce-pojui-backend-vercel.vercel.app/order/${this.member.uid}`,t={...this.form};this.$http.post(e,{data:t}).then((e=>{!0===e.data.success&&(this.$emitter.emit("update-total",this.member.uid),Ee.A.fire({icon:"success",title:"表單已送出"}),this.getOrder(e.data.orderId).then((t=>{this.addOrderWithCustomId(e.data.orderId,t.data.order.create_at),setTimeout((()=>{this.$router.replace(`/checkout/${e.data.orderId}`),this.getCart(this.member.uid),this.isProcessing=!1,this.isLoading=!1,this.$refs.form.reset()}),1500)})).catch((e=>{console.error("Error:",e)})))})).catch((()=>{this.isProcessing=!1,Ee.A.fire({title:"訂單失敗，請稍後再試",icon:"error"}),this.isLoading=!1}))}}))},async addOrderWithCustomId(e,t){try{const s=(0,Te.H9)(Ie.db,"orderInfo",e);this.cartTotal<599?(this.final_total=this.cartTotal+60,this.shipFree=!1):(this.final_total=this.cartTotal,this.shipFree=!0),await(0,Te.BN)(s,{cartTotal:Math.round(this.final_total),isCouponUsed:this.coupon_status,payment:this.form.payment_method,message:this.form.message,create_at:t,is_paid:!1,is_member:this.member.isMember,is_shipfree:this.shipFree,uid:this.member.uid,user:this.form.user});const r=(0,Te.rJ)(s,"cartInfo");for(const[e,t]of Object.entries(this.carts))await(0,Te.BN)((0,Te.H9)(r,e),t);this.fetchUserData(this.member.uid,s,e)}catch(s){console.error("Error adding document: ",s)}},async getOrder(e){try{const t=`https://fullstack-ecommerce-pojui-backend-vercel.vercel.app/order/${e}`,s=await this.$http.get(t);return s}catch(t){throw console.error("Error fetching order:",t),t}}}},Ae=s(6262);const Xe=(0,Ae.A)(Pe,[["render",Ve],["__scopeId","data-v-db9b690c"]]);var Oe=Xe},7027:function(e,t,s){s.d(t,{n:function(){return m}});var r=s(641),o=s(5851),a=s(5596),l=s(9823),i=s(9841),n=s(1094),u=s(2636),d=s(4675);const c=(0,n.j)({...(0,o.u)(),...(0,a.pE)()},"VForm"),m=(0,u.RW)()({name:"VForm",props:c(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,t){let{slots:s,emit:o}=t;const n=(0,a.DG)(e),u=(0,i.KR)();function c(e){e.preventDefault(),n.reset()}function m(e){const t=e,s=n.validate();t.then=s.then.bind(s),t.catch=s.catch.bind(s),t.finally=s.finally.bind(s),o("submit",t),t.defaultPrevented||s.then((e=>{let{valid:t}=e;t&&u.value?.submit()})),t.preventDefault()}return(0,d.C)((()=>(0,r.bF)("form",{ref:u,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:c,onSubmit:m},[s.default?.(n)]))),(0,l.O)(n,u)}})}}]);
//# sourceMappingURL=818.f1394dd9.js.map