import { PropagateLoader } from 'react-spinners';
import '../styles/Loader.css';

function Loader({ loading }) {
  return (
    <div className="loader-container d-flex__col align-items__center justify-content__center gap_2r">
      <h1 className="padding_2r text-transform__uppercase loading-header">
        emoji flippers
      </h1>
      <PropagateLoader color="#ffffff" loading={loading} size={15} />
    </div>
  );
}

export default Loader;
