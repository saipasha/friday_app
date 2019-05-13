import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { onGetCharacters, getSpecificPage } from '../redux/actions/charsActions'


class Paginated extends PureComponent{

  componentDidMount() {
    this.props.onGetCharacters()
  }

  render(){

    let pageName = `page${this.props.currentPage}`
    let pageIds = this.props.pages[pageName]

    return (
      <div style={{marginBottom: 50}}>
        <ul>
          {pageIds.map( (id,index) => <li key={ index }> { this.props.chars[id].name } </li> )}
        </ul>
        <span onClick={()=>{this.props.getSpecificPage(Number(this.props.currentPage-1))}}> Prev </span>
        <span>{" | "}</span>
        <span> {this.props.currentPage} </span>
        <span>{" | "}</span>
        <span onClick={()=>{this.props.getSpecificPage(Number(this.props.currentPage+1))}} > Next </span>
      </div>
    )
  }
}

// Whithin the connect we're returning the state of mapStateToProps and mapDispatchToProps

export default connect(state=>state.characters, {onGetCharacters, getSpecificPage})(Paginated)