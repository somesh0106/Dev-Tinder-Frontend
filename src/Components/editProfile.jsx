import React, { useState } from 'react'
import UserCard from './UserCard'
import BaseUrl from '../Constants.js/URL'
import { useDispatch } from 'react-redux'
import { addUser } from '../Utils/userSlice'
import axios from 'axios'
import Alert from './Alert'

const EditProfile = ({user}) => {
     const [firstName,setFirstName]= useState(user.firstName)
      const [Photourl,setPhotoUrl]= useState(user.Photourl)
       const [gender,setGender]= useState(user.gender || "")
        const [age,setAge]= useState(user.age || "")
    const [lastName,setLastName]= useState(user.lastName)
const [skills,setSkills]= useState(user.skills || "")
const [Bio,setBio]= useState(user.Bio || "")
const [error,SetError]= useState("")
const [showtoast,SetShowToast]=useState(false)
const dispatch = useDispatch()


const HandleSave = async()=>{
  SetError("")
try{const res = await axios.patch(BaseUrl+"/profile/edit", {lastName,firstName,gender,age,skills,Bio,Photourl},{withCredentials:true})
dispatch(addUser(res?.data?.data))
SetShowToast(true)
setTimeout(()=>{
  SetShowToast(false)
},3000)


}
catch(err){
  SetError(err.response.data)
}


}

  return (<>
  <div className='flex justify-center align-middle my-4 min-h-screen' >
    <div>
    <fieldset className="fieldset  bg-slate-700 border-base-300 rounded-box w-20 border px-10 flex justify-center flex-col  mb-2 pb-4 mx-10">
  <legend className="fieldset-legend text-neutral-content ">Login</legend>

  <label className="label text-neutral-content">firstName</label>
  <input type="text" className="input text-black" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />

  <label className="label text-neutral-content">lastName</label>
<input type="text"   className="input text-black"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

  <label className="label text-neutral-content">PhotoUrl</label>
  <input type="text" className="input text-black" value={Photourl} onChange={(e)=>setPhotoUrl(e.target.value)} />

  <label className="label text-neutral-content">Gender</label>
  <input type="text" className="input text-black"  value={gender} onChange={(e)=>setGender(e.target.value)} />

  <label className="label text-neutral-content">Age</label>
  <input type="text" className="input text-black "    value={age} onChange={(e)=>setAge(e.target.value)} />

  <label className="label text-neutral-content">Skills</label>
  <input type="text" className="input text-black"    value={skills} onChange={(e)=>setSkills(e.target.value)} />

   <label className="label text-neutral-content">Bio</label>
  <input type="text" className="input text-black"   value={Bio} onChange={(e)=>setBio(e.target.value)} />
  <p className='text-red-800 my-1'>{error}</p>

  <button className="btn btn-neutral mt-4" onClick={HandleSave}>Save</button>
  {showtoast && (<Alert/>)}
</fieldset>
</div>
  
<div className='my-3'>
  <UserCard user = {{lastName,firstName,gender,age,skills,Bio,Photourl}} />
  </div>
  </div>
  
  </>)
}

export default EditProfile
