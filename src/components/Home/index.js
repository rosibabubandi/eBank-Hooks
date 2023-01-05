import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-main-container">
      <div className="home-header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        className="card-image"
        alt="digital card"
      />
    </div>
  )
}

export default Home
