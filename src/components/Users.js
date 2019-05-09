import React from 'react'
import { connect } from 'react-redux'

function Users({users, fetched}){
  return <div>
    <h2>Users List</h2>
    {!fetched && <img src="https://i.redd.it/ounq1mw5kdxy.gif" />}
    <ul>
      {fetched && users.map( (item, index) => <img key={index} src={item.image} /> )}
    </ul>
  </div>
}

function mapStateToProps(state){
  return {
    users: state.users.array,
    fetched: state.users.array.length > 1
  }
}

export default connect(mapStateToProps)(Users)

// Taking things from the store