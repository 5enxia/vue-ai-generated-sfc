<script setup lang="ts">
import GeneratedUIContainer from "./GeneratedUIContainer.vue";
import { generateSFC } from "./generate";

const { sfcText, generate, prompt, isLoading } = generateSFC();
</script>

<template>
  <div class="app">
    <header>
      <h1>AI生成Vueコンポーネント</h1>
      <p>作成したいコンポーネントを自然言語で説明してください</p>
    </header>
    
    <main>
      <div class="input-section">
        <textarea 
          v-model="prompt" 
          rows="5" 
          cols="80"
          placeholder="例: ユーザーが名前を入力し、挨拶するシンプルなフォームを作成してください。"
          class="prompt-input"
        />
        <button 
          @click="generate" 
          :disabled="isLoading || !prompt.trim()"
          class="generate-button"
        >
          {{ isLoading ? "生成中..." : "コンポーネント生成" }}
        </button>
      </div>
      
      <GeneratedUIContainer v-if="sfcText" :sfc-text="sfcText" />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

.input-section {
  margin-bottom: 30px;
}

.prompt-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 15px;
}

.generate-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.generate-button:hover:not(:disabled) {
  background: #369870;
}

.generate-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>