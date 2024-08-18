import { redirect } from 'react-router-dom';

async function homeLoader(){
  const token = localStorage.getItem("token");
  
  if (!token) {
    return redirect("/");
  }

  const response = await fetch(`http://localhost:8000/game-results`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (response.status === 401 || response.status === 403) {
    return redirect("/");
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default homeLoader;