import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../../api/api';
import { removeUserDetails } from '../../redux/slices/userSlice'
import { removeTokens } from '../../redux/slices/tokenSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useUrlHeader from '../../utilities/urlHeader';
import uploadPic from '../../assets/fileupload.png'
import accoPic from '../../assets/acco.png'
import { convertToUnderscore } from '../../utilities/convertToUnderscore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebasestore } from '../../firebase/firebase';

function ProviderProfile() {

    const auth = useUrlHeader()
    const fileInputRef = useRef(null)
    const [image, setImage] = useState(null);

    const [user, setUser] = useState({
        first_name : '',
        last_name : '',
        dob : '',
        email : '',
        username : '',
        education : '',
        about_me : '',
        linked_in_link : '',
        insta_link : '',
        youtube_link : '',
        avatar : '' ,

    }); 
    const dispatch = useDispatch()
    useEffect(() => {
        api.get(
            '/provider/profile',
            auth
        ).then((response) => {
            setUser(response.data)
        })
        }, []);
        
    const handleChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = () =>{
        // console.log('save')
        api.put(
            '/provider/profile-update',
            user,
            auth
        )
        .then((response)=>{
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                // console.log(response.data);
        })
        .catch((error)=>{
            toast.error(error.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })  
    }   

    const handleLogout = () =>{
        dispatch(removeUserDetails())
        dispatch(removeTokens())
    }

    useEffect(() => {
        if (image == null ) {
            console.log('image is null');
            console.log('what');
            return
        }
        const newname = convertToUnderscore(user.username)
        const imgRef = ref(firebasestore , `avatar/${newname}`)
        uploadBytes(imgRef , image)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setUser((prev)=>({...prev , avatar : url }))
                console.log('image uploaded successfully')
            }).catch(error => {
                console.log('some error in getDownloadUrl');
            })
        }).catch(error => {
            console.log('some error in uploadBytes');
        })
        setImage(null)
    }, [image]);

  return (
    <div className='p-6 w-full'>
        <ToastContainer />
      <div className='bg-gray-400 rounded w-full'>
        <div className='grid grid-cols-2 gap-6 py-14 px-20'>
            <div className='flex justify-start items-center col-start-1 col-end-3 mb-8'>
                <label className='w-1/6 '>Profile pic</label>
                
                <div className='group relative focus:outline-none'>
                    <img src={user.avatar ? user.avatar : accoPic} alt={user.username} className='rounded-full w-48 h-48 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] border-2 '/>
                    <div onClick={()=>fileInputRef.current.click()} className='image-upload p-10 rounded-full hidden group-hover:flex absolute top-0 justify-center items-center'>
                        <img src={uploadPic} alt="" className='' />
                    </div>
                </div> 
            </div>
                <input type="file" 
                    className='input hidden'
                    id = 'image_input'
                    ref = {fileInputRef}
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                    }}
                />
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>First Name</label>
                <input onChange={handleChange} value={user.first_name} name='first_name' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Last Name</label>
                <input onChange={handleChange} value={user.last_name} name='last_name' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Email</label>
                <input value={user.email} name='email' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' disabled/>
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Username</label>
                <input onChange={handleChange} value={user.username} name='username' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Education</label>
                <input onChange={handleChange} value={user.education} name='education' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Date Of Birth</label>
                <input type="date" id='dob' name='dob' onChange={handleChange} value={user.dob} className='w-4/6 border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900' />
            </div>
            <div className='flex col-start-1 col-end-3 '>
                <h3 className='w-1/6'>About me</h3>
                <textarea name="about_me" value={user.about_me} onChange={handleChange} id="" rows="5" className='w-5/6 border-2 border-slate-900 outline-none p-2'></textarea>
            </div>
            <div className='flex col-start-1 col-end-3 '>
                <label className='w-1/6'>LinkedIn</label>
                <input onChange={handleChange} value={user.linked_in_link} name='linked_in_link' type="text" className='w-5/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex col-start-1 col-end-3 '>
                <label className='w-1/6'>Instagram</label>
                <input onChange={handleChange} value={user.insta_link} name='insta_link' type="text" className='w-5/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex col-start-1 col-end-3 '>
                <label className='w-1/6'>YouTube</label>
                <input onChange={handleChange} value={user.youtube_link} name='youtube_link' type="text" className='w-5/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>

        </div>

        <div className='flex justify-end w-full px-20 pb-12'>
            <button onClick={handleSubmit} className='bg-blue-500 text-white py-2 px-4 rounded'>Save</button>
        </div>
      </div>

      <div className='flex justify-start gap-8 mt-10 px-1'>
            <button 
                className='bg-zinc-900 text-white py-2 px-5 rounded border-4 hover:border-double' 
                onClick={handleLogout}>
                Logout</button>
            <button className='bg-red-700 text-white py-2 px-5 rounded border-4 hover:border-double'>Delete Account</button>
        </div>
    </div>
  )
}

export default ProviderProfile
