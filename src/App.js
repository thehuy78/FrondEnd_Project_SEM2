import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./view/Home";
import Login from "./view/Login";
import './style/Main.scss'
import Footer from "./component/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aboutus from "./view/Aboutus";
import Basis from "./view/Basis";
import Instruct from "./view/Instruct";
import Service from "./view/Service";
import Package from "./view/Package";
import Information from "./view/Information";
import Specialist from "./view/Booking/Specialist";
import Doctor from "./view/Booking/Doctor";
import Schedule from "./view/Booking/Schedule"
import Chat from "./component/Chat";
import FormData from "./view/Booking/FormData";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import News from "./view/News";
import Formality from "./view/Booking/Formality";
import Register from "./view/Register";
import Admin from "./component/Admin";
import BookingDetail from "./component/BookingDetail";
import CreateNews from "./component/CreateNews"
import NewsDetail from "./component/NewsDetail";
import ForgotPassword from "./component/ForgotPassword";
import UpdateAccount from "./component/UpdateAccount";
import FileNotFound from "./component/FileNotFound";
import OptionBooking from "./view/Booking/OptionBooking";



export default function App() {
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact render={() => { return localStorage.getItem('user') ? window.history.back() : <Login /> }}>
          </Route>
          <Route path="/aboutus" exact>
            <Aboutus />
          </Route>
          <Route path="/basis/:index" exact>
            <Basis />
          </Route>
          <Route path="/instruct/:index" exact>
            <Instruct />
          </Route>
          <Route path="/service/:index" exact>
            <Service />
          </Route>
          <Route path="/package" exact>
            <Package />
          </Route>

          <Route path="/information/:index" exact render={() => { return localStorage.getItem('user') && localStorage.getItem('role') === "user" ? <Information /> : <Redirect to='/login' /> }}>
          </Route>

          <Route path="/specialist/:type/:idbv" exact>
            <Specialist />
          </Route>
          <Route path="/doctor/:type/:idkhoa" exact>
            <Doctor />
          </Route>
          <Route path="/schedule/:type/:id" exact>
            <Schedule />
          </Route>

          <Route path="/news/:id" exact>
            <News />
          </Route>




          <Route path="/option/:id_khoa" exact>
            <OptionBooking />
          </Route>

          <Route path="/newsdetail/:id" exact>
            <NewsDetail />
          </Route>

          <Route path="/register" exact render={() => { return localStorage.getItem('user') ? <Redirect to='/' /> : <Register /> }}>
          </Route>
          <Route path="/forgotpassword" exact render={() => { return localStorage.getItem('user') ? <Redirect to='/' /> : <ForgotPassword /> }}>
          </Route>
          <Route path="/update-account" exact render={() => { return !localStorage.getItem('user') ? <Redirect to='/' /> : <UpdateAccount /> }}>
          </Route>

          <Route path="/formality/:id" exact>
            <Formality />
          </Route>

          <Route path="/formdata/:type/:idbs" exact render={() => { return localStorage.getItem('user') && localStorage.getItem('role') === "user" ? <FormData /> : <Redirect to='/login' /> }}>
          </Route>


          <Route path="/admin" exact render={() => { return localStorage.getItem('user') && localStorage.getItem('role') === "admin" ? <Admin /> : <Redirect to='/' /> }}>
          </Route>

          <Route path="/create-news" exact render={() => { return localStorage.getItem('user') && localStorage.getItem('role') === "admin" ? <CreateNews /> : <Redirect to='/' /> }}>
          </Route>
          <Route path="/bookingdetail" exact>
            <BookingDetail />
          </Route>
          <Route path="/404" exact>
            <FileNotFound />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>



        </Switch>
        <footer>
          <Footer />
          {localStorage.getItem('role') !== 'admin' && <Chat />}
        </footer>
      </div>
    </Router>

  );
}