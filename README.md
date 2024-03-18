# React + Vite + jsx

## vite 에서 eslint 설치하기
> npm install eslint  vite-plugin-eslint eslint-comfig-react-app --save-dev

> /////// 여기 적용하면 이상해짐

> .eslintrc.json 파일 생성 package.json 있는 위치에

> 위파일 내용에 {"extends": "react-app"} 추가

> /////////////////////////////////////

>> 서버 다시 실행 하면 적용됨


> vite.config.js 파일에서 import

> 
```ecmascript 6
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
```

> intellij에는 이미 .eslintrc.cjs 파일이 있는 걸로봐서 이미 적용된 듯한데... 

## world wide travel web
### 가상으로 log in 하고
### 지도에서 위치를 차고, 도시, 나라...
### 라우터를 이용해서 url로 이동하고
## 기타 다른 기능을 vite를 이용해서 사용하는 앱입니다.

# react router 적용
>> npm i react-router-dom@6 // 나중에 최신 버젼으로...
 
>  npm i react-leaflet leaflet

> react map 관련 가장 많이 사용하는 library 