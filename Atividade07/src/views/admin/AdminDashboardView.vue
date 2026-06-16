<template>
  <Card>
    <template #title>Painel Administrativo</template>
    <template #content>
      <p>Área restrita para usuários ADMIN.</p>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Card from "primevue/card"

export default defineComponent({
  components: { Card }
})
</script>
