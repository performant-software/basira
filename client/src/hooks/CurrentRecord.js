import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const ERROR_NOT_FOUND = 404;

const useCurrentRecord = (onLoad) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  /**
   * Redirect to the 404 page if the record cannot be found.
   *
   * @type {(function({response: {status: *}}): void)|*}
   */
  const onError = useCallback(({ response: { status } }) => {
    if (status === ERROR_NOT_FOUND) {
      history.push('/404');
    }
  }, [history]);

  /**
   * Calls the onLoad function when the component is mounted.
   */
  useEffect(() => {
    onLoad(id)
      .then((record) => setItem(record))
      .catch(onError)
      .finally(() => setLoading(false));
  }, [id]);

  return {
    item,
    loading
  };
};

export default useCurrentRecord;
