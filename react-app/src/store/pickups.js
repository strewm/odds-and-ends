// ------------------- Action types ------------------- //
const GET_PICKUPS = 'posts/GET_PICKUPS';
// const GET_ONE_PICKUP = 'posts/GET_ONE_PICKUP';
const GET_USER_PICKUPS = 'posts/GET_USER_PICKUPS';
const CREATE_PICKUP = 'posts/CREATE_PICKUP';
const UPDATE_PICKUP = 'posts/UPDATE_PICKUP';
const DELETE_PICKUP = 'posts/DELETE_PICKUP';



// ------------------- Action creators ------------------- //
const getPickups = pickups => ({
    type:GET_PICKUPS,
    pickups
})

// const getOnePickup = pickup => ({
//     type: GET_ONE_PICKUP,
//     pickup
// });

const getAllUserPickups = pickups => ({
    type: GET_USER_PICKUPS,
    pickups
});

const creatPickup = pickup => ({
    type: CREATE_PICKUP,
    pickup
});

const updatePickup = pickup => ({
    type: UPDATE_PICKUP,
    pickup
});

const deletePickup = pickup => ({
    type: DELETE_PICKUP,
    pickup
});



// ------------------- Thunk creators ------------------- //
export const getAllPickups = (postingId) => async dispatch => {
    const response = await fetch(`/api/pickups/posting/${postingId}/pickups`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getPickups(data));
        return data;
    }
};

// export const getSinglePickup = (pickupId) => async (dispatch) => {
//     const response = await fetch(`/api/pickups/${pickupId}`);

//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         };

//         dispatch(getOnePickup(data));
//         return data;
//     }
// };

export const getUserPickups = (userId) => async dispatch => {
    const response = await fetch(`/api/pickups/user/${userId}/pickups`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getAllUserPickups(data));
        return data;
    }
};

export const addPickup = ({user_id, posting_id, date}) => async dispatch => {
    const response = await fetch(`/api/pickups/posting/${posting_id}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            posting_id,
            date
        })
    });

    // console.log('INSIDE STOOOOOOOOOORE', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(creatPickup(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            // console.log('HEYYYYYYYYYY', data.errors)
            return data.errors;
        };
    }
};

export const updateOnePickup = ({posting_id, pickup_id, date}) => async dispatch => {
    const response = await fetch(`/api/pickups/${pickup_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            posting_id,
            pickup_id,
            date
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updatePickup(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            // console.log('HEYYYYYYYYYY', data.errors)
            return data.errors;
        };
    }
};

export const deleteOnePickup = ({pickup_id}) => async dispatch => {
    const response = await fetch(`/api/pickups/${pickup_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deletePickup(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        };
    }

    // if (response.ok) {
    //     const data = await response.json();
    //     if (data.errors) {
    //         return data.errors;
    //     };

    //     dispatch(deletePosting(postingId))
    //     return 'Post successfully deleted.'
    // }
};



// ------------------- Initial state ------------------- //
const initialState = {};



// ------------------- Reducer ------------------- //
export default function postsReducer(state = initialState, action) {
    let newState = {};

    switch (action.type) {
        case GET_PICKUPS: {
            // console.log('+++++INSIDE REDUCER', action.postings)
            const newState = { ...state }
            for (const key in action.pickups) {
                newState[action.pickups[key].id] = action.pickups[key]
            }
            return newState;
        };
        // case GET_ONE_PICKUP: {
        //     const newState = {
        //         ...state,
        //         [action.pickups.id]: action.pickups
        //     };
        //     return newState;
        // };
        case GET_USER_PICKUPS: {
            action.pickups.forEach((pickup) => {
                newState[pickup.id] = pickup;
            });
            return newState;
        };
        case CREATE_PICKUP: {
            const newState = {
                ...state,
                [action.pickup.id]: action.pickup
            };
            return newState;
        };
        case UPDATE_PICKUP: {
            const newState = {
                ...state,
                [action.pickup.id]: action.pickup
            };
            return newState;
        };
        case DELETE_PICKUP: {
            const newState = { ...state };
            delete newState[action.pickup.id];
            return newState;
        };

        default:
            return state;
    };
};
