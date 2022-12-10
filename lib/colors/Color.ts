/* eslint-disable class-methods-use-this */

import * as convert from 'colors-convert';

export default class Color {
  r: number;

  g: number;

  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toRgb() {
    return `rgb(${Math.round(this.r)}, ${Math.round(
      this.g,
    )}, ${Math.round(this.b)})`;
  }

  toHex() {
    return convert.rgbToHex({
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
    });
  }

  set(r: number, g: number, b: number) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    const h = (angle / 180) * Math.PI;
    const sin = Math.sin(h);
    const cos = Math.cos(h);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix: number[]) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2],
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5],
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8],
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }

  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp(
      (value + (this.r / 255) * (1 - 2 * value)) * 255,
    );
    this.g = this.clamp(
      (value + (this.g / 255) * (1 - 2 * value)) * 255,
    );
    this.b = this.clamp(
      (value + (this.b / 255) * (1 - 2 * value)) * 255,
    );
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s || 0;
      s = s || 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value: number): number {
    let result = value;
    if (result > 255) {
      result = 255;
    } else if (result < 0) {
      result = 0;
    }
    return result;
  }
}
