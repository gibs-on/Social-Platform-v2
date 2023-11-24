<!-- PlanCard.vue -->

<template>
  <div class="plan-card" @click="handleClick">
    <h2>{{ title }}</h2>
    <p>Amount: ${{ amount }}/month</p>
    <div class="icons">
      <div class="icon">{{ icon1 }}</div>
      <div class="icon">{{ icon2 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    icon1: String,
    icon2: String
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.plan-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
}

.icons {
  display: flex;
  justify-content: space-between;
}

.icon {
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
