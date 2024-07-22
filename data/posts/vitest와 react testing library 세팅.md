vite + react 환경에서 vitest와 react testing library로 테스트 환경을 세팅해보았다.

## 프로젝트 준비

본격적인 테스트 환경 세팅을 위한 프로젝트를 준비한다. 나의 경우에는 pnpm을 사용하여 react + ts 프로젝트를 생성해주었다. 이후 명령어는 모두 pnpm로 작성하였다.

```sh
pnpm create vite [프로젝트명] --template react-ts
```

## 테스트 환경 세팅하기

### Vitest 세팅

#### 1. 라이브러리 설치

```sh
pnpm add -D vitest
```

#### 2. package.json에 스크립트 추가

이후 `package.json`에 스크립트를 추가한다.

```json
  "scripts": {
		...
		"test": "vitest",
        "test:run": "vitest run"
  },
```

`test` 를 사용하면 watch 모드로 테스트가 실행되고, `test:run` 을 사용하면 일회성으로 테스트가 실행된다.

간단한 함수를 작성한 후 테스트 해보면 테스트가 잘 통과되는 것을 확인할 수 있다.

```js
// sum.js

export function sum(a, b) {
  return a + b;
}
```

```js
// sum.test.js

import { expect, test } from "vitest";
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

vitest는 주로 유틸리티 함수 테스트에 사용된다. 컴포넌트 테스팅을 위해서는 DOM 조작과 렌더링이 필요하기 때문에 추가적인 라이브러리를 설치해야한다. 이어지는 내용에서의 jsdom과 react testing library가 그 역할을 한다.

### React Testing Library 세팅

#### 1. 라이브러리 설치

```sh
pnpm add -D jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/react-hooks
```

위의 명령어를 실행하여 사용할 라이브러리를 설치한다.

‘dom’이 붙은 라이브러리가 두 가지인데, 각각의 역할은 아래와 같다.

- `jsdom` 은 브라우저와 유사한 DOM 요소를 사용할 수 있게 해주는 라이브러리이다. 브라우저 없이도 DOM 관련 테스트를 수행 할 수 있도록 도와준다.
- `@testing-library/jest-dom` 은 DOM 관련 상태를 더 명확하게 테스트할 수 있는 매처(matcher)을 제공한다. jest-dom을 이용하면 `toBeInTheDocument` 나 `toHaveTextContent` 와 같이 더 직관적인 메서드를 사용할 수 있다.

#### 2. setup file 추가

프로젝트 최상단에 setup file을 추가해준다. 나의 경우 `vitest-setup.ts` 로 생성하였다. 해당 파일은 cleanup 함수를 호출하여 DOM 상태를 초기화 해주는 코드이다. 초기화를 통해 메모리 누수와 테스트 코드 간 간섭을 방지할 수 있다.

vitest 설정에서 속성을 추가하여 해당 파일을 매 테스트 이전에 실행하도록 해준다. (3번)

```js
// vitest-setup.ts

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

`import '@testing-library/jest-dom/vitest';` 는 jest-dom의 확장 매처를 vitest 환경에서 사용할 수 있게 하는 설정이다. set up 파일에 작성하면 매 테스트 마다 자동으로 실행되기 때문에 한 번만 작성해주면 된다.

#### 3. vitest 설정 변경

vite 설정 파일에 아래와 같은 설정을 추가한다. 이 글의 예시와 같이 vitest의 설정을 vite의 `defineConfig` 안의 `test` 에서 명시하고 싶다면, 가장 첫줄에 있는 triple slash command를 포함해주어야 한다. 이 코드는 `defineConfig` 가 vitest의 타입을 참조할 수 있도록 도와준다. 해당 라인을 지우면 `test` 에 대한 타입을 찾을 수 없다는 오류 메시지가 발생한다.

만약 이 글과 다르게 vitest 설정 파일을 분리하고 싶다면 [[공식문서]](https://vitest.dev/config/file#managing-vitest-config-file)를 따른다.

```js
// vite.config.ts

/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	...
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.ts",
  },
});

```

- `environemnt` 는 테스트가 실행될 환경을 의미한다. jsdom을 사용하여 테스트 할 것이므로 jsdom으로 설정해주었다.
- `globals` 는 vitest api를 전역으로 사용할 수 있도록 해준다. 기본값은 false이다. 해당 속성을 true로 할 경우 test api를 사용 할 때 일일이 import문을 작성하지 않아도 된다. 타입스크립트의 경우, 아래 `tsconfig.json`에서 타입을 추가해주어야 한다. (4번)
- `setupFiles` 는 setup files의 경로를 명시하는 속성이다. 테스트 파일이 실행되기 전에 명시된 setup file들이 먼저 실행 된다. 앞에서 추가한 setup files의 경로를 명시해주면 된다.

#### 4. tsconfig.json 설정 변경

```json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src", "./vitest-setup.ts"]
}
```

- `vitest/globals` : 타입스크립트에서 global API를 사용하기 위해서는 vitest 설정 외에도 `tsconfig.json` 에 타입 필드를 추가해주어야한다.
- `./vitest-setup.ts` : src 하위 경로가 아닌 최상위 경로에 set-up 파일을 만든 경우, 타입스크립트가 setup file을 읽을 수 없기 때문에 해당 파일 내부의 `import '@testing-library/jest-dom/vitest';` 부분이 실행되지 못한다. 그로 인해 jest-dom API를 사용한 테스트 코드가 있다면 에러가 발생한다. 해당 경로를 추가하여, 타입스크립트가 setup file을 읽을 수 있도록 하자.
