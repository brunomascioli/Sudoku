import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Home from './Routes/Home';
import SudokuTable from './Routes/Sudoku';
import ErrorPage from './Routes/ErrorPage';
import sudokuLoader from './Loaders/sudokuLoader';
import homeLoader from './Loaders/homeLoader';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", element: <Home />, loader: homeLoader },
  { path: "/sudoku", element: <SudokuTable />, loader: sudokuLoader },
  { path: "*", element: <ErrorPage /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
