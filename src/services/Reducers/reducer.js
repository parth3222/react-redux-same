import { ADD_USER } from "../Constant"
import { EDIT_USER } from "../Constant"
import { DELETE_USER } from "../Constant"

const initialState = {
    userList: [
        {
            id: 1,
            name: "Test",
            dob: "24/8/2222",
            hobbies: "Cricket"
        },
        {
            id: 2,
            name: "Test 2",
            dob: "24/8/1111",
            hobbies: "FootBall"
        },
        {
            id: 3,
            name: "Test 3",
            dob: "24/8/3333",
            hobbies: "Hocky"
        }
    ],
}

export default function userList(state=initialState,action){
    
    switch(action.type){
        case ADD_USER:
            state.userList.push(action.data)
            return{
                ...state,
                userList: state.userList
            }
        case EDIT_USER:
            let getSelectedUser = state.userList.findIndex((user) => user.id === action.id);
            state.userList[getSelectedUser] = action.data
            return{
                ...state,
                userList: state.userList
            }
        case DELETE_USER:
            state.userList = state.userList.filter(user => user.id !== action.id)
            return{
                ...state,
                userList: state.userList
            }
        default:
            return state
    }    

}