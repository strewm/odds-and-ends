// ------------------- Action types ------------------- //
const GET_USER = 'user/GET_USER';
const UPDATE_USER = 'user/UPDATE_USER';



// ------------------- Action creators ------------------- //
const getUser = (user) => ({
    type: GET_USER,
    user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})



// ------------------- Thunk creators ------------------- //
// export const getUserProfile = (username) => async (dispatch) => {
//     const response = await fetch(`/api/users/${username}`, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         };

//         dispatch(getUser(data));
//         return data;
//     }
// }

// export const updateUserProfile = (id, form) => async dispatch => {
//     const {username, firstName, lastName, email, biography} = form
//     const post = {
//         user_id: id,
//         username,
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         biography
//     }
//     const res = await fetch(`/api/users/${id}/account/edit`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": 'application/json'
//         },
//         body: JSON.stringify(post)
//     })
//     if (res.ok) {
//         const data = await res.json()
//         dispatch(updateUser(data))
//         return null;
//     } else if (res.status < 500) {
//         const data = await res.json()
//         if (data.errors) {
//             return data.errors
//         }
//     } else {
//         return ['An error occured. Please try again.']
//     }
// }



// ------------------- Initial state ------------------- //
const initialState = {}



// ------------------- Reducer ------------------- //
export default function reducer(state = initialState, action) {
    let newState = {};

    switch(action.type) {
        // case GET_USER: {
        //     const newState = {
        //         ...state,
        //         [action.user.username]: action.user
        //     };
        //     return newState;
        // };
        // case UPDATE_USER: {
        //     const index = state.users?.findIndex(user => user.id === action.payload.id)
        //     return {
        //         ...state,
        //         ...state.users = {
        //             ...state.users?.slice(0, index),
        //             ...action.payload,
        //             ...state.users?.slice(index)
        //         }
        //     }
        // };

        default:
            return state;
    }
}
