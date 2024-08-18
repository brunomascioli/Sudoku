import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if(response.ok){
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);
        return navigate("/home");
      }else{
        alert("Credenciais invalidas");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="window">
      <div className="div-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input 
            type="text"
            className="username-input"
            placeholder="Nome de usuário"
            onChange={(e) => setUsername(e.target.value)}
            required  
          />
          <input 
            type="password"
            className="password-input"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit">Entrar</button>
        </form>
        <div>
          <p style={{marginTop: `10px`}}>Não possui uma conta? <Link to="/signup">Cadastre-se</Link></p>
        </div>
      </div>
  </div>
  )
}


export default Login;