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
