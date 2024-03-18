---
hero:
  title: Print React Components
  description: Within 10 Seconds
---

## Demo

<code src="../src/demos/basic.tsx" iframe></code>

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
