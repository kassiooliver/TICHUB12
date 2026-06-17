<template>
  <form class="space-y-4 mt-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block mb-2 font-medium">Nome</label>
      <InputText
        v-model="form.username"
        class="w-full"
        :class="{ 'p-invalid': v$.username.$error }"
      />
      <small v-if="v$.username.$error" class="text-red-500 block mt-1">
        Nome obrigatório
      </small>
    </div>

    <div>
      <label class="block mb-2 font-medium">E-mail</label>
      <InputText
        v-model="form.email"
        class="w-full"
        :class="{ 'p-invalid': v$.email.$error }"
      />
      <small v-if="v$.email.$error" class="text-red-500 block mt-1">
        E-mail inválido
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
        A senha deve ter no mínimo 6 caracteres
      </small>
    </div>

    <div>
      <label class="block mb-2 font-medium">Confirmar Senha</label>
      <Password
        v-model="form.confirmPassword"
        toggleMask
        :feedback="false"
        class="w-full"
        inputClass="w-full"
        :class="{ 'p-invalid': v$.confirmPassword.$error }"
      />
      <small v-if="v$.confirmPassword.$error" class="text-red-500 block mt-1">
        As senhas não coincidem
      </small>
    </div>

    <Button
      type="submit"
      label="Criar Conta"
      class="w-full"
      :loading="auth.loading"
      :disabled="auth.loading"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "primevue/usetoast"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from "primevue/button"
import useVuelidate from "@vuelidate/core"
import { email, minLength, required } from "@vuelidate/validators"
import { useAuthStore } from "../../stores/auth"
import { useShop } from "../../composables/useShop"

export default defineComponent({
  name: "RegisterForm",
  components: { InputText, Password, Button },

  setup() {
    const auth = useAuthStore()
    const shop = useShop()
    const toast = useToast()
    const router = useRouter()

    const form = reactive({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    const rules = {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required }
    }

    const v$ = useVuelidate(rules, form)

    async function handleSubmit() {
      const valid = await v$.value.$validate()

      if (!valid) {
        return
      }

      if (form.password !== form.confirmPassword) {
        toast.add({
          severity: "error",
          summary: "Erro",
          detail: "As senhas nao coincidem.",
          life: 3000
        })
        return
      }

      try {
        await auth.register({
          username: form.username,
          email: form.email,
          password: form.password
        })
        await shop.loadCart()

        toast.add({
          severity: "success",
          summary: "Sucesso",
          detail: "Conta criada com sucesso!",
          life: 3000
        })

        router.push("/")
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Erro",
          detail: error instanceof Error ? error.message : "Nao foi possivel criar a conta.",
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
