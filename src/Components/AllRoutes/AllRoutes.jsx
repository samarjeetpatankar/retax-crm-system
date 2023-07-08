import {Routes, Route} from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard"
import Help from '../Help/Help'
import Employee from '../Empolyee Page/Empolyee'
import EmployeeDetails from '../Empolyee Page/EmpolyeeDetails'
import AddEmpolyee from '../Empolyee Page/AddEmpolyee'
import Login from '../LoginSIgnup/Login'
import SingUp from '../LoginSIgnup/SingUp'


const AllRoutes = () => {
    return <Routes>
        <Route path='/' element = {<Dashboard/>}/>
        <Route path='/tasks' element = {<Dashboard/>}/>
        <Route path='/calendar' element = {<Dashboard/>}/>
        <Route path={'/employee'} element={<Employee />} /> 
        <Route path={'/employee/:emp_id'} element={<EmployeeDetails />} /> 
        <Route path={'/addempolyee'} element={<AddEmpolyee/>} />
        <Route path='/customers' element = {<Dashboard/>}/>
        <Route path='/cases' element = {<Dashboard/>}/>
        <Route path='/leads' element = {<Dashboard/>}/>
        <Route path='/requests' element = {<Dashboard/>}/>
        <Route path='/settings' element = {<Dashboard/>}/>
        <Route path='/help' element = {<Help/>}/>
        <Route path='/logout' element = {<Dashboard/>}/>
        <Route path='/Login' element = {<Login/>}/>
        <Route path='/SingUp' element = {<SingUp/>}/>
    </Routes>
}

export {AllRoutes}