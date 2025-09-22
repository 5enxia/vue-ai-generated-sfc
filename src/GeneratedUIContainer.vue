<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import * as Vue from "vue";
// @ts-ignore
import { loadModule } from "vue3-sfc-loader";

const props = defineProps<{
  sfcText: string;
}>();

const GeneratedSfc = computed(() => {
  const options = {
    moduleCache: { vue: Vue },
    getFile: () => props.sfcText,
    addStyle(textContent: any) {
      const style = Object.assign(document.createElement("style"), {
        textContent,
      });
      const ref = document.head.getElementsByTagName("style")[0] || null;
      document.head.insertBefore(style, ref);
    },
  };

  return defineAsyncComponent(() => loadModule("GeneratedSfc.vue", options));
});
</script>

<template>
  <div class="container">
    <div class="preview">
      <GeneratedSfc />
    </div>
    <details class="source-code">
      <summary>生成されたソースコード</summary>
      <pre><code>{{ sfcText }}</code></pre>
    </details>
  </div>
</template>

<style scoped>
.container {
  margin: 20px 0;
}

.preview {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.source-code {
  margin-top: 20px;
}

.source-code pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
