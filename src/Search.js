import React, { useState } from 'react';

const Search = ({ searchText }) => {

    const [text , setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

     searchText(text);
    }

    return (
        <div>
           <form onSubmit={handleSubmit}>
               <input type='text' placeholder='news'  className='py-1 px-2 ' onChange={(e) => setText(e.target.value)} />
               <button type='submit' className='bg-primary py-1 px-2 rounded text-light fw-bold'>Search</button>
           </form>
        </div>
    );
}

export default Search;
