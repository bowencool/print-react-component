import { throttleAsyncResult } from '@bowencool/async-utilities';
import type { ReactNode } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

interface ElementsHolderRef {
  setElements: (elements: ReactNode[]) => void;
}

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

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, setElements] = React.useState<ReactNode[]>([]);
    React.useImperativeHandle(
      ref,
      () => ({
        setElements,
      }),
      [],
    );
    const container = document.querySelector('div[data-print-react-component]');
    if (!container) {
      return null;
    }
    return createPortal(elements, container);
  }),
);

type ContainerOptions = {
  /** className you want to attach to the content */
  className?: string;
};

function ensureContainer({ className }: ContainerOptions = {}) {
  if (!document.querySelector('style[data-print-react-component]')) {
    const style = document.createElement('style');
    style.setAttribute('data-print-react-component', 'true');
    style.innerHTML = `.print-only {
display: none !important;
}
@media print {
body > * {
  display: none !important;
}
.printable,
.print-only {
  display: block !important;
}
}`;
    document.head.appendChild(style);
  }
  if (!document.querySelector('div[data-print-react-component]')) {
    const container = document.createElement('div');
    container.setAttribute('data-print-react-component', 'true');
    container.classList.add('print-only');
    if (className) {
      container.classList.add(className);
    }
    document.body.appendChild(container);
  }
}

export function usePrint({ className }: ContainerOptions = {}): {
  /** This holder ensures that the content to be printed accurately receives the context values. */
  holder: React.ReactElement;
  /** Print ReactNode directly */
  printReactNode: PrintReactNode;
} {
  const holderRef = React.useRef<ElementsHolderRef>(null);

  const printReactNode = React.useMemo<PrintReactNode>(
    () =>
      throttleAsyncResult(function (content, { title } = {}) {
        return new Promise<void>((resolve) => {
          ensureContainer({ className });
          /**
           * https://github.com/ant-design/ant-design/issues/23623
           * Sync render blocks React event. Let's make this async.
           */
          setTimeout(() => {
            holderRef.current?.setElements([content]);
            const originalTitle = document.title;
            if (title) {
              document.title = title;
            }
            window.addEventListener(
              'afterprint',
              () => {
                holderRef.current?.setElements([]);
                document.title = originalTitle;
                resolve();
              },
              { once: true },
            );
            setTimeout(() => {
              window.print();
            });
          });
        });
      }),
    [],
  );
  return {
    holder: <ElementsHolder key="context-holder" ref={holderRef} />,
    printReactNode,
  };
}
