import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { useSelector } from 'react-redux';
// useSelect
import UrlHeader from '../../utilities/urlHeader';

function UsersList() {
    const token = useSelector((state) => state.token.value.access)

    const [users, setUsers] = useState(null);

    const header = UrlHeader()

    useEffect(() => {
        api.get('adminpanel/all-users/' , header)
        .then(response => {
            console.log(response.data);
            setUsers(response.data)
        })
    }, []);

    const ExtractDate = (date) => {
        const dateJoined = new Date(date);
        const formattedDate = dateJoined.toLocaleDateString();
        return formattedDate
    }

  return (
    <div className='border-2 border-yellow-600 w-full p-3'>
      
        {users ? 
        
                <table className="w-full divide-y divide-gray-200 overflow-x-auto m-3 text-center">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Second Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Joined
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">


                    {users.map((user ) => {
                        return (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.username}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.first_name ? <>{user.first_name}</>: <span className='font-bold text-red-600'>---</span>}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.last_name ? <>{user.last_name}</>: <span className='font-bold text-red-600'>---</span>}</div>
                                        {/* <div className="text-sm text-gray-500">Optimization</div> */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {
                                            user.is_active ?
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                            :
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Inactive
                                            </span>

                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Student
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ExtractDate(user.date_joined)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap grid text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                                    </td>
                                </tr>

                        )
                    })}


                    {/* <!-- More rows... --> */}

                </tbody>
            </table>:
            <div>No users found</div>
        }



    </div>
  )
}

export default UsersList
