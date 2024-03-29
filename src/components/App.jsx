import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import useStyles from './styles';
import useAlan from './Alan';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './';


const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef(useAlan);

  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/movie/:id' element={<MovieInformation/>}/>
          <Route path='/actor/:id' element={<Actors/>} />
          <Route path='/' element={<Movies/>} />
          <Route path='/profile/:id' element={<Profile/>} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  )
}


export default App