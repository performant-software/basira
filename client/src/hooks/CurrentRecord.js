import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useCurrentRecord = (onLoad) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  /**
   * Calls the onLoad function when the component is mounted.
   */
  useEffect(() => {
    onLoad(id)
      .then((record) => setItem(record))
      .finally(() => setLoading(false));
  }, []);

  return {
    item,
    loading
  };
};

export default useCurrentRecord;
