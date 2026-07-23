<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schemaStepOne" :fields="stepOneFields" title="Register" icon="i-lucide-lock"
        @submit.prevent="onStepOneSubmit" v-if="formStep == 1">
        <template #description>
          Do you have an account? <ULink to="/auth/login" class="text-primary font-medium">Login</ULink>.
        </template>
        <template #footer>
          By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>

      <UAuthForm :schema="schemaStepTwo" :fields="stepTwoFields" title="Verify OTP Password" icon="i-lucide-lock"
        @submit.prevent="onStepTwoSubmit" v-if="formStep == 2">
        <template #footer>
          By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>


      <UAuthForm :schema="schemaStepThree" :fields="stepThreeFields" title="Complete Registration" icon="i-lucide-lock"
        @submit.prevent="onStepThreeSubmit" v-if="formStep == 3">
      </UAuthForm>
    </UPageCard>



  </div>
</template>


<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()
const formStep = ref(1);
const showResendButton = ref(false);
const isLoading = ref(false);
const isVerifying = ref(false);
const error = ref(null)


const stepOneFields: AuthFormField[] = [{
  name: 'mobile',
  type: 'text',
  label: 'Mobile Number:',
  placeholder: 'Enter your mobile number',
  required: true
}]

const stepTwoFields: AuthFormField[] = [{
  name: 'otp',
  type: 'otp',
  label: 'OTP',
  length: 6,
  placeholder: '○'
},]

const stepThreeFields: AuthFormField[] = [{
  name: 'firstname',
  type: 'text',
  label: 'FirstName',
  placeholder: 'Enter your first name',
  required: true
}, {
  name: 'lastname',
  label: 'LastName',
  type: 'text',
  placeholder: 'Enter your last name',
  required: true
},
{
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: "Enter you strong password"
}]



const schemaStepOne = z.object({
  mobile: z.string('Invalid mobile'),
})

const schemaStepTwo = z.object({
  mobile: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

const schemaStepThree = z.object({
  mobile: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type SchemaStepOne = z.output<typeof schemaStepOne>
type SchemaStepTwo = z.output<typeof schemaStepTwo>
type SchemaStepThree = z.output<typeof schemaStepThree>

async function onStepOneSubmit(payload: FormSubmitEvent<SchemaStepOne>) {
  console.log('Submitted Step One', payload)

  try {
    isLoading.value = true;
    await $fetch("/api/auth/register_step_one", {
      method: "POST",
      body: {
        mobile: payload.data.mobile
      }
    })

    toast.add({ title: 'OTP', description: 'OTP sent to mobile' })

    formStep.value = 2;
  } catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false;

  }

}

function onStepTwoSubmit(payload: FormSubmitEvent<SchemaStepTwo>) {
  console.log('Submitted', payload)
}

function onStepThreeSubmit(payload: FormSubmitEvent<SchemaStepThree>) {
  console.log('Submitted', payload)
}
</script>
