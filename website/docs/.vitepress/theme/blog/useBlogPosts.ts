import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { useData, useRoute } from 'vitepress';
import type { Post } from './blogPosts.data';
import { data } from './blogPosts.data';

export default () => {
  const allPosts: Ref<Post[]> = ref(data);

  return { allPosts };
};
