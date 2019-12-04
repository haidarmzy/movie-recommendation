import { ADD_PLACE, GET_POPULAR_MOVIE, GET_GENRE, GET_MOVIE_DETAILS, ADD_CONVERTED_GENRE, GET_TV_SHOW, GET_NOW_PLAYING_TV_SHOW, GET_TOP_RATED_TV_SHOW, GET_TV_SHOW_GENRE, GET_TV_SHOW_DETAIL, LOGGED_IN, LOGGED_OUT, GET_SEASON_DETAIL } from './types';
import { auth, database, provider } from '../../config/firebase';
import AsyncStorage from '@react-native-community/async-storage';

//Register the user using email and password
export function register(data){
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const {email, password, username} = data;
      console.log("DI ACTION INI 3: ", email, password)
      auth.createUserWithEmailAndPassword(email, password).then((resp) => {
        console.log("DI ACTION INI 4: ", resp)
        let user = {username, uid: resp.user.uid}
        const userRef = database.ref().child('users')
        console.log("DI ACTION INI 5: ", userRef)
        userRef.child(user.uid).update({...user}).then(() => {
          console.log("DI ACTION INI 6: ", data)
          dispatch({type: LOGGED_IN, user});
          resolve(user)
        })
        .catch((error) => reject({message: error}));
      })
      .catch((error) => reject(error));
    })
  }
}

//Create the user object in realtime database
export function createUser(user) {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
          const userRef = database.ref().child('users');

          userRef.child(user.uid).update({...user})
              .then(() => {
                  dispatch({type: LOGGED_IN, user});
                  resolve(user)
              })
              .catch((error) => reject({message: error}));
      });
  }
}

//Sign the user in with their email and password
export function login(data) {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
          const {email, password} = data;
          console.log("ACTION DI LOGIN 1", data)
          auth.signInWithEmailAndPassword(email, password)
              .then((resp) => {
                console.log("ACTION DI LOGIN 2", resp)
                  //Get the user object from the realtime database
                  let {user} = resp;
                  database.ref('users').child(user.uid).once('value')
                      .then((snapshot) => {
                        console.log("ACTION DI LOGIN 3", snapshot.val())
                          const exists = (snapshot.val() !== null);

                          //if the user exist in the DB, replace the user variable with the returned snapshot
                          if (exists) user = snapshot.val();

                          if (exists) dispatch({type: LOGGED_IN, user});
                          resolve({exists, user});
                      })
                      .catch((error) => reject(error));
              })
              .catch((error) => reject(error));
      });
  }
}

//Send Password Reset Email
export function resetPassword(data) {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
          const {email} = data;
          auth.sendPasswordResetEmail(email)
              .then(() => resolve())
              .catch((error) => reject(error));
      });
  }
}

//Sign user out
export function signOut() {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
          auth.signOut()
              .then(() => resolve())
              .catch((error) => reject(error));
      });
  }
}

//Sign user in using Facebook
export function signInWithFacebook(fbToken,) {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
          const credential = provider.credential(fbToken);
          auth.signInWithCredential(credential)
              .then((user) => {
                  //Get the user object from the realtime database
                  database.ref('users').child(user.uid).once('value')
                      .then((snapshot) => {

                          const exists = (snapshot.val() !== null);

                          //if the user exist in the DB, replace the user variable with the returned snapshot
                          if (exists) user = snapshot.val();

                          if (exists) dispatch({type: LOGGED_IN, user});
                          resolve({exists, user});
                      })
                      .catch((error) => reject(error));
              })
              .catch((error) => reject(error));
      });
  }
}

export function checkLoginStatus(callback) {
  return (dispatch) => {
      auth.onAuthStateChanged((user) => {
          let isLoggedIn = (user !== null);

          if (isLoggedIn) {
              //Get the user object from the realtime database
              database.ref('users').child(user.uid).once('value')
                  .then((snapshot) => {

                      const exists = (snapshot.val() !== null);

                      //if the user exist in the DB, replace the user variable with the returned snapshot
                      if (exists) user = snapshot.val();

                      if (exists) dispatch({type: LOGGED_IN, user});
                      callback(exists, isLoggedIn);
                  })
                  .catch((error) => {
                      //unable to get user
                      dispatch({type: LOGGED_OUT});
                      callback(false, false);
                  });
          } else {
              dispatch({type: LOGGED_OUT});
              callback(false, isLoggedIn)
          }
      });
  };
}

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  }
}

export const addPopularMovie = movieList => {
  return {
    type: GET_POPULAR_MOVIE,
    payload: movieList
  }
}

export const addGenre = genreList => {
  return {
    type: GET_GENRE,
    payload: genreList
  }
}

export const addConvertedGenre = (convertGenre, id) => {
  return {
    type: ADD_CONVERTED_GENRE,
    payload: convertGenre,
    id: id
  }
}

export const addMovieDetails = (movieDetails, id) => {
  return {
    type: GET_MOVIE_DETAILS,
    payload: movieDetails,
    id: id
  }
}

export const addTVShow = (tvShow) => {
  return {
    type: GET_TV_SHOW,
    payload: tvShow
  }
}

export const addNowPlayingTvShow = (nowPlaying) => {
  return {
    type: GET_NOW_PLAYING_TV_SHOW,
    payload: nowPlaying
  }
}

export const addTopRatedMovie = (topRated) => {
  return {
    type: GET_TOP_RATED_TV_SHOW,
    payload: topRated
  }
}

export const addTVShowGenre = (genre) => {
  return {
    type: GET_TV_SHOW_GENRE,
    payload: genre
  }
}

export const addTVShowDetailData = (detailData, id) => {
  return {
    type: GET_TV_SHOW_DETAIL,
    payload: detailData,
    id: id
  }
}

export const getSeasonDetailData = (seasonData, id, season_number) => {
  return {
    type: GET_SEASON_DETAIL,
    payload: seasonData,
    id: id,
    season_number: season_number
  }
}