// ------------------- Action types ------------------- //
const GET_SAVED = 'saved/GET_SAVED';
const GET_USER_SAVED = 'saved/GET_USER_SAVED';
const ADD_SAVE = 'saved/ADD_SAVE';
const DELETE_SAVE = 'saved/DELETE_SAVE';



// ------------------- Action creators ------------------- //
const getSaved = saved => ({
    type: GET_SAVED,
    saved
});

const getUserSaved = saved => ({
    type: GET_USER_SAVED,
    saved
});

const addSave = save => ({
    type: ADD_SAVE,
    save
});

const deleteSave = save => ({
    type: DELETE_SAVE,
    save
});



// ------------------- Thunk creators ------------------- //
export const getPostSaved = (postingId) => async dispatch => {
    const response = await fetch(`/api/saved/posting/${postingId}/saved`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getSaved(data));
        return data;
    }
}

// export const getUsersSaved = (username) => async dispatch => {
//     const response = await fetch(`/api/saved/user/${username}/saved`);

//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         }

//         dispatch(getUserSaved(data));
//         return data;
//     }
// }

export const savePosting = (user_id, postingId) => async (dispatch) => {
    const response = await fetch(`/api/saved/posting/${postingId}/user/${user_id}/saved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, postingId }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addSave(data));
        return data;
    }
};

export const unsavePosting = (user_id, posting_id) => async (dispatch) => {
    if (posting_id) {
        const response = await fetch(`/api/saved/posting/${posting_id}/user/${user_id}/saved`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, posting_id }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return;
            }

            dispatch(deleteSave(data));
            return data;
        }
    }
};



// ------------------- Initial state ------------------- //
const initialState = {};



// ------------------- Reducer ------------------- //
export default function (state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_SAVED: {
            newState = { ...state };
            action.saved.map((save) => newState[save.id] = save);
            return newState;
        }
        case ADD_SAVE: {
            newState = { ...state, [action.save.id]: action.save };
            return newState;
        }
        case DELETE_SAVE: {
            newState = { ...state };
            delete newState[action.save.id];
            return newState;
        }

        default:
            return state;
    }
}
