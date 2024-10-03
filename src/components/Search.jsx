import React from 'react'

const Search = ({searchProduct,search}) => {
  return (
    <div className = 'search__Wrapper'>
        <input type = 'search' 
            value = {search}
            onChange = {() => searchProduct(e.target.value)}
            placeholder = 'enter the element which you want to search'
        />
    </div>
  )
}

export default Search