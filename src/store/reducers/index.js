import { combineReducers } from 'redux';

import openDetailsSectionState from './openDetailsSectionState';
import fullViewModalState from './fullViewModalState';
import selectedCollegeId from './selectedCollegeId';
import modalTableData from './modalTableData';

export default combineReducers({
    isOpenDetailsSection: openDetailsSectionState,
    selectedCollegeId,
    isOpenFullViewModal: fullViewModalState,
    modalTableData,
});
