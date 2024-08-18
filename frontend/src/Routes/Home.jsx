import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  // const {easy, medium, hard} = useLoaderData();
  return (
    <div className='home-window'>
      <h2 className='home-title'>Dificuldade</h2>
      <div className='home-links'>
        <Link className='home-link' to="/sudoku?difficulty=easy">Fácil</Link>
        <Link className='home-link' to="/sudoku?difficulty=medium">Médio</Link>
        <Link className='home-link' to="/sudoku?difficulty=hard">Difícil</Link>
      </div>
    </div>
  );
}

export default Home;