import { useState } from "react";
import React from 'react';
import {Button} from "./Button";

function AddUserForm() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [admin, setAdmin] = useState(false);
  

  return (
    <section className="home">
      <div className="title text"> <b> Add a new user </b></div>
      <form className="form text">
        <label>Email address*
          <input required
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>Additional notes
          <input
            type="text" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <label>Password*
          <input required
            type="text" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>Is active
          <input required
            type="checkbox" 
            value={active}
            onChange={(e) => setActive(e.target.value)}
          />
        </label>
        <label>Is a global admin
          <input required
            type="checkbox" 
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
        </label>
      </form>
      <Button className="add-button"> Create User </Button>
    </section>
  )
}

export default AddUserForm
