import constants from "./constants"

const initialState = {
    isLoadingBar:false,
    isLoadingScreen:true
  };

const loadReducer = (state = initialState , action)=>{
    switch (action.type){
        case constants.IS_LOADING_BAR:
            return {...state,
            isLoadingBar:!state.isLoadingBar};
        case constants.IS_LOADING_SCREEN:
            return {...state,isLoadingScreen:!state.isLoadingScreen};
        default: return state    
    }
}

export default loadReducer;