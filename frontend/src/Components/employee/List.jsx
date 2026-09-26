//import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/EmployeeHelper'
import axios from 'axios'



const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployees] = useState([])


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try{
        const responnse = await axios.get('http://localhost:3002/api/employee', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Employees Data:", responnse.data.employees);
        if(responnse.data.success) {
          let sno = 1;
          const data =  responnse.data.employees.map((emp) => (
           {
             _id: emp._id,
             sno: sno++,
             dep_name: emp.department.dep_name,
             name: emp.userId.name,
             dob: new Date(emp.dob).toLocaleDateString(),
             profileImage : <img width={40} className='rounded-full' src={`http://localhost:3002/${emp.userId.profileImage}`} /> ,
             action: (<EmployeeButtons Dep_Id={emp._id} /> ), 
           }
          ))
    
          setEmployees(data); 
          setFilteredEmployees(data)
          console.log("Filtered Employee Data:", filteredEmployee);

        }
      }catch(error){
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }finally{
        setEmpLoading(false)
      }
    };

    fetchEmployees();
  }, [])
  
  

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    )) 
    setFilteredEmployees(records)
  }


  return (
    <div className='p-6'>
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Employees</h3>
        </div>
        <div className="flex justify-between items-center">
          <input
              type="text"
              placeholder="Search By Emp Name"
              className="px-4 py-0.5 border"
              onChange={handleFilter}
            />
          <Link
                to="/admin-dashboard/add-employee"
                className="px-4 py-1 bg-teal-600 rounded text-white"
              >
                Add New Employee
          </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployee} pagination/>
      </div>


    </div>
  )
}

export default List