import { redirect } from 'react-router-dom';

async function sudokuLoader({ request }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return redirect("/home");
  }

  const url = new URL(request.url);
  const difficulty = url.searchParams.get('difficulty');

  if (!difficulty) {
    throw new Error("Parâmetro 'difficulty' não encontrado na URL");
  }

  const response = await fetch(`http://localhost:8000/game?difficulty=${difficulty}`, {
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

export default sudokuLoader;
