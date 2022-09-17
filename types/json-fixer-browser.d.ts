/* eslint-disable no-unused-vars */

declare module 'json-fixer-browser' {
  export default function jsonFixer(input: string | object): {
    data: string;
    changed: boolean;
  };
}
