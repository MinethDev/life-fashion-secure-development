import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' ;
import Login from './pages/login';
import AdminDashboard from './pages/adminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import List from './components/employee/List';
import AdminSummary from './components/dashboard/AdminSummary';
import Add from './components/employee/Add' ;
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import Signup from './pages/signup' ;
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Home from './pages/Home';
import Summary from './components/EmployeeDashboard/Summary';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} > </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={
                <PrivateRoutes>
                  <RoleBaseRoutes requiredRole={['admin']}>
                      <AdminDashboard />
                  </RoleBaseRoutes>
                </PrivateRoutes>
                
                }>
                  
                  <Route index element={<AdminSummary />} />

                  <Route path="/admin-dashboard/departments" element={<DepartmentList/>}> </Route>
                  <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}> </Route>
                  <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>} > </Route>
                  
                    

                  <Route path="/admin-dashboard/employees" element={<List />}> </Route>
                  <Route path="/admin-dashboard/add-employee" element={<Add />}> </Route>
                  <Route path="/admin-dashboard/employees/:id" element={<View />}> </Route>
                  <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}> </Route>

                  </Route>


          <Route path="/employee-dashboard" 
            element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin","employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
            }> 
            
            <Route index element={<Summary />} />

            <Route path="/employee-dashboard/profile/:id" element={<View />}> </Route>


            </Route>
         
         
         
          <Route path="/home" element={<Home />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
