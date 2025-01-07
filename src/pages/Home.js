import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Домашняя страница</h1>
      <Link to="/bricks">Bricks</Link>
      <Link to="/globe">Globe</Link>
    </div>
  );
};

export default Home;
