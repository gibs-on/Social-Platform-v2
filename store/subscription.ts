
import { defineStore } from 'pinia'
import axios from 'axios'

interface PlanData {
  subscriptionId: string
  clientSecret: string
}

interface PlanChose {
  plan: string
  price: string
}

const url = '/stripe'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    planData: {} as PlanData,
    planChose: {} as PlanChose
  }),
  actions: {
    async createSubscription(
      customerId: string | null,
      priceId: string | undefined,
      price: string,
      plan: string
    ) {
      try {
        const res = await axios.post(`${url}/create-subscription`, {
          customerId,
          priceId
        })
        if (res.status === 200) {
          this.planData = res.data
          planChose = { plan, price }
          return this.planData
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
