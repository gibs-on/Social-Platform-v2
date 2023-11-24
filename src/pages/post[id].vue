<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePostStore } from '../../store/posts'

const route = useRoute()

const postStore = usePostStore()

const { post } = storeToRefs(postStore)

onMounted(() => {
  postStore.fetchPostById(route.params.id)
  // console.log(route.params.id)
  post.value = postStore.post
})
</script>

<template>
  <div class="mx-auto min-h-[100vh] w-[50%] b">
    <div class="mt-5 flex">
      <div class="ml-4 mt-1 flex flex-col justify-between">
        <img
          src="favicon.svg" class="object-fit h-[110px] w-[200px] b rounded-xl object-center"
          alt=""
        >
        <p class="my-5 text-5xl font-bold">
          {{ post.title }}
        </p>

        <hr>

        <div class="mt-5 flex">
          <p class="m-3 text-left text-lg font-normal text-gray-500">
            {{ post.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
