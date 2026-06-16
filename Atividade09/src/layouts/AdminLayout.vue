<template>
  <div class="grid grid-cols-12 min-h-screen bg-gray-100">
    <aside class="col-span-12 md:col-span-3 lg:col-span-2 bg-gray-900 text-white p-4">
      <h2 class="text-2xl font-bold mb-6">
        Painel Admin
      </h2>

      <nav class="flex flex-col gap-2">
        <router-link
          to="/admin"
          class="block p-3 rounded bg-gray-800 hover:bg-gray-700 transition"
        >
          Dashboard
        </router-link>

        <router-link
          to="/"
          class="block p-3 rounded bg-gray-800 hover:bg-gray-700 transition"
        >
          Voltar para Loja
        </router-link>
      </nav>
    </aside>

    <main class="col-span-12 md:col-span-9 lg:col-span-10 p-6">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AdminLayout"
})
</script>
