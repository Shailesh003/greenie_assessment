<template>
  <div class="text-center">
    <p>
      Welcome to the dashboard!
    </p>

    <p class="mt-2">
      Please visit an option:
    </p>

    <div class="mt-4">
      <button class="bg-blue-500 text-white rounded-md px-3 py-2">
        <NuxtLink to="/user-details">
          User Details
        </NuxtLink>
      </button>
    </div>

    <div class="mt-2">
      <button class="bg-blue-500 text-white rounded-md px-3 py-2">
        <NuxtLink to="/create-account">
          Create Account
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
