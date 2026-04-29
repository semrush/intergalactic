<template>
  <h3 :id="typeDefinition.declaration.name.toLowerCase().replace(/\s+/g, '-')">
    {{ typeDefinition.declaration.name }}
    <a
        class="header-anchor"
        :href="`#${typeDefinition.declaration.name.toLowerCase().replace(/\s+/g, '-')}`"
        :aria-label="`Permalink to &quot;${typeDefinition.declaration.name}&quot;`"
    >
      &ZeroWidthSpace;
    </a>
  </h3>
  <FormattedTypeString :type="typeDefinition.declaration.type" :types="types" />
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

  <div class="types-union-properties" v-if="Array.isArray(lastType)">
    <b>OR</b>
    <br/>
    <FormattedTypeString :type="lastType" :types="types" />
  </div>

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

type SerializeType = {
  filePath: string;
  dependencies: Array<string>;
  declaration: {
    name: string;
  };
};

type Tree = {
  types: Record<string, SerializeType>;
  ns?: {
    [key: string]: Tree;
  };
}

function getValueFromNamespace(root: Tree, key: string) {
  let [,...rest] = key.split(".");
  let value = root;

  while (rest.length !== 0) {
    const [firstPart, ...restParts] = rest;

    if (value.types[firstPart] && restParts.length === 0) {
      return value.types[firstPart];
    } else if (value.ns?.[firstPart]) {
      value = value.ns[firstPart];
      rest = restParts;
    }
  }
}

const { type, types } = defineProps({ type: String, types: Object });

let typeDefinition = types[type];

const isNSType = type && type.includes('.');

if (isNSType) {
  const [nsName] = type.split('.');

  if (types[nsName]) {
    typeDefinition = getValueFromNamespace(types[nsName], type)
  }
}

const filteredProperties = typeDefinition.declaration.properties.flat(1).filter((property) => {
  return !property.params?.internal && !property.description?.startsWith('Internal');
});

let lastType = undefined;
let unionProperties = undefined;

if (Array.isArray(typeDefinition.declaration.type)) {
  const t = typeDefinition.declaration.type;
  if (typeof t[0] === 'string' && t[0]?.includes('keyof') && t[1]?.referenceTo) {
    if (t[2]?.includes('as `')) {

      let nestedType: any;

      for (const s of Object.values(types)) {
        if (s.declaration?.name === t[1].referenceTo) {
          nestedType = s.declaration;
          break;
        }

        if (nestedType) {
          break;
        }
      }

      if (nestedType && nestedType.properties) {
        const prefix = t[2].match(/as `(\w+):/);

        t.push({
          properties: nestedType.properties.map((prop: any) => {
            return {
              ...prop,
              name: `${prefix[1]}:${prop.name}`,
            };
          }),
        });
      }
      if (nestedType && nestedType.type) {
        t.push(nestedType.type);
      }


    }
  }

  lastType = typeDefinition.declaration.type[typeDefinition.declaration.type.length - 1];
  unionProperties = typeDefinition.declaration.type.find((t) => Boolean(t.properties));
}

if (!typeDefinition) {
  throw new Error(`Unable to render type ${type} view. Probably you forgot to add
\<script setup\>
  import { data as types } from '@types.data.ts';
\</script\> to the end of markdown file that contains <TypesView type="${type}" :types={...types} />`)
}
</script>
