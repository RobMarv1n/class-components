import { useEffect, useState } from 'react';

const Spinner = () => {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/portal.png';
    img.onerror = () => setUseFallback(true);
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-[200px]"
      role="status"
      aria-label="Loading"
    >
      {useFallback ? (
        <div className="w-[60px] h-[60px] border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <div
          className="w-[60px] h-[60px] bg-center bg-no-repeat bg-contain animate-spin"
          style={{ backgroundImage: "url('/portal.png')" }}
        />
      )}
    </div>
  );
};

export default Spinner;
