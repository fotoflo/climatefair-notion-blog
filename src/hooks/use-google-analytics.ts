// Google Analytics tracking hook
export function useGoogleAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        ...parameters,
        custom_map: { dimension1: "page_location" },
      });
    }
  };

  const trackNavigation = (
    linkText: string,
    href: string,
    category = "navigation"
  ) => {
    trackEvent("click", {
      event_category: category,
      event_label: linkText,
      page_location: typeof window !== "undefined" ? window.location.href : "",
      outbound: href.startsWith("http") && !href.includes("climatefair.co"),
      link_url: href,
    });
  };

  return { trackEvent, trackNavigation };
}
