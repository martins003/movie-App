import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div>
      <div className='search'>
        <div>
         <img src="search.svg" alt="" />
         <input type="text" 
         placeholder='search through thousands of movies'
         value={searchTerm}
         onChange={(event) => setSearchTerm(event.target.value)}/>
        </div>
      </div>
    </div>
  )
}

export default search
