import HelloWorld from '../components/HelloWorld';
import logo from '../assets/react.svg';

function Home() {
  return (
    <div className="home">
      <img alt="Vue logo" src={logo} />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  );
}

export default Home;
