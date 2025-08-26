import { NavigateOptions } from "react-router";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

declare global {
  interface Window {
    ReactNativeMetadata?: {
      os: string;
    };
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
