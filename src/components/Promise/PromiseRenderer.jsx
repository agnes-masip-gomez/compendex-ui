//chatgpt

import { useContext, useEffect, useState } from "react";

export const PromiseRenderer = ({ promise }) => {
    const [resolvedValue, setResolvedValue] = useState(null);
  
    useEffect(() => {
      let isMounted = true;
  
      promise.then((data) => {
        if (isMounted) {
          setResolvedValue(data);
        }
      });
  
      return () => {
        isMounted = false;
      };
    }, [promise]);
  
    return resolvedValue;
  };
  