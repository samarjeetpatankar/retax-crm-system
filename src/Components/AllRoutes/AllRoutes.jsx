import {Routes, Route} from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard"
import Help from '../Help/Help'


const AllRoutes = () => {
    return <Routes>
        <Route path='/' element = {<Dashboard/>}/>
        <Route path='/tasks' element = {<Dashboard/>}/>
        <Route path='/calendar' element = {<Dashboard/>}/>
        <Route path='/employees' element = {<Dashboard/>}/>
        <Route path='/customers' element = {<Dashboard/>}/>
        <Route path='/cases' element = {<Dashboard/>}/>
        <Route path='/leads' element = {<Dashboard/>}/>
        <Route path='/requests' element = {<Dashboard/>}/>
        <Route path='/settings' element = {<Dashboard/>}/>
        <Route path='/help' element = {<Help/>}/>
        <Route path='/logout' element = {<Dashboard/>}/>
    </Routes>
}

export {AllRoutes}