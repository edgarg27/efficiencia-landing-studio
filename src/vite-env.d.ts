/// <reference types="vite/client" />
import "react";

// Permite custom properties (--d, --bd) en el prop `style` de React.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
