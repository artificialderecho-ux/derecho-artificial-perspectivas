import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Retry after a small delay in case of async rendering
        const timer = setTimeout(() => {
          const el = document.getElementById(hash.replace("#", ""));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}
