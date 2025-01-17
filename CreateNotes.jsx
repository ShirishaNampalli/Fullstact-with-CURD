import React, { useState } from 'react'
import { Form } from 'react-router-dom';

const CreateNotes = () => {
    const [title, setTitle] =useState("");
    const [note, setNote] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            title : title,
            note : note,
            category : category
        }
        console.log(data);
        fetch(`http://localhost:8676/notes/create`,{
            method : 'POST',
            headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data),
        })
        .then((res)=> res.json())
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err));
    };

  return (
    <div>
      <Form>
        <div>
            <label htmlFor ='title'>Title</label>
            <input type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div>
            <label htmlFor='note'>Note</label>
            <input type='text' name='note' value={note} onChange={(e)=>setNote(e.target.value)}/>
        </div>
        <div>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' value={category} onChange={(e)=>setCategory(e.target.value)}/>
        </div>
        <button onClick={handleSubmit}>Add Notes</button>
      </Form>
    </div>
  );
}

export default CreateNotes;
