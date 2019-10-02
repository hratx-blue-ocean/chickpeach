const defaultState = {
  query: '',
  searchResults: []
};

const searchData = (state = defaultState, action) => {
  if (action.type === 'setQuery') {
    let newState = {
      query: action.query,
      searchResults: state.searchResults
    }
    return newState;
  }

  if (action.type === 'setSearch') {
    let newState = {
      query: state.query,
      searchResults: action.searchResults
    }
    return newState;
  }
  
  return state;
};

export default searchData;