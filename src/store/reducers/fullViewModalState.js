const openFullViewModalStateReducer = (state = false, action) => {
    switch (action.type) {
    case 'UPDATE_OPEN_FULL_VIEW_MODAL_STATE':
        return action.value;
    default:
        return state;
    }
};

export default openFullViewModalStateReducer;
