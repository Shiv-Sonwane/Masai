import React from "react";

function SearchBar({value,onChange,onSearch,loading}){
    return(
        <form onSubmit={(e)=>{
            e.preventDefault
            onSearch()
            }}
            style={{display:'flex',gap:8}}>

                <input className='input'
                type="text" 
                placeholder="Search Movie Title..."
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                disabled={loading}
                />
                <button className="btn" type="submit" disabled={loading}>
                    {loading?'Searching...':'Search'}
                </button>

        </form>
    )
}

export default SearchBar;