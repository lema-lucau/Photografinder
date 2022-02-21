import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Profile from './pages/profile';
import Register from './pages/register';

function App() {
  return (
    <>
      <Header />
      <Profile user="testUser"/>
      <Login />
      <Register />
    </>
  );
}

export default App;
