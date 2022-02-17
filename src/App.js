import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <Login />
      <Register />
    </>
  );
}

export default App;
