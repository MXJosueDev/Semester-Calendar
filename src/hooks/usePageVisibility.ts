import { useEffect, useState } from "react";

const getPageVisibility = () =>
  typeof document === "undefined" ? true : document.visibilityState === "visible";

const usePageVisibility = () => {
  const [isPageVisible, setIsPageVisible] = useState<boolean>(getPageVisibility());

  useEffect(() => {
    const handleVisibilityChange = () => {
      const nextVisible = document.visibilityState === "visible";
      setIsPageVisible(nextVisible);
      document.body.dataset.pageVisible = String(nextVisible);
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isPageVisible;
};

export default usePageVisibility;
