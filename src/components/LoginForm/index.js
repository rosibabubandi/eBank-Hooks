import {useState} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = props => {
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onLoginSuccess = jwtToken => {
    const {history} = props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onLoginFailure = errorMessage => {
    setShowErrorMsg(true)
    setErrorMsg(errorMessage)
  }

  const onSubmitUserDetails = async event => {
    event.preventDefault()

    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const userDetails = {
      user_id: userId,
      pin,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const responseData = await response.json()

    if (response.ok) {
      onLoginSuccess(responseData.jwt_token)
    } else {
      onLoginFailure(responseData.error_msg)
    }
    setUserId('')
    setPin('')
  }

  const getUserIdField = () => (
    <>
      <label htmlFor="userId" className="label-element">
        User ID
      </label>
      <input
        type="text"
        id="userId"
        className="input-element"
        value={userId}
        onChange={event => setUserId(event.target.value)}
        placeholder="Enter User ID"
      />
    </>
  )

  const getPinField = () => (
    <>
      <label htmlFor="pin" className="label-element">
        PIN
      </label>
      <input
        type="password"
        id="pin"
        className="input-element"
        value={pin}
        onChange={event => setPin(event.target.value)}
        placeholder="Enter PIN"
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-main-container">
      <div className="login-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          className="login-page-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={onSubmitUserDetails}>
          <h1 className="form-heading">Welcome Back!</h1>
          {getUserIdField()}
          {getPinField()}
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="error-msg-container">
            {showErrorMsg && <p className="error-msg-text">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(LoginForm)
