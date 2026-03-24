<template>
  <h3 :id="types[type].declaration.name.toLowerCase().replace(/\s+/g, '-')">
    {{ types[type].declaration.name }}
    <a
        class="header-anchor"
        :href="`#${types[type].declaration.name.toLowerCase().replace(/\s+/g, '-')}`"
        :aria-label="`Permalink to &quot;${types[type].declaration.name}&quot;`"
    >
      &ZeroWidthSpace;
    </a>
  </h3>
  <FormattedTypeString :type="types[type].declaration.type" :types="types" />
  <table v-if="filteredProperties.length > 0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in filteredProperties" >
        <td :class="{ 'types-deprecated-property-name': prop.params.deprecated }">{{ prop.name }}</td>
        <td>
          <FormattedTypeString :type="prop.type" :types="types" />
        </td>
        <td>
          <span v-if="prop.params.deprecated" class="types-deprecated-tag">Deprecated</span>
          {{ prop.description }}
        </td>
      </tr>
    </tbody>
  </table>

  <div class="types-union-properties" v-if="typeof unionProperties === 'object' && unionProperties.properties && unionProperties.properties.length > 0">
    <b>OR</b>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="prop in unionProperties.properties" >
        <td :class="{ 'types-deprecated-property-name': prop.params.deprecated }">{{ prop.name }}</td>
        <td>
          <FormattedTypeString :type="prop.type" :types="types" />
        </td>
        <td>
          <span v-if="prop.params.deprecated" class="types-deprecated-tag">Deprecated</span>
          {{ prop.description }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import FormattedTypeString from './FormattedTypeString.vue';

const { type, types } = defineProps({ type: String, types: Object });

const filteredProperties = types[type].declaration.properties.filter((property) => {
  return !property.params.internal && !property.description.startsWith('Internal');
});

const unionProperties = Array.isArray(types[type].declaration.type) ? types[type].declaration.type[types[type].declaration.type.length - 1] : undefined;

if (!types[type]) {
  throw new Error(`Unable to render type ${type} view. Probably you forgot to add
\<script setup\>
  import { data as types } from '@types.data.ts';
\</script\> to the end of markdown file that contains <TypesView type="${type}" :types={...types} />`)
}
</script>
