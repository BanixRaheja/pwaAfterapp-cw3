<template>
    <div  id="cart" class="responsive-container">
         <h2 class="cart-heading">Shopping Cart</h2>

         <div class="cart-items-container">
           <div v-if="!!this.cart.length" class="cart-grid">
             <div v-for="(item, index) in cart" :key="index" class="cart-item">
               <div class="cart-details">
                 <p><strong>Subject:</strong> {{ item.subject }}</p>
                 <p><strong>Location:</strong> {{ item.location }}</p>
                 <p><strong>Price:</strong> £{{ item.price }}</p>
                 <p><strong>Spaces:</strong> {{ item.spaces }}</p>
               </div>
               <img
                 :src="`https://webcoursework2.eu-north-1.elasticbeanstalk.com/${item.image}`"
                 :alt="item.subject"
                 class="cart-image"
               />
               <div class="cart-actions">
                 <button v-on:click.prevent="removeFromCart(item)">
                   Remove
                 </button>
               </div>
             </div>
           </div>

           <div v-else class="empty-cart-container">
             <div class="empty-cart-icon">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 class="w-16 h-16 text-gray-500"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke-width="2"
                   d="M12 4v16m8-8H4"
                 ></path>
               </svg>
             </div>
             <br />
             <br />
             <p class="empty-cart-message">Your cart is empty</p>
           </div>
         </div>

         <form v-on:submit.prevent="checkout">
           <div>
             <br />
             <label for="name">Name</label>
             <input type="text" id="name" v-model="checkoutForm.name.value" />
             <p v-if="checkoutForm.name.error">
               {{ checkoutForm.name.error }}
             </p>
           </div>

           <div>
             <label for="phone">Phone</label>
             <input type="tel" id="phone" v-model="checkoutForm.phone.value" />
             <p v-if="checkoutForm.phone.error">
               {{ checkoutForm.phone.error }}
             </p>
           </div>

           <!-- Display order details in real-time -->
           <div class="order-details">
             <h2>Order Information</h2>
             <p><strong>Name:</strong> {{ checkoutForm.name.value }}</p>
             <p><strong>Phone:</strong> {{ checkoutForm.phone.value }}</p>
           </div>

           <button :disabled="!isCheckoutFormValid">
             <div v-if="loading">
               <iframe
                 class="w-1/2"
                 src="https://embed.lottiefiles.com/animation/99297"
                 title="loading"
               ></iframe>
             </div>
             <span v-else>Checkout</span>
           </button>
         </form>


         <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="-translate-y-2"
        enter-to-class="translate-y-0"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="translate-y-0"
        leave-to-class="-translate-y-2"
      >
        <div
          v-if="checkedOut"
          id="toast-success"
          class="toast-container"
          role="alert"
        >
          <div class="icon-container">
            <svg
              aria-hidden="true"
              class="check-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="message-container">Checked out successfully.</div>
          <button
            @click.prevent="checkedOut = false"
            type="button"
            class="close-button"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              aria-hidden="true"
              class="close-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </transition>

    
       </div>

</template>



<script>
export default {
   name:'Checkout',
  
   props:["cart","checkoutForm", "isCheckoutFormValid","loading","checkedOut"],
   methods:{
       // EVEVT Emitter
       removeFromCart(lesson){
           this.$emit("remove-item-from-cart",lesson);
          
       },
       checkout(){
           this.$emit("checkout-order");
       },

},

}

</script>
