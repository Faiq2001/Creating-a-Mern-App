import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () =>{ 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

//Get Single User Data
  const getSingleUser = async()=>{

    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

  if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }
  else{
      console.log(result);
      setError("");
      console.log("Updated User", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
  }
};


//Send Updated Data to Backend
const handleUpdate = async (e)=>{
  e.preventDefault();

  const updatedUser = {name, email, age};

  const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers:{
          "Content-Type":"application/json",
      },
  });
  const result = await response.json()

  if(!response.ok){
      console.log(result.error);
      setError(result.error);
  }
  else{
      setError("");
      navigate("/all");
  }
};

useEffect(() => {
  getSingleUser();
}, []);

  return (
    <div className="container my-2">

        {error && <div class="alert alert-danger" role="alert">{error}</div>} 
        <h2 className="text-center">Enter the Data</h2>  

        <form onSubmit={handleUpdate}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Age</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={age} 
                    onChange={(e)=> setAge(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>      
    </div>
  );
};

export default Update