import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSense = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
        ref={adRef}
        className="adsbygoogle my-5"
        style={{ display: "block", height: "100px" }}
        data-ad-client="ca-pub-9982505674721509"
        data-ad-slot="9256101892"
        data-ad-format="fluid"
        data-full-width-responsive="true"
    ></ins>
  );
};
