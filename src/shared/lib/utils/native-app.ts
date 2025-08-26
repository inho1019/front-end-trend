import type { NavigateFunction } from "react-router";
import { v4 as uuidv4 } from "uuid";

export const NativeApp = {
  isNative: window.ReactNativeWebView != null,
  os: window.ReactNativeMetadata?.os,
  async invoke<T = string>(type: string, payload?: Record<string, unknown>) {
    if (window.ReactNativeWebView == null) return;
    const messageId = uuidv4();
    
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        id: messageId,
        type: type,
        ...payload,
      }),
    );

    return new Promise<T>((resolve, reject) => {
      const abortController = new AbortController();
      const handler = setTimeout(() => {
        abortController.abort();
        reject(new Error("Timeout"));
      }, 10000);

      window.addEventListener(
        `response_${messageId}`,
        (event: Event) => {
          clearTimeout(handler);
          const detail = (event as CustomEvent<string>).detail;
          if (detail != null) {
            resolve(decodeURIComponent(detail) as T);
          } else {
            resolve(undefined as T);
          }
        },
        { once: true, signal: abortController.signal },
      );
    });
  },
  ready(navigate: NavigateFunction) {
    if (NativeApp.isNative !== true) return;
    const handleNavigate = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail == null) return;
      navigate(decodeURIComponent(detail as string));
    };

    window.addEventListener("navigate", handleNavigate);
    NativeApp.invoke("ready");
    return () => {
      window.removeEventListener("navigate", handleNavigate);
    };
  },
  debug(...messages: string[]) {
    console.debug(...messages);
    if (NativeApp.isNative !== true) return;
    NativeApp.invoke("log", {
      level: "debug",
      message: messages.join(""),
    });
  },
  log(...messages: string[]) {
    console.log(...messages);
    if (NativeApp.isNative !== true) return;
    NativeApp.invoke("log", {
      level: "log",
      message: messages.join(""),
    });
  },
  info(...messages: string[]) {
    console.info(...messages);
    if (NativeApp.isNative !== true) return;
    NativeApp.invoke("log", {
      level: "info",
      message: messages.join(""),
    });
  },
  warn(...messages: string[]) {
    console.warn(...messages);
    if (NativeApp.isNative !== true) return;
    NativeApp.invoke("log", {
      level: "warn",
      message: messages.join(""),
    });
  },
  error(...messages: string[]) {
    console.error(...messages);
    if (NativeApp.isNative !== true) return;
    NativeApp.invoke("log", {
      level: "error",
      message: messages.join(""),
    });
  },
};
