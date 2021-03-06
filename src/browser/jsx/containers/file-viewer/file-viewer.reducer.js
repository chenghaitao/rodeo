import _ from 'lodash';
import cid from '../../services/cid';
import mapReducers from '../../services/map-reducers';

const initialState = {
  id: cid(),
  path: '~',
  files: [],
  showDotFiles: false
};

function setFileList(state, action) {
  state = _.clone(state);
  state.files = action.files;
  state.path = action.path;

  return state;
}

function selectFile(state, action) {
  const target = action.file;

  if (target && !target.isSelected) {
    state = _.clone(state);
    state.files = _.map(state.files, item => {
      item.isSelected = (item.filename === target.filename);
      return item;
    });
  }

  return state;
}

/**
 * @param {object} state
 * @param {string} propertyName
 * @param {*} value
 * @returns {object}
 */
function changeProperty(state, propertyName, value) {
  state = _.cloneDeep(state);

  _.set(state, propertyName, value);

  return state;
}

function changePreference(state, action) {
  switch (action.key) {
    case 'showDotFiles': return changeProperty(state, 'showDotFiles', action.value);
    default: return state;
  }
}

export default mapReducers({
  LIST_VIEWED_FILES: setFileList,
  SELECT_VIEWED_FILE: selectFile,
  CHANGE_PREFERENCE: changePreference
}, initialState);
