import BookingForm from './components/bookingForm';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import Photoshoots from './pages/photoshoots';
import Profile from './pages/profile';
import Register from './pages/register';

function App() {
  return (
    <>
      <Photoshoots />
      <Profile user="testUser"/>
      <Login />
      <Register />
    </>
  );
}

export default App;
