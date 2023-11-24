<!-- eslint-disable no-alert -->
<script setup>
import { useRouter } from 'vue-router'
import { usePlanStore } from '../../store/subscription'
import { useUserStore } from '../../store/user'
import PlanCard from '../components/PlanCard.vue'

const planStore = usePlanStore ()
const userStore = useUserStore ()
const router = useRouter()

async function createSubscription(
  priceId,
  price,
  plan,
) {
  try {
    const res = await planStore.createSubscription(
      userStore.userData.id,
      priceId,
      price,
      plan,
    )
    if (res)
      router.push({ name: 'checkout' })

    else
      alert('Error creating subscription, Try again later!')
  }
  catch (error) {
    alert('An error has occurred with our server. Try again later')
  }
}

function standardPlan() {
  const priceId = import.meta.env.VITE_BASIC_PLAN
  const price = '5.00'
  const plan = 'Basic'
  createSubscription(priceId, price, plan)
}

function premiumPlan() {
  const priceId = import.meta.env.VITE_PREMIUM_PLAN
  const price = '10.00'
  const plan = 'Premium'
  createSubscription(priceId, price, plan)
}
</script>

<template>
  <div v-if="userStore.userData.id" class="mx-auto">
    <h2
      class="tablet:font-bold tablet:text-2xl my-7 text-center text-lg font-bold"
    >
      Choose your Subscription!
    </h2>
    <div class="tablet:grid-cols-2 tablet:gap-2 grid">
      <!-- Build your card component -->
      <PlanCard
        title="Standard Plan"
        :amount="0"
        icon1="20 posts daily"
        icon2="5gb"
        @click="standardPlan"
      />
      <PlanCard
        title="Premium Plan"
        :amount="10"
        icon1="4 team members"
        icon2="10gb"
        @click="premiumPlan"
      />
    </div>
  </div>
</template>
