import logo from './logo.svg';
import './App.css';
import './css/Style.css'
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BookDetail from './pages/BookDetail';
import { Logout } from './userDashboard/Logout';
import Books from './userDashboard/Books';
import UserAccount from './userDashboard/UserAccount';
// import AdminMain from './components/admin/AdminMain';
import AdminHome from './pages/admin/AdminHome';
import AdLogin from './pages/admin/AdLogin';
import Dashboard from './components/admin/Dashboard'
import { AdLogout } from './pages/admin/AdLogout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/' element={<Main child = {<Home/>}/>}/> */}
        <Route path='/login' element={<Main child = {<Signin/>}/>}/>
        <Route path='/signup' element={<Main child = {<Signup/>}/>}/>
        <Route path='/bookDetail/:id' element={<Main child = {<BookDetail/>}/>}/>
        <Route path='/books' element={<Main child = {<Books/>}/>}/>
        <Route path='/profile' element={<Main child = {<UserAccount/>}/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/admin' element={<AdLogin/>}/>
        <Route path='/adminHome' element={<Dashboard child = {<AdminHome/>}/>}/>
        <Route path='/adlogout' element={<AdLogout/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
