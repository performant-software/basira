import { useConnector } from 'react-instantsearch-hooks-web';
import connectRange from 'instantsearch.js/es/connectors/range/connectRange';

const useRangeSlider = (props) => useConnector(connectRange, props);

export default useRangeSlider;
