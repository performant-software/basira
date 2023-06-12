import { useConnector } from 'react-instantsearch-hooks-web';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';

const useStats = (props) => useConnector(connectStats, props);

export default useStats;
