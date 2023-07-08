import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Help from "../Help/Help";
import Employee from "../Empolyee Page/Empolyee";
import EmployeeDetails from "../Empolyee Page/EmpolyeeDetails";
import AddEmpolyee from "../Empolyee Page/AddEmpolyee";
import Cases from "../Cases/Cases";
import Settings from "../Settings/Settings";
import Calendar1 from "../Calender/calander";
import { Login } from "../LoginSIgnup/Login";
import { Signup } from "../LoginSIgnup/Signup";
import { PrivateRoute } from "./PrivateRoute";
import LoggedIn from "../AlreadyLoggedIn/LoggedIn";
import { Logout } from "../Logout/Logout";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Calendar1 /></PrivateRoute>} />
      <Route path={"/employee"} element={<PrivateRoute><Employee /></PrivateRoute>} />
      <Route path={"/employee/:emp_id"} element={<EmployeeDetails />} />
      <Route path={"/addempolyee"} element={<AddEmpolyee />} />
      <Route path="/customers" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/cases" element={<PrivateRoute><Cases /></PrivateRoute>} />
      <Route path="/leads" element={<PrivateRoute><Cases /></PrivateRoute>} />
      <Route path="/requests" element={<PrivateRoute><Cases /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/help" element={<Help />} />
      <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loggedin" element={<LoggedIn />} />

     
    </Routes>
  );
};

export { AllRoutes };
