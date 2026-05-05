<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <Toast />

    <Card class="w-full max-w-2xl shadow-xl">
      <template #title>
        <div class="text-center text-2xl font-bold">
          Autenticação
        </div>
      </template>

      <template #content>
        <TabView>
          <TabPanel header="Login">
            <LoginForm />
          </TabPanel>

          <TabPanel header="Criar Conta">
            <RegisterForm />
          </TabPanel>
        </TabView>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Card from "primevue/card"
import TabView from "primevue/tabview"
import TabPanel from "primevue/tabpanel"
import Toast from "primevue/toast"
import LoginForm from "../../components/auth/LoginForm.vue"
import RegisterForm from "../../components/auth/RegisterForm.vue"

export default defineComponent({
  name: "AuthView",
  components: {
    Card,
    TabView,
    TabPanel,
    Toast,
    LoginForm,
    RegisterForm
  }
})
</script>
