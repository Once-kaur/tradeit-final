import { useState } from "react";
const Search=()=> {
    const [search,setsearch]=useState("");
   
    const handleChange=(e)=>
    {
        e.preventDefault();
        setsearch(e.target.value);
        
    }
    const onSearch=()=>{
        if(search.length==0)
        alert("invalid search");
    }
    return ( <>
    
    <input type='search'  autoComplete='off' placeholder="Search here" onChange={handleChange} name="password" id="password" required></input>
    <button type="submit" onClick={()=>onSearch()}>Search</button>
    </> );
}

export default Search;