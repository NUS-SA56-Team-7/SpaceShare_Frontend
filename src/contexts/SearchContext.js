import { createContext, useEffect, useState } from 'react';

/* Context */
const SearchContext = createContext();
export default SearchContext;

/* Context Provider */
export const SearchContextProvider = (props) => {

    /* useState */
    const [searchKeyword, setSearchKeyword] = useState();

    /* Context Values */
    const value = {
        searchKeyword, setSearchKeyword,
    };

    return (
        <SearchContext.Provider value={value}>
            {props.children}
        </SearchContext.Provider>
    );
}