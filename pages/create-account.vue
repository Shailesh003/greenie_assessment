<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto mt-10 flex w-full flex-col border border-gray-200 rounded-lg bg-gray-100 p-8 md:mt-0 md:w-1/2 lg:w-2/6"
    >
      <h2 class="mb-5 text-xl text-center font-bold uppercase">Register</h2>

      <!-- Username input -->
      <div class="relative mb-4">
        <label for="username" class="text-sm leading-7">Username</label>
        <div class="relative">
          <input
            v-model="formData.username"
            @blur="v$.username.$touch()"
            type="text"
            id="username"
            name="username"
            placeholder="johndoe"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
              'border-red-500 focus:border-red-500': v$.username.$error,
              'border-green-500 ': !v$.username.$invalid,
            }"
          />

          <p
            v-if="v$.username.$error"
            class="text-red-500 text-xs mt-1"
          >
            {{ v$.username.$errors[0].$message }}
          </p>
        </div>
      </div>

      <!-- Phone input -->
      <div class="relative mb-4">
        <label for="phone" class="text-sm leading-7">Phone</label>
        <div class="relative">
          <input
            v-model="formData.phone"
            @blur="v$.phone.$touch()"
            type="tel"
            id="phone"
            name="phone"
            placeholder="9898121256"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
              'border-red-500 focus:border-red-500': v$.phone.$error,
              'border-green-500 ': !v$.phone.$invalid,
            }"
          />

          <p
            v-if="v$.phone.$error"
            class="text-red-500 text-xs mt-1"
          >
            {{ v$.phone.$errors[0].$message }}
          </p>
        </div>
      </div>

      <!-- Email input -->
      <div class="relative mb-4">
        <label for="email" class="text-sm leading-7">Email</label>
        <div class="relative">
          <input
            v-model="formData.email"
            @blur="v$.email.$touch()"
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
              'border-red-500 focus:border-red-500': v$.email.$error,
              'border-green-500 ': !v$.email.$invalid,
            }"
          />

          <p
            v-if="v$.email.$error"
            class="text-red-500 text-xs mt-1"
          >
            {{ v$.email.$errors[0].$message }}
          </p>
        </div>
      </div>

      <!-- Password input -->
      <div class="relative mb-4">
        <label for="password" class="text-sm leading-7">Password</label>
        <div class="relative">
          <input
            v-model="formData.password"
            @blur="v$.password.$touch()"
            type="password"
            id="password"
            name="password"
            placeholder="superSecret197#@"
            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
              'border-red-500 focus:border-red-500': v$.password.$error,
              'border-green-500 ': !v$.password.$invalid,
            }"
          />

          <p
            v-if="v$.password.$error"
            class="text-red-500 text-xs mt-1"
          >
            {{ v$.password.$errors[0].$message }}
          </p>
        </div>
      </div>

      <button
        type="submit"
        class="rounded uppercase border-0 bg-blue-500 py-2 px-8 font-bold text-white transition-colors duration-500 hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core"
import { required, email, numeric, minLength, helpers } from '@vuelidate/validators'

import { useUserStore } from "@/stores/users"

const initialFormData = () => ({
  email: '',
  phone: '',
  username: '',
  password: '',
})

const formData = reactive(initialFormData())

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Username is required', required),
      minLength: helpers.withMessage('Username must be at least 3 characters long', minLength(3))
    },

    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email must be valid', email)
    },

    phone: {
      required: helpers.withMessage('Phone is required', required),
      numeric: helpers.withMessage('Phone must be numeric', numeric),
      minLength: helpers.withMessage('Phone must be at least 10 characters long', minLength(10))
    },

    password: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage('Password must be at least 8 characters long', minLength(8))
    }
  }
})

const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  await v$.value.$touch()

  if (v$.value.$invalid) {
    alert('Please recheck the form inputs')

    return
  }

  const store = useUserStore()

  // Make sure the user does not already exist
  const userExists = store.getUsers.some(user => user.email === formData.email) || store.getUsers.some(user => user.phone === formData.phone) || store.getUsers.some(user => user.username === formData.username)

  // If the user already exists, alert the user and return
  if (userExists) {
    alert('User already exists')

    return
  }

  store.addUser(formData)

  // Reset the validation
  v$.value.$reset()

  // Reset the form data
  Object.assign(formData, initialFormData())

  // Alert the user
  alert('User added successfully')
}
</script>
