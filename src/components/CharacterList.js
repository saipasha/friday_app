import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { onGetCharacters } from '../redux/actions/charsActions'

function CharacterList({onGetCharacters, characters, limit}) {  // Don't forget props are objects

  useEffect(()=>{
    onGetCharacters()
    setScrollListener()
  }, [])

  function setScrollListener() {
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          onGetCharacters()
      }
    }
  }

  return(
    <div>
      <ul>
        {characters.map( (char,index) => <li key={ index }> { char.name } </li> )}
      </ul>
      {limit && <img src="https://media1.tenor.com/images/62dbfcf39b0c122ce03583ec2a2a5d16/tenor.gif?itemid=12029785" alt="the end" />}
    </div>
  )

}

function mapStateToProps(state) {
  console.log(state)
  return {
    characters: Object.values(state.characters.chars),
    // ask for count and fetched and keep it in props 
    limit: state.characters.count === state.characters.fetched || state.characters.next === ""
  }
}

let mapDispatchToProps = {
  onGetCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)