import React from 'react';

const SearchBox=(props)=>{
    return(
        <input type="text" 
        placeholder="Search..."  
        onChange={props.handleChange}/>
    )
}

export default SearchBox;