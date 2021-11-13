const modalTableDataReducer = (state = false, action) => {
    switch (action.type) {
    case 'UPDATE_MODAL_TABLE_DATA':
        return action.value;
    default:
        return state;
    }
};

export default modalTableDataReducer;
