import { Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from 'react-icons/md';
import { SlCalender } from "react-icons/sl";
import { useEffect } from 'react';
import { deleteMultipleData, fetchDataFromApi } from '../../utils Copy/api';
import Badge from '../../components/Badge';
import Orders from '../Orders';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const rows = [
  { name: 'India', code: 'IN', population: 1324171354, size: 3287263 },
  { name: 'China', code: 'CN', population: 1403500365, size: 9596961 },
  { name: 'Italy', code: 'IT', population: 60483973, size: 301340 },
  { name: 'United States', code: 'US', population: 327167434, size: 9833520 },
  { name: 'Canada', code: 'CA', population: 37602103, size: 9984670 },
  { name: 'Australia', code: 'AU', population: 25475400, size: 7692024 },
  { name: 'Germany', code: 'DE', population: 83019200, size: 357578 },
  { name: 'Ireland', code: 'IE', population: 4857000, size: 70273 },
  { name: 'Mexico', code: 'MX', population: 126577691, size: 1972550 },
  { name: 'Japan', code: 'JP', population: 126317000, size: 377973 },
  { name: 'France', code: 'FR', population: 67022000, size: 640679 },
  { name: 'United Kingdom', code: 'GB', population: 67545757, size: 242495 },
  { name: 'Russia', code: 'RU', population: 146793744, size: 17098246 },
  { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768 },
  { name: 'Brazil', code: 'BR', population: 210147125, size: 8515767 },
];

const Users = () => {
  const context = useContext(MyContext);
  const [userData,setUserData] = useState([]);
    const [userTotalData,setUserTotalData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
const [searchQuery,setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() =>{
    setIsLoading(true)
    getUsers();

  },[])

  const getUsers = () =>{
fetchDataFromApi(`/api/user/getAllUsers`).then((res) =>{
  // console.log(res?.users);
  setUserData(res?.users);
  setUserTotalData(res?.users)
  setIsLoading(false)
  
})
  }

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filteredItems = userTotalData?.filter((user) =>
  user?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  user?.createdAt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  user?.mobile?.toString().toLowerCase().includes(searchQuery.toLowerCase())
);
      setUserData(filteredItems || []);
    } else {
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res?.error === false) {
          // setOrders(res);
           setUserData(res?.users || []);
           setIsLoading(false)
        }
      });
    }
  }, [searchQuery]);

  const [sortedIds ,setSortedIds] = useState([]);

  const handleSelectAll = (e) => {
  const isChecked = e.target.checked;

  // Update all items' checked status
  const updatedItems = userData.map((item) => ({
      ...item,
      checked: isChecked,
  }));
  setUserData(updatedItems);
  // console.log(updatedItems);
  

  // Update the sorted IDs state
  if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      // console.log(ids);
      setSortedIds(ids);
  } else {
      setSortedIds([]);
  }
};

// Handler to toggle individual checkboxes
const handleCheckboxChange = (e, id, index) => {
  const updatedItems = userData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
  );
  setUserData(updatedItems);

  // Update the sorted IDs state
  const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
  setSortedIds(selectedIds);

  // console.log(selectedIds);
};

  const deleteMultiple = () => {
    console.log(sortedIds);
    
    if (sortedIds.length === 0) {
        context.alertBox('error', 'Please select items to delete.');
        return;
    }

    console.log(sortedIds);

    try {
        deleteMultipleData('/api/user/deleteMultiple', {
            data: { ids: sortedIds },
        }).then((res) => {
            console.log(res);
            getUsers();
            context.alertBox("success", "User deleted");
        });
    } catch (error) {
        context.alertBox('error', 'Error deleting items.');
    }
};


  return (
    <>
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        {/* <div className="flex items-center w-full px-5 justify-between">
          <div className="w-[40%]">
            <h1 className="font-[700] text-[20px] text-gray-800">User List</h1>
          </div>

          <div className="w-[40%] ml-auto pt-2 flex items-center gap-3">
            {
            sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm' size='small' color='error' onClick={deleteMultiple}>Delete</Button>
          }
            <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />
          </div>
        </div> */}
        <div className="w-full px-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div className="w-full sm:w-[40%]">
    <h1 className="font-bold text-[18px] sm:text-[20px] text-gray-800">User List</h1>
  </div>

  <div className="w-full sm:w-[40%] flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 ml-0 sm:ml-auto mt-2">
    {sortedIds?.length !== 0 && (
      <Button
        variant="contained"
        className="btn-sm w-full sm:w-auto"
        size="small"
        color="error"
        onClick={deleteMultiple}
      >
        Delete
      </Button>
    )}
    <div className="w-full">
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  </div>
</div>


        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left text-black bg-white">
            <thead className="text-xs text-black uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3 pr-0 w-[10%]">
                  <div className="w-[60px]">
                     <Checkbox {...label} size='small' onChange={handleSelectAll} 
                    checked={userData?.length >0 ? userData.every((item ) => item.checked) : false }
                    />
                  </div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap">User Image</th>
                <th className="px-6 py-3 whitespace-nowrap">User Name</th>
                <th className="px-6 py-3 whitespace-nowrap">User Email</th>
                <th className="px-6 py-3 whitespace-nowrap">Email Verify</th>
                <th className="px-6 py-3 whitespace-nowrap">User Phone No.</th>
                <th className="px-6 py-3 whitespace-nowrap">Created</th>
              </tr>
            </thead>

            <tbody>
              {
                isLoading === false ? userData?.length !==0 && userData?.map((user,index) =>{
                  return(
<tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-300">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size='small'  checked={user.checked === true ? true : false}
                          onChange={(e) => handleCheckboxChange(e,user._id,index)}
                          />
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[150px]">
                    <div className="w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src={user?.avatar !== "" && user?.avatar!== undefined ? user?.avatar : '/profile.png'}
                          alt="image1"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-2">{user?.name}</td>
                <td className="px-6 py-2">
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> {user?.email}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> 

                   {
                    user?.verify_email === false ?
                    <span className={`inline-block py-1 px-4 text-[13px] text-white font-bold  rounded-full capitalize bg-red-500
       `}
    >
      Not Verify</span>:
                    <span className={`inline-block py-1 px-4 text-[13px] text-white font-bold rounded-full capitalize bg-green-500
        `}
    >
     Verified</span>
                   } 
                    {/* {user?.verify_email === true ? <Badge status={user?.verify_email} /> :  <Badge status={user?.verify_email} />} */}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> {user?.mobile ===null? 'NONE' : user?.mobile}
                  </span>
                </td>
                <td className="px-6 py-2">
                  <span className="flex items-center gap-2">
                    <SlCalender />{user?.createdAt.split("T")[0]}
                  </span>
                </td>
              </tr>
                  )
                }) : ''
              }
              
            </tbody>
          </table>
        </div>

        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </div>
    </>
  );
};

export default Users;
