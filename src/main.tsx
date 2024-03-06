import React from 'react'
import ReactDOM from 'react-dom/client'
import SudokuTable from './SudokuTable.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SudokuTable />
  </React.StrictMode>,
)
