<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" :fields="fields" title="Welcome back!" icon="i-lucide-lock" @submit="onSubmit">
        <template #description>
          Don't have an account? <ULink to="/auth/register" class="text-primary font-medium">Register</ULink>.
        </template>
        <template #password-hint>
          <ULink to="/auth/forgot-password" class="text-primary font-medium" tabindex="-1">Forgot password?</ULink>
        </template>
        <template #footer>
          By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
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
  name: 'username',
  type: 'text',
  label: 'Username',
  placeholder: 'Enter your username',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
},
{
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
},]

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
