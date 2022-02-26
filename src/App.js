import BookingForm from './components/bookingForm';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Photoshoots from './pages/photoshoots';
import Profile from './pages/profile';
import Register from './pages/register';

function App() {
  return (
    <>
      {/* Make modal popup when the user clicks on the photoshoot/edit photoshoot */}
      <Dashboard />
      {/* <Photoshoots /> */}
      {/* <Profile user="testUser"/> */}
      {/* <Login />
      <Register /> */}
    </>
  );
}

export default App;
