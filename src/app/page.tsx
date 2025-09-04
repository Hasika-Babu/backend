'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleForm(e) {
    e.preventDefault();
    try {
      const sendData = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await sendData.json();

      if (sendData.ok) {
        alert(data.message);
        getAllUsers();
        setFormData({
          name: '',
          email: '',
          password: ''
        })
      } else {
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      alert('User creation error');
      console.error('User creation error:', error);
    }
  }

  
  async function getAllUsers(){
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      //console.log(data)
      setUsers(data.user);
    } catch (error) {
      console.log("Error on fetching data.")
    }
  }


  useEffect(()=>{
    getAllUsers();
  },[])


  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <form onSubmit={handleForm} className="flex gap-3 flex-col items-center">
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border p-2"
          placeholder="Enter your name"
        />
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="border p-2"
          placeholder="Enter your email"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2"
          placeholder="Enter your password"
        />
        <button type="submit" className="border p-2 w-full">
          Create User
        </button>
      </form>
      <div className='mt-10'>
        <ul className='flex flex-col gap-5'>
          {
            users.length > 0 && users ? 
            users.map((user, index) => (
              <li key={user.name}>
                <h1>Email: {user.email}</h1>
              </li>
            ))
            :
            "No users found"
          }
        </ul>
      </div>
    </div>
  );
}
