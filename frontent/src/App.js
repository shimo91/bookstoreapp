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
import { RequireAuth } from './Auth';
import { RequireAdminAuth } from './AdminAuth';
import RentUserList from './pages/admin/RentUserList';
import Users from './pages/admin/Users';
import Detail from './pages/admin/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/' element={<Main child = {<Home/>}/>}/> */}
        <Route path='/login' element={<Main child = {<Signin/>}/>}/>
        <Route path='/signup' element={<Main child = {<Signup/>}/>}/>
        <Route path='/bookDetail/:id' element={<Main child = {<BookDetail/>}/>}/>
        <Route path='/books' element={<RequireAuth><Main child = {<Books/>}/></RequireAuth>}/>
        <Route path='/profile' element={<RequireAuth><Main child = {<UserAccount/>}/></RequireAuth>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/admin' element={<AdLogin/>}/>
        <Route path='/adminHome' element={<RequireAdminAuth><Dashboard child = {<AdminHome/>}/></RequireAdminAuth>}/>
        <Route path='/rentlist' element={<RequireAdminAuth><Dashboard child = {<RentUserList/>}/></RequireAdminAuth>}/>
        <Route path='/users' element={<RequireAdminAuth><Dashboard child = {<Users/>}/></RequireAdminAuth>}/>
        <Route path='/detail/:id' element={<RequireAdminAuth><Dashboard child = {<Detail/>}/></RequireAdminAuth>}/>
        <Route path='/adlogout' element={<AdLogout/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
