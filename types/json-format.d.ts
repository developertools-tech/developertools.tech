/* eslint-disable no-unused-vars */

declare module 'json-format' {
  export default function jsonFormat(
    input: string | object,
    options?: {
      type?: 'space' | 'tab';
      size?: number;
    },
  ): string;
}
