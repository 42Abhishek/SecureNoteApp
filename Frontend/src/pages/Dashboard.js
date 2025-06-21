import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { Navigate, useNavigate } from 'react-router-dom';
import {UserContext} from "../contexts/UserContext";


const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);


  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axiosClient.get("/user/validate");
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
        navigate("/login");
      }
    };

    if (!user) validate(); 
  }, []);


  
  
  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const res = await axiosClient.get('/note/get-notes');
        setNotes(res.data);
      }catch(err){
        if(err.response?.status === 401){
        navigate("/login");
        }
        console.log("Error fetching notes: ", err);
      }
    };

    fetchNotes();
  },[])

  const handleLogout = async () => {
    try{
      await axiosClient.post('/user/logout');
      setUser(null);
      navigate('/');
    }catch(err){
      console.log("Logout error: ", err);
    }
  }

  const handleAddNote =async (e) => {

    e.preventDefault();
  
    try{
      
      if(editingNoteId){

        const res = await axiosClient.put(`/note/update-note/${editingNoteId}`,{
          title,
          content
        });

        const updatedNote = res.data;

        setNotes(notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        ));
        setEditingNoteId(null);

      }else{

        const result = await axiosClient.post("/note/create-note",{
          title,
          content
        })


      setNotes([result.data.note , ... notes]);

      }

      setTitle('');
      setContent('');

    }catch(err){
      
        console.log("error creating note: " + err);

    }

  };

  const handleEdit = async (note) => {

    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note._id);

  }

  const handleDelete = async (id) => {

    try{

      const result = await axiosClient.delete(`/note/delete-note/${id}`)

      const newNotes = notes.filter(note => id !== note._id);

      setNotes(newNotes);

    }catch(err){
      
        console.log("error creating note: " + err);

    }
    
  }

  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm("Are you sure you want to delete your account and all notes");
    if(!confirmDelete) return;

     try{
        const result = axiosClient.delete(`/user/deleteAccount`);
        setUser(null);
        navigate("/signup");
     }catch(err){
        console.log("Account deletion failed: " + err);
     }
  }

  

  return (
    <div className="container">

    <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <div style={{ position: 'relative' }}>
        <span
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          {user?.name}
        </span>
        {dropdownOpen && (
          <ul style={{ listStyle: 'none', padding: '0.3rem', margin: 0, position: 'absolute', top: '100%', right: 0 }}>
            <li
              onClick={handleLogout}
              style={{ cursor: 'pointer', padding: '0.3rem 0', color: 'blue' }}
            >
              Logout
            </li>
             <li
              onClick={handleDeleteAccount}
              style={{ cursor: 'pointer', padding: '0.3rem 0', color: 'blue' }}
            >
              DeleteAccount
            </li>
          </ul>
          
          
        )}
      </div>
    </header>


      <h2>Your Notes</h2>
      <form onSubmit={handleAddNote}>
        <input type="text" placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Note Content" rows="6" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <button type="submit">Add Note</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>Your Notes</h3>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ): (
          notes.map((note) => (
            // console.log(note._id)
            <div key={note?._id} className='note'>
              <div className="note-text">
                 <p className="note-title"><strong>{note.title}</strong></p>
                 <p>{note.content}</p>
              </div>  
             

              <div className="note-buttons">
                 <button  onClick={() => handleEdit(note)}>✏️</button>
                 <button  onClick={() => handleDelete(note._id)}>🗑️</button>
              </div>  
              
            </div>
          ))
        )}
      </div>
    </div>      
  );
};

export default Dashboard;
