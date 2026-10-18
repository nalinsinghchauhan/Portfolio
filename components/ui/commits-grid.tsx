"use client";

import type { CSSProperties } from "react";

const LETTER_PATTERNS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
};

function isFilled(pattern: string[] | undefined, row: number, column: number) {
  return pattern?.[row]?.[column] === "1";
}

export function CommitsGrid({ text }: { text: string }) {
  let cellIndex = 0;

  return (
    <div className="commits-grid" role="img" aria-label={text}>
      <span className="sr-only">{text}</span>
      <div className="commits-grid-letters" aria-hidden="true">
        {text.toUpperCase().split("").map((character, letterIndex) => {
          if (character === " ") {
            return <span className="commits-grid-space" key={`space-${letterIndex}`} />;
          }

          const pattern = LETTER_PATTERNS[character];
          return (
            <span className="commits-grid-letter" key={`${character}-${letterIndex}`}>
              {Array.from({ length: 35 }, (_, index) => {
                const row = Math.floor(index / 5);
                const column = index % 5;
                const active = isFilled(pattern, row, column);
                const delay = cellIndex++ * 11 + (letterIndex % 3) * 70;
                return (
                  <span
                    className={`commit-cell${active ? " is-filled" : ""}`}
                    key={`${letterIndex}-${index}`}
                    style={{ "--cell-delay": `${delay}ms` } as CSSProperties}
                  />
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
