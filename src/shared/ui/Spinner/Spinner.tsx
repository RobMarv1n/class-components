import { useEffect, useState } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/portal.png';
    img.onerror = () => setUseFallback(true);
  }, []);

  return (
    <div className="spinner-container" role="status" aria-label="Loading">
      <div
        className={`spinner-base ${useFallback ? 'spinner-fallback' : 'spinner-image'}`}
      />
    </div>
  );
};

export default Spinner;
