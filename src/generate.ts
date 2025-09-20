import { GoogleGenAI } from "@google/genai";
import { ref } from "vue";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEN_AI_API_KEY,
});

export const generateSFC = () => {
  const prompt = ref(
    "ユーザーが名前を入力し、挨拶するシンプルなフォームを作成してください。"
  );
  const sfcText = ref("");
  const isLoading = ref(false);

  async function generate() {
    if (!prompt.value.trim()) return;
    
    sfcText.value = "";
    isLoading.value = true;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt.value,
        config: {
          systemInstruction: `あなたは熟練したVue 3 + TypeScriptのフロントエンドエンジニアです。以下の制約に従い、ユーザー指示を満たす単一のVue Single File Component (SFC)を1つだけ出力してください。

制約事項:
- 出力はSFCのソースコードのみ。説明文・マークダウン・コードフェンスは出力しない
- Composition APIを<script setup lang="ts">で使用し、TypeScriptで型を明示する
- 追加の依存ライブラリは使用しない。自己完結し、そのままビルド可能なコードにする
- UIテキストは日本語を使用する
- 不明点は合理的に補完して、最低限動作する実装にする
- 不要なコメントやログ、外部API呼び出しは含めない`,
        },
      });
      
      const text = response.text;
      sfcText.value = text?.trim?.() ?? "";
    } catch (err) {
      console.error("SFC生成エラー:", err);
      sfcText.value = "// エラーが発生しました。APIキーを確認してください。";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    prompt,
    sfcText,
    generate,
    isLoading,
  };
};