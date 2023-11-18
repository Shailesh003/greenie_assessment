<template>
  <div class="app">
    <div class="navigation bg-blue-500 text-white">
      <div class="container mx-auto flex justify-between items-center px-4 py-4">
        <NuxtLink to="/">
          App
        </NuxtLink>

        <div class="flex justify-center items-center">
          <NuxtLink to="/create-account" class="mr-4 underline">
            Create Account
          </NuxtLink>

          <NuxtLink to="/user-details" class="underline">
            User Details
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6">
      <NuxtPage />
    </div>
  </div>
</template>
