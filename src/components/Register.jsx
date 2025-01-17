import React, { useState } from "react";
import { Form } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      password: password,
      age: age,
    };
    console.log(payload);
    fetch("http://localhost:8676/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input type="text" name="age" value={age} onChange={(e)=>setAge(e.target.value)} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <button onClick={handleSubmit}>Register</button>
      </Form>
    </div>
  );
};

export default Register;




// Another way to create a form

{/* <input
        type="text"
        placeholder="enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleSubmit}>submit</button> */}