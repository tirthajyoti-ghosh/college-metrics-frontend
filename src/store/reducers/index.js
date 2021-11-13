import { combineReducers } from 'redux';

import openDetailsSectionState from './openDetailsSectionState';
import selectedCollegeId from './selectedCollegeId';
import tableDataType from './tableDataType';

export default combineReducers({
    isOpenDetailsSection: openDetailsSectionState,
    selectedCollegeId,
    tableDataType,
});
