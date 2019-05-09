import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserData, removeUserData } from '../redux/actions/userActions'

class Profile extends Component {

  constructor(){
    super()
    this.state = {
      // NOT NECESSARY because this keys live already in the Redux state.
      // name: "Icho",
      // email: "icho@icho.com",
      // bio: "What up, dawg!",
      editing: false,
    }
  }

  onChange = e => {
    let user = {
      name: this.props.name,
      email: this.props.email,
      bio: this.props.bio,
    }
    user[e.target.name] = e.target.value
    this.props.updateUserData(user)
  }

  render () {
    let { editing } = this.state
    let { name, email, bio } = this.props
    return(
      <div>
        <section>
          <h2>Profile stuff</h2>
        </section>
        {!editing ? <section>
          <h2>{name}</h2>
          <h3>{email}</h3>
          <p>{bio}</p>
          <button onClick={()=>this.setState({editing:true})}>EDIT</button>
        </section> :
          <section>
            <h2>Datos</h2>
            <form>
              <p>Nombre</p>
              <input onChange={ this.onChange } value={ name } type="text" name="name" />
              <p>Email</p>
              <input onChange={ this.onChange } value={ email } type="text" name="email" />
              <p>Bio</p>
              <input onChange={ this.onChange } value={ bio } type="text" name="bio" />
            </form>
              <button onClick={ ()=> this.setState({editing:false}) }>REDI</button>
              <button onClick={ ()=> this.props.removeUserData() }>ALV</button>
          </section> }
        <section>
          <h2>Feed</h2>
        </section>
      </div>
    )
  }
}

// This state from redux comes from the redux state. If the keys exist in the initial state it won't be undefined.
// It's a way to extract from redux and place the data into props

function mapStateToProps(state) {
  let { current } = state.users
  return {
    name: current.name,
    email: current.email,
    bio: current.bio,
  }
}

let actions = {
  updateUserData,
  removeUserData
}

export default connect(mapStateToProps, actions)(Profile)  // Connect is made and we deliver the component so it places everything in props.