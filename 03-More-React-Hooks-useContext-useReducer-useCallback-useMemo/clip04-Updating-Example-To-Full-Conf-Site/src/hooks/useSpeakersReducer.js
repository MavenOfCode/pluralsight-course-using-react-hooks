// for learning about useReducer
// not implemented in favor of useState -- prefered due to clarity & brevity of code
export default function speakersReducer(state, action) {
    function updateFavorite(favoriteValue) {
      return state.map((item, index) => {
        if (item.id === action.sessionId) {
          item.favorite = favoriteValue;
          return item;
        }
        return item;
      });
    }
    switch (action.type) {
      case "setSpeakerList": {
        return action.data; //dispatch name
      }
      case "favorite": {
        return updateFavorite(true);

      }
      case "unfavorite": {
        return updateFavorite(false);
      }
      default:
        return state;
    }
  
  }