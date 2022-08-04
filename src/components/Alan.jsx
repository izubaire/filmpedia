import React, { useEffect, useContext } from 'react';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import alanBtn from '@alan-ai/alan-sdk-web';
import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';

const useAlan = () => {
   const { setMode } = useContext(ColorModeContext);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      alanBtn({
          key: '9e9df62a964361e5ef2b6461dd7c10c12e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, mode, genres, genreOrCategory , query}) => {
            if (command === 'chooseGenre'){ 
               const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
               console.log(foundGenre)

               if (foundGenre){
                  navigate('/');
                  dispatch(selectGenreOrCategory(foundGenre.id))
               }
            }
            else if (command === 'changeMode') {
              if (mode === 'light'){
                  setMode('light');
              } else {
                  setMode('dark');
              }
            }
            else if (command === 'login') {
               fetchToken();
            }
            else if (command === 'logout'){
               localStorage.clear();
               window.location.href = '/';
            }
            else if (command === 'search'){
               dispatch(searchMovie(query))
            }
          }
      });
    }, []);

}

export default useAlan;