<template>
  <h3 class="types-viewer-name">{{ types[type].declaration.name }}</h3>
  <FormattedTypeString :type="types[type].declaration.type" :types="types" />
  <table v-if="types[type].declaration.properties.length > 0">
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr v-for="prop in types[type].declaration.properties">
      <td>{{ prop.name }}</td>
      <td>
        <FormattedTypeString :type="prop.type" :types="types" />
      </td>
      <td>{{ prop.description }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import FormattedTypeString from './FormattedTypeString.vue';

const { type, types } = defineProps({ type: String, types: Object });
if (!types[type]) {
  throw new Error(`Unable to render type ${type} view. Probably you forgot to add
\<script setup\>
  import { data as types } from '@types.data.ts';
\</script\> to the end of markdown file that contains <TypesView type="${type}" :types={...types} />`)
}
</script>