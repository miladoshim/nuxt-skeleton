<template>
  <UContainer>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <UAuthForm :schema="schema" :fields="fields" title="Forgot your Password?!" icon="i-lucide-lock"
          @submit="onSubmit">
          <template #description>
            Do you have remember your password? <ULink to="/auth/login" class="text-primary font-medium">Login</ULink>.
          </template>
        </UAuthForm>
      </UPageCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { useAuthStore } from "~/stores/auth.store";

const toast = useToast()

const errorMessage = ref("")
const isLoading = ref(false)
const authStore = useAuthStore();
const { login } = authStore;

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}]

const schema = z.object({
  username: z.string('Invalid username'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  remember: z.boolean('')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)

  try {
    const response = await $fetch("/auth/login", {
      body: {
        "username": payload.data.username,
      }
    })
    console.log(response)
    const token = response.data.token
    localStorage.setItem('token', token)
    console.log("Login Token saved ....")
  } catch (error) {
    console.error(error)
  } finally { }
}
</script>
