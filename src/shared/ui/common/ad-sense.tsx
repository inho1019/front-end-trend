import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSense = () => {
  useEffect(() => {
    try {
      const ads = document.getElementsByClassName("adsbygoogle");
      if (ads.length > 0 && (ads[0] as HTMLElement).getAttribute("data-adsbygoogle-status") === "done") {
        return;
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
        className="adsbygoogle"
        style={{ display: "block", height: "120px" }}
        data-ad-client="ca-pub-9982505674721509"
        data-ad-slot="9256101892"
        data-ad-format="fluid"
        data-full-width-responsive="true"
    />
  );
};
