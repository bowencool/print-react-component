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
            <>
              <h1>Hello!</h1>
              <p>This is a react component</p>
            </>,
          );
        }}
      >
        Print
      </button>
    </>
  );
}
