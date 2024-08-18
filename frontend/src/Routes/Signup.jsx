import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Signup(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })
  
      if(response.ok){
        const data = await response.json();
        alert("Cadastro realizado com sucesso!");
      }

    } catch (error) {
      console.error("Erro: ", error)
    }
  }

  return (
    <div className='window'>
      <div className='div-form'>
        <h1>Registre-se</h1>
        <form onSubmit={handleSubmit} className='form-container'>
          <input 
            type="text"
            className='username-input'
            placeholder='Nome de usuário'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <input 
            type="password" 
            className='password-input'
            placeholder='Nova senha'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='form-button'>Cadastre-se</button>
        </form>
        <div>
          <p style={{marginTop: `10px`}}>Já possui uma conta? <Link to='/'>Conecte-se</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;