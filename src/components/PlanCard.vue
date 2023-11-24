<!-- PlanCard.vue -->

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    icon1: String,
    icon2: String,
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <div class="flex flex-col gap-3 b" @click="handleClick">
    <h2>{{ title }}</h2>
    <p>Amount: ${{ amount }}/month</p>
    <div class="icons">
      <div class="icon">
        {{ icon1 }}
      </div>
      <div class="icon">
        {{ icon2 }}
      </div>
      <button :disabled="amount === 0" type="submit" class="text-underline px-6 py-2">
        <p
          class="rounded-2 px-5 py-2" :class="[amount > 0 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500']"
        >
          Subscribe
        </p>
      </button>
    </div>
  </div>
</template>
