# print-react-component

[![NPM version](https://img.shields.io/npm/v/print-react-component.svg?style=flat)](https://npmjs.org/package/print-react-component)
[![NPM downloads](http://img.shields.io/npm/dm/print-react-component.svg?style=flat)](https://npmjs.org/package/print-react-component)

Print React components within 10 seconds, demo website available [here](https://bowencool.github.io/print-react-component/). For an explanation of the underlying principles, visit [this link](https://blog.bowen.cool/posts/way-to-print-partial-html-page).

## Usage

```tsx
import { usePrint } from 'print-react-component';
import React from 'react';

export default function Demo() {
  const { holder, printReactNode } = usePrint();
  return (
    <>
      {/* This holder ensures that the content to be printed accurately receives the context values. */}
      {holder}
      <p>Click the button to print a react component</p>
      <button
        type="button"
        onClick={() => {
          printReactNode(
            <article className="prose lg:prose-xl">
              <h1>Garlic bread with cheese: What the science tells us</h1>
              <p>
                For years parents have espoused the health benefits of eating
                garlic bread with cheese to their children, with the food
                earning such an iconic status in our culture that kids will
                often dress up as warm, cheesy loaf for Halloween.
              </p>
              <p>
                But a recent study shows that the celebrated appetizer may be
                linked to a series of rabies cases springing up around the
                country.
              </p>
            </article>,
          );
        }}
      >
        Print
      </button>
    </>
  );
}
```

## API

```ts
import React from 'react';
interface PrintReactNode {
  (
    /** content you want to print */
    content: React.ReactNode,
    /** options you want to custom */
    options?: {
      /** document title when printing */
      title?: string;
    },
  ): Promise<void>;
}
type ContainerOptions = {
  /** className you want to attach to the content */
  className?: string;
};
export declare function usePrint({ className }?: ContainerOptions): {
  /** This holder ensures that the content to be printed accurately receives the context values. */
  holder: React.ReactElement;
  /** Print ReactNode directly */
  printReactNode: PrintReactNode;
};
export {};
```

## LICENSE

MIT
