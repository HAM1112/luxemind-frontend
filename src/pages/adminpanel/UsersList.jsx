import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { useSelector } from 'react-redux';
// useSelect
import UrlHeader from '../../utilities/urlHeader';
import { Tooltip } from 'react-tooltip';
import { convertToUnderscore } from '../../utilities/convertToUnderscore'
import accpic from '../../assets/acco.png'
import User from './User';
import { Link } from 'react-router-dom';

function UsersList() {

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
                        const newname = convertToUnderscore(user.username)
                        console.log(newname)
                        return (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div id={newname} className="text-sm font-medium text-gray-900">
                                                    <Link to={`${user.id}`} >
                                                        {user.username}
                                                    </Link>
                                                </div>

                                                <Tooltip style={{ backgroundColor: "rgba(255, 255, 255 , 1)", color: "#222" }} anchorSelect={`#${newname}`} place="right" clickable>
                                                   
                                                    <div className='bg-white'>
                                                    <div className="max-w-xs">
                                                        <div className="bg-white shadow-xl rounded-lg py-3">
                                                            <div className="photo-wrapper p-2">
                                                                <img className="w-32 h-32 rounded-full mx-auto" src={user.avatar ? user.avatar : accpic} alt="John Doe" />
                                                            </div>
                                                            <div className="p-2">
                                                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.username}</h3>
                                                                <div className="text-center text-gray-400 text-xs font-semibold">
                                                                    <p>{user.education}</p>
                                                                </div>
                                                                <table className="text-xs my-3 text-black">
                                                                    <tbody>
                                                                    
                                                                    <tr>
                                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Age</td>
                                                                        <td className="px-2 py-2">{user.age}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                                        <td className="px-2 py-2">{user.email}</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>

                                                                <div className="text-center my-3" name={user.id}>
                                                                    <Link to={`${user.id}`} >
                                                                        View profile
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </Tooltip>

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

        






        {/* <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                    <img className="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
                </div>
                <div className="p-2">
                     <h3 className="text-center text-xl text-gray-900 font-medium leading-8">John Doe</h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Web Developer</p>
                    </div>
                    <table className="text-xs my-3">
                        <tbody>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                            <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                            <td className="px-2 py-2">+977 9955221114</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                            <td className="px-2 py-2">john@example.com</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="text-center my-3">
                        <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">
                        View Profile
                        </a>
                    </div>
                </div>
            </div>
        </div> */}


    </div>
  )
}

export default UsersList
