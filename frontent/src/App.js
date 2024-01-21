import logo from './logo.svg';
import './App.css';
import './css/Style.css'
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserHome from './userDashboard/UserHome';
import BookDetail from './pages/BookDetail';
import { Logout } from './userDashboard/Logout';
import UserMain from './components/userDashboard/UserMain';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Main child = {<Home/>}/>}/>
        <Route path='/login' element={<Main child = {<Signin/>}/>}/>
        <Route path='/signup' element={<Main child = {<Signup/>}/>}/>
        <Route path='/userHome' element={<UserMain child={<UserHome/>}/>}/>
        <Route path='/bookDetail' element={<Main child = {<BookDetail/>}/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
