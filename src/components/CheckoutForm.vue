<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { usePlanStore } from '../stores/subscription'

const userStore = useUserStore()
const planStore = usePlanStore()
const router = useRouter()
const disabled = ref(false)
const card = ref(null)

const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const elements = stripe.elements()

const style = {
  base: {
    'color': '#32325d',
    'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
    'fontSmoothing': 'antialiased',
    'fontSize': '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
}

const el = elements.create('card', { style })

function displayError(event) {
  const displayError = document.getElementById('card-errors')
  if (event.error)
    displayError.textContent = event.error.message

  else
    displayError.textContent = ''
}

onMounted(() => {
  el.mount(card.value)

  el.on('change', (event) => {
    displayError(event)
  })
})

async function Submit() {
  disabled.value = true
  const clientSecret = planStore.planData.clientSecret
  const fullName = userStore.userData.name

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      type: 'card',
      card: el,
      billing_details: {
        name: fullName,
      },
    },
  })
  if (result.error) {
    disabled.value = false
    // eslint-disable-next-line no-alert
    alert(result.error.message)
  }
  else {
    // Successful subscription payment
    // The subscription automatically becomes active upon payment.
    router.push({
      name: 'thankyou',
      params: {
        subscription: planStore.planData.subscriptionId,
      },
    })
  }
}
</script>

<template>
  <div v-if="planStore.planData.clientSecret">
    <ul role="list" class="mx-3 my-7 space-y-2">
      <li class="flex space-x-3">
        <!-- Icon -->
        <svg
          class="h-8 w-8 text-gray-600"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z"
          />
        </svg>
        <span
          class="text-2xl font-normal leading-tight text-gray-500"
        >Total: <b>${ { planStore.planChose.price } }</b></span>
      </li>
      <li class="flex space-x-3">
        <svg
          class="h-8 w-8 text-gray-600" viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z"
          />
        </svg>
        <span class="text-2xl font-normal leading-tight text-gray-500">Plan: <b>{ { planStore.planChose.plan } }</b></span>
      </li>
      <li class="flex space-x-3">
        <svg
          class="h-8 w-8 text-gray-600"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z"
          />
        </svg>
        <span class="text-2xl font-normal leading-tight text-gray-500">Name: <b>{ { userStore.userData.name } }</b></span>
      </li>
    </ul>
    <div class="mt-5">
      <!-- stripe -->
      <div
        ref="card"
        class="mx-3 border-2 rounded-md border-solid p-2.5"
      >
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div
        id="card-errors"
        role="alert"
        class="text-error-message mx-3 text-lg font-semibold"
      />
      <div class="mx-3 justify-center">
        <button
          class="mb-3 mt-5 h-8 w-full border rounded-md bg-indigo-500 pb-1 text-white shadow-md hover:bg-indigo-400"
          :disabled="disabled"
          @click="Submit"
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  </div>
</template>
