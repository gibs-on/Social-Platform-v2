<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import { usePostStore } from '../../store/posts'

const viewedPostCount = ref(0)

saveLocally('count', viewedPostCount.toString())

function saveLocally(name, value) {
  // Save count and today's date to local storage
  localStorage.setItem(name, value)
  // alert('Count and today\'s date saved locally!');
}

// Retrieve count and today's date from local storage
// const count = ref(Number.parseInt(localStorage.getItem('count')) || 0)
// const today = ref(localStorage.getItem('today') || 'No date stored locally')

const router = useRouter()
const authStore = useAuthStore()
const postStore = usePostStore()

const showPaywall = ref(false)
const { isAuthenticated, isPremium } = storeToRefs(authStore)
const { posts } = storeToRefs(postStore)

watch((viewedPostCount) => {
  if (countGreaterThan20(viewedPostCount.value)) {
    if (isAuthenticated) {
      if (isPremium) {
        //
      }
    }
  }
})

function toggleShowPaywall() {
  if (isAuthenticated) {
    if (isPremium)
      showPaywall.value = false

    else
      showPaywall.value = true
      setTimeout(() => {
        showSubscriptions()
      }, 1000);
  }
}

function showSubscriptions() {
  router.push('/plans')
}

async function showPost(post) {
  await postStore.setSelectedPostId(post)
  router.push('/posts')
}

function countGreaterThan20(count) {
  return count > 20
}

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <div class="flex justify-between px-5 pt-7 lg:justify-end md:px-10">
    <img src="/asset/hamburger.png" class="block lg:hidden" alt="">
    <div class="flex items-center">
      <img src="favicon.svg" class="h-10 b rounded-full p-1" alt="">
      <div v-if="isAuthenticated" class="ml-5 hidden md:block">
        <p class="font-light">
          John Doe
        </p>
        <p class="text-sm font-light text-slate-400">
          Hello world!
        </p>
      </div>
      <div v-else class="ml-5 hidden md:block">
        <router-link to="login">
          Login
        </router-link>
      </div>
    </div>
  </div>

  <div class="m-auto lg:w-[80vw]">
    <div class="ml-5 mt-10 b pb-14 md:ml-10">
      <p class="m-3 text-left text-2xl font-bold">
        Todays Posts for you
      </p>

      <div class="px-5">
        <div v-for="post in posts" :key="post.id" class="mt-4 w-[50vw] flex">
          <!-- <router-link class="flex" :to="{ path: 'posts', params: { id: post.id } }"> -->
          <div class="flex" @click="showPost(post)">
            <img
              src="/favicon.svg" class="aspect-ratio-[1.5/1] h-[110px] border rounded-xl object-contain object-center"
              alt=""
            >
            <div class="ml-4 mt-1 flex flex-col justify-between">
              <p class="text-left text-lg font-medium">
                {{ post.title }}
              </p>
              <div class="mb-3 flex items-center">
                <p class="mr-3 text-sm font-normal text-[#FF6A64]">
                  Read More
                </p>
                <img src="/asset/arrow-orange-right.png" class="w-[30px]" alt="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="posts.length" class="mt-10 w-full flex">
          <!-- <p class="bg-orange-100 text-left text-lg font-medium text-orange-500">
            You have reached the end of todays posts for you to view more login and select a plan
          </p> -->
          <button type="submit" class="text-underline px-6 py-2">
            <p
              class="rounded-10 bg-orange-100 px-5 py-2 text-orange-600"
              @click="toggleShowPaywall()"
            >
              Load more
            </p>
          </button>
        </div>
        <div v-if="showPaywall">
          <p>You have exceeded your free limit. Please subscribe to continue.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- end table start -->
</template>
