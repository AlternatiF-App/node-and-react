export const initialState = null

export const reducer = (state, action) => {
    if(action.type=="USER"){
        return action.payload
    }
    if(action.type=="CLEAR"){
        return null
    }
    if(action.type=="UPDATEPIC"){
        return {
            ...state,
            photo:action.payload
        }
    }
    if(action.type=="UPDATENAME"){
        return {
            ...state,
            name:action.payload
        }
    }
    if(action.type=="UPDATEPASS"){
        return {
            ...state,
            password:action.payload
        }
    }
    return state
}