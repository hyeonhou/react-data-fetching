// eslint.config.js

import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // JS, JSX, TS, TSX 파일에 대한 모든 설정을 이 하나의 객체에 통합!
  {
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"], // `src` 폴더 안으로 범위를 좁히는 걸 추천

    // 이 설정 객체에서 사용할 플러그인을 명시
    plugins: {
      react: pluginReact,
    },

    // 이 파일들이 어떤 환경과 문법을 쓰는지 명시
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 환경
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 문법 사용
        },
      },
    },

    // 적용할 규칙들을 순서대로 명시
    rules: {
      // 1. ESLint의 기본 추천 규칙을 먼저 깔아준다
      ...js.configs.recommended.rules,
      // 2. 그 위에 리액트의 추천 규칙을 덮어쓴다
      ...pluginReact.configs.flat.recommended.rules,

      // 3. 우리만의 커스텀 규칙으로 최종 마무리!
      "react/react-in-jsx-scope": "off", // 최신 리액트에선 불필요
      "react/prop-types": "off", // prop-types 사용 안 할 경우

      // ★★★ 'defined but never used' 에러를 해결하는 핵심 규칙 ★★★
      // 리액트 추천 규칙에 이미 포함되어 있지만, 확실하게 하기 위해 한 번 더 명시
      "react/jsx-uses-vars": "error",
    },

    settings: {
      react: {
        version: "detect", // 설치된 리액트 버전 자동 감지
      },
    },
  },

  // Prettier 설정은 여전히 맨 마지막에 둬서 스타일 충돌을 막는다.
  eslintConfigPrettier,
];
