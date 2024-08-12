declare module 'aos' {
  export interface AosOptions {
    duration?: number;
    offset?: number;
    easing?: string;
    delay?: number;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  export default class AOS {
    static init(options?: AosOptions): void;
    static refresh(): void;
    static refreshHard(): void;
  }
}
