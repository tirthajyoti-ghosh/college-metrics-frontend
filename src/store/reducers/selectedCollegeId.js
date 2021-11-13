const selectedCollegeIdReducer = (state = null, action) => {
    switch (action.type) {
    case 'UPDATE_SELECTED_COLLEGE_ID':
        return action.value;
    default:
        return state;
    }
};

export default selectedCollegeIdReducer;
