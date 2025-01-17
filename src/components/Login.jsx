// import React, { useState } from "react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = () => {
//     const payload = {
//       email: email,
//       password: password,
//     };
//     console.log(payload);
//     fetch("http://localhost:8980/users/login", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         localStorage.setItem("token", res.token);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="enter email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="enter password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleSubmit}>submit</button>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from 'react'
import { Form } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e)=>{
        e.preventDefault()
        const loginDetails = {
          email: email,
          password: password
        }
        console.log(loginDetails);

        fetch("http://localhost:8676/users/login",{
          method: 'POST',
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(loginDetails)
        }).then((res)=>res.json())
        .then((res)=>{
          console.log(res);
          localStorage.setItem("token",res.token);
        }).catch(error=> console.log(error))
  }

  return (
    <div>
      <Form>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>

        <button onClick={handleSubmit}>Login</button>
      </Form>
    </div>
  )
}

export default Login
