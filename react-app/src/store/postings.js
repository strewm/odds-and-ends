// ------------------- Action types ------------------- //
const GET_POSTINGS = 'posts/GET_POSTINGS';
const GET_ONE_POSTING = 'posts/GET_ONE_POSTING';
const GET_USER_POSTINGS = 'posts/GET_USER_POSTINGS';
const CREATE_POSTING = 'posts/CREATE_POSTING';
const UPDATE_POSTING = 'posts/UPDATE_POSTING';
const DELETE_POSTING = 'posts/DELETE_POSTING';



// ------------------- Action creators ------------------- //
const getPostings = postings => ({
    type:GET_POSTINGS,
    postings
})

const getOnePosting = posting => ({
    type: GET_ONE_POSTING,
    posting
});

const getUserPostings = postings => ({
    type: GET_USER_POSTINGS,
    postings
});

const createPosting = posting => ({
    type: CREATE_POSTING,
    posting
});

const updatePosting = posting => ({
    type: UPDATE_POSTING,
    posting
});

const deletePosting = posting => ({
    type: DELETE_POSTING,
    posting
});



// ------------------- Thunk creators ------------------- //
export const getAllPostings = () => async dispatch => {
    const response = await fetch(`/api/postings/all`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getPostings(data));
        return data;
    }
};

export const getSinglePosting = (postingId) => async (dispatch) => {
    const response = await fetch(`/api/postings/${postingId}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        // console.log('====RESPOOOOOONSE', data)

        dispatch(getOnePosting(data));
        return data;
    }
};

export const getUserPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/postings/user/${userId}/postings`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getUserPostings(data));
        return data;
    }
};

export const addPosting = ({user_id, address, city, state, zipcode, title, caption, icon}) => async dispatch => {
    const response = await fetch(`/api/postings/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            address,
            city,
            state,
            zipcode,
            title,
            caption,
            icon
        })
    });

    // console.log('INSIDE STOOOOOOOOOORE', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(createPosting(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            // console.log('HEYYYYYYYYYY', data.errors)
            return data.errors;
        };
    }
};

export const updateOnePosting = ({posting_id, address, city, state, zipcode, title, caption, icon}) => async dispatch => {
    const response = await fetch(`/api/postings/${posting_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            posting_id,
            address,
            city,
            state,
            zipcode,
            title,
            caption,
            icon
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updatePosting(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            // console.log('HEYYYYYYYYYY', data.errors)
            return data.errors;
        };
    }
};

export const deleteOnePosting = postingId => async dispatch => {
    const response = await fetch(`/api/postings/${postingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deletePosting(data));
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
        case GET_POSTINGS: {
            // console.log('+++++INSIDE REDUCER', action.postings)
            const newState = { ...state }
            for (const key in action.postings) {
                newState[action.postings[key].id] = action.postings[key]
            }
            return newState;
        };
        case GET_ONE_POSTING: {
            const newState = {
                ...state,
                [action.posting.id]: action.posting
            };
            return newState;
        };
        case GET_USER_POSTINGS: {
            action.postings.forEach((posting) => {
                newState[posting.id] = posting;
            });
            return newState;
        };
        case CREATE_POSTING: {
            const newState = {
                ...state,
                [action.posting.id]: action.posting
            };
            return newState;
        };
        case UPDATE_POSTING: {
            const newState = {
                ...state,
                [action.posting.id]: action.posting
            };
            return newState;
        };
        case DELETE_POSTING: {
            const newState = { ...state };
            delete newState[action.posting.id];
            return newState;
        };

        default:
            return state;
    };
};
