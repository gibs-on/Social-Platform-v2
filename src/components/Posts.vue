<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '../stores/posts'

const postStore = usePostStore()

// const posts = ref([]);
const { posts } = storeToRefs(postStore)

onMounted(() => {
  postStore.fetchPosts()
  posts.value = postStore.posts
})

<template>
  <div class="pb-16">
    <p class="ml-10 mt-5 text-2xl font-normal">Posts</p>

    <p class="ml-3 mt-10 w-max cursor-pointer rounded-xl bg-[#f38f70] px-6 py-3 text-white md:ml-10">Create New Post</p>

    {/* table posts */}
    {/* <div class="ml-10 mt-10 flex">
    <div class="flex flex-col">
        <div class="w-full">
            <div class="border-b border-gray-200 shadow">
                <table class="divide-y divide-gray-300 ">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                No
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Title
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Edit
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-300">
                        <tr class="whitespace-nowrap">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    Ketika Anjime Biklek Pov
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                            </td>
                        </tr>
                        <tr class="whitespace-nowrap">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    Warga Kota Anjime Menjadi Konteks
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                            </td>
                        </tr>
                        <tr class="whitespace-nowrap">
                            <td class="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                    Gwej Raja Satir
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
 */}
    <div class="mx-3 mt-10 md:mx-0 md:ml-10">
      <table class="border border-[#f38f70]">
        <thead class="bg-[#f38f70]">
          <tr>
            <th class="border-r px-2 py-3 font-medium text-white md:px-5">No</th>
            <th class="border-r px-5 py-3 font-medium text-white lg:w-[200px] md:w-[180px] xl:w-[300px]">Title</th>
            <th class="border-r px-5 py-3 font-medium text-white md:w-[200px] xl:w-[270px]">Tags</th>
            <th class="px-5 py-3 font-medium text-white">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-[#f38f70]">
            <td class="border-r py-4 text-center">1</td>
            <td class="border-r pl-3">Top Waifu Lonet</td>
            <td class="flex flex-wrap items-center border-r pb-2 pl-3">
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">anime</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Waifu</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Wibu</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">BDSM</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Stres</p>
            </td>
            <td class="px-3 text-center">
              <p class="rounded-full bg-blue-400 px-3 py-2 text-xs font-medium md:mr-3 md:inline md:px-7 md:text-base"><a href="">Edit</a></p>
              <p class="mt-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white md:mt-0 md:inline md:px-7 md:text-base"><a href="">Delete</a></p>
            </td>
          </tr>
          <tr class="border-b border-[#f38f70]">
            <td class="border-r py-4 text-center">2</td>
            <td class="border-r pl-3">Mengenal MEVN</td>
            <td class="flex flex-wrap items-center border-r pb-2 pl-3">
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">MongoDB</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Express Js</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Vue Js</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Node Js</p>
            </td>
            <td class="px-3 text-center">
              <p class="rounded-full bg-blue-400 px-3 py-2 text-xs font-medium md:mr-3 md:inline md:px-7 md:text-base"><a href="">Edit</a></p>
              <p class="mt-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white md:mt-0 md:inline md:px-7 md:text-base"><a href="">Delete</a></p>
            </td>
          </tr>
          <tr class="border-b border-[#f38f70]">
            <td class="border-r py-4 text-center">3</td>
            <td class="border-r pl-3">Cara Menjadi Raja Psatir No Root</td>
            <td class="flex flex-wrap items-center border-r pb-2 pl-3">
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">meme</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">Satir</p>
            </td>
            <td class="px-3 text-center">
              <p class="rounded-full bg-blue-400 px-3 py-2 text-xs font-medium md:mr-3 md:inline md:px-7 md:text-base"><a href="">Edit</a></p>
              <p class="mt-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white md:mt-0 md:inline md:px-7 md:text-base"><a href="">Delete</a></p>
            </td>
          </tr>
          <tr class="border-b border-[#f38f70]">
            <td class="border-r py-4 text-center">4</td>
            <td class="border-r pl-3">Belajar SEO Website</td>
            <td class="flex flex-wrap items-center border-r pb-2 pl-3">
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">SEO</p>
              <p class="mr-2 mt-2 w-max rounded-full bg-[#f38f70] px-4 py-2 text-xs text-white">tips web</p>
            </td>
            <td class="px-3 text-center">
              <p class="rounded-full bg-blue-400 px-3 py-2 text-xs font-medium md:mr-3 md:inline md:px-7 md:text-base"><a href="">Edit</a></p>
              <p class="mt-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white md:mt-0 md:inline md:px-7 md:text-base"><a href="">Delete</a></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* end table posts */}

  </div>
</template>
