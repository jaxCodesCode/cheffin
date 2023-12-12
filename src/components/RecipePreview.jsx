import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

import componentStyles from '@/styles/RecipePreview.module.scss';
import { getDownloadURL, ref } from 'firebase/storage';
import { store } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';

const RecipePreview = ({recipe}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [imageUrl, setimageUrl] = useState('');

  useEffect(() => {
    getDownloadURL(ref(store, recipe.image))
      .then((url) => {
        setimageUrl(url);
      })
  }, [])

  return (
    <>
      <div className={componentStyles.container} onClick={() => navigate(`/recipe/${recipe.id}`)}>
        <Paper elevation={6} sx={{backgroundColor: theme.palette.primary.light, padding: 1, paddingY: 0.5}}>
          <h1 key={recipe.id} className={componentStyles.header}>{recipe.name}</h1>
          <span>
            <p>Serves: {recipe.serves}</p>
          </span>
          <div style={{height: '200px', backgroundImage: `url(${imageUrl.substring(0, imageUrl.length - 1)})`, backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '0.5rem'}}></div>
        </Paper>
      </div>
    </>
  )
}

RecipePreview.propTypes = {
  recipe: PropTypes.object
}

export default RecipePreview;