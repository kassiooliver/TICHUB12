<template>
  <form class="space-y-4 mt-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block mb-2 font-medium">E-mail</label>
      <InputText
        v-model="form.email"
        class="w-full"
        :class="{ 'p-invalid': v$.email.$error }"
      />
      <small v-if="v$.email.$error" class="text-red-500 block mt-1">
        E-mail invalido
      </small>
    </div>

    <div>
      <label class="block mb-2 font-medium">Senha</label>
      <Password
        v-model="form.password"
        toggleMask
        :feedback="false"
        class="w-full"
        inputClass="w-full"
        :class="{ 'p-invalid': v$.password.$error }"
      />
      <small v-if="v$.password.$error" class="text-red-500 block mt-1">
        A senha deve ter no minimo 6 caracteres
      </small>
    </div>

    <Button
      type="submit"
      label="Entrar"
      class="w-full"
      :loading="auth.loading"
      :disabled="auth.loading"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useToast } from "primevue/usetoast"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from "primevue/button"
import useVuelidate from "@vuelidate/core"
import { email, minLength, required } from "@vuelidate/validators"
import { useAuthStore } from "../../stores/auth"
import { useShop } from "../../composables/useShop"

export default defineComponent({
  name: "LoginForm",
  components: { InputText, Password, Button },

  setup() {
    const auth = useAuthStore()
    const shop = useShop()
    const toast = useToast()
    const route = useRoute()
    const router = useRouter()

    const form = reactive({
      email: "",
      password: ""
    })

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }

    const v$ = useVuelidate(rules, form)

    async function handleSubmit() {
      const valid = await v$.value.$validate()

      if (!valid) {
        return
      }

      try {
        await auth.login({
          email: form.email,
          password: form.password
        })
        await shop.loadCart()

        toast.add({
          severity: "success",
          summary: "Sucesso",
          detail: "Login realizado com sucesso!",
          life: 3000
        })

        router.push(typeof route.query.redirect === "string" ? route.query.redirect : "/")
      } catch {
        toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Credenciais invalidas.",
          life: 3000
        })
      }
    }

    return {
      auth,
      form,
      v$,
      handleSubmit
    }
  }
})
</script>
