import { useState } from 'react';

const useReloadItems = () => {
  const [isReload, setIsReload] = useState(false);

  function toggle() {
    setIsReload(!isReload);
  }

  return {
    isReload,
    toggle,
  }
};

export default useReloadItems;