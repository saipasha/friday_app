import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { onGetCharacters } from '../redux/actions/charsActions'

function CharacterList({onGetCharacters, characters}) {  // Don't forget props are objects

  useEffect(()=>{
    onGetCharacters()
  }, [])

  function loadMore() {
      onGetCharacters()
  }

  return(
    <div>
      <ul>
        {characters.map( (char,index) => <li key={ index }> { char.name } </li> )}
      </ul>
      <button onClick={loadMore}> Load More </button>
    </div>
  )

}

function mapStateToProps(state) {
  console.log(state)
  return {
    characters: Object.values(state.characters.chars)
  }
}

let mapDispatchToProps = {
  onGetCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)