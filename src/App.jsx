import HomePage from './pages/HomePage';
import Loader from './components/Loader';
import './styles/Base.css';
import useEmoji from './helpers/useEmoji';

function App() {
  const { emojis, error, isLoading } = useEmoji();

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <div>Error: {error}</div>;

  return <HomePage emojis={emojis} />;
}

export default App;
