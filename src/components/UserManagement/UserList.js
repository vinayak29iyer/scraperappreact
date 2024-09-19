import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { apiEndpoints } from '../../api/endpoints'
import './UserList.scss';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const UserList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const fetchUsers = async (page) => {
    try {
    const response = await axiosInstance.get(`${apiEndpoints.listRegUsersApi}?page=${page}&limit=${itemsPerPage}`)
    setUsers(response.data?.data.users);
    setTotalPages(response.data?.data?.totalPages)
    } catch(error){
      console.log('AXIOS GET ERR>> ',error)
        const { status: errStatusCode, data: { errors: valErrArr = []} = {} } = error.response || {}
        if(errStatusCode === 422){
          Swal.fire({
            title: 'Error!',
            text: `${valErrArr.length >=1 ? valErrArr[0]?.message: 'Invalid Url Value!' }`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="user-list">
      <div className="form-group">
        <button className="reg-users-btn" type="button" onClick={()=> navigate('/usersave')}>Register Users</button>
      </div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
