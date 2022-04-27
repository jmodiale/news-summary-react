import './App.css';
import Feed from './Feed'
import { Typography } from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Typography variant="h1" component="h3">
          News Summary
        </Typography>
        <Routes>
          <Route exact path="/" element={<Feed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
