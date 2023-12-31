import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Help from "../Help/Help";
import Employee from "../Empolyee Page/Empolyee";
import EmployeeDetails from "../Empolyee Page/EmpolyeeDetails";
import AddEmpolyee from "../Empolyee Page/AddEmpolyee";
import Cases from "../Cases/Cases";
import Settings from "../Settings/Settings";
import Calendar1 from "../Calender/calander";
import Login from "../LoginSIgnup/Login";
import Customer from "../Customer/Customer";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar1 />} />
      <Route path={"/employee"} element={<Employee />} />
      <Route path={"/employee/:emp_id"} element={<EmployeeDetails />} />
      <Route path={"/addempolyee"} element={<AddEmpolyee />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/leads" element={<Cases />} />
      <Route path="/requests" element={<Cases />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export { AllRoutes };

