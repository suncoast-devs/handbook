# Adding OAuth authentication to our application using [auth0](https://auth0.com)

*NOTE* This assumes you created an `API` only style Rails application

*NOTE* This also assumes you have [React Router](https://github.com/ReactTraining/react-router) installed in your React client

## Add auth0 to our client application

Inside the *client* folder (cd client)

```sh
yarn add auth0-js
```

## Configuring auth0 service

- Login (or signup)
- You will be asked to choose a domain name
- Create a new application
- Choose an application name
- Select `Single Page Web App` as the application type
- Select the `settings` tab. Scroll down to `Allowed Callback URLs` and enter `http://localhost:3000`
- Make note of your `domain` and your `Client ID` values

## React Front End

In this section we will configure our React front end to
- integrate with the Auth0 interface
- Add routes to handle the login, logout, and `callback` from Auth0

## Create a class to interact with the Auth0 API

- In the React app create an `Auth` class in `src/auth.js`

*NOTE* Replace the value of `DOMAIN` with the domain from your `auth0` account
*NOTE* Replace the value of `CLIENTID` with the configured client id from your `auth0` account

```js
import auth0 from 'auth0-js'
import history from './history'

const DOMAIN = 'OURAPP.auth0.com'
const CLIENTID= 'xxxxxxxxx'

export default class Auth {
  userProfile

  auth0 = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENTID,
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    responseType: 'token id_token',
    scope: 'openid email profile'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.replace('/')
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No Access Token found')
    }
    return accessToken
  }

  //...
  getProfile(cb) {
    let accessToken = this.getAccessToken()
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile
      }
      cb(err, profile)
    })
  }

  authorizationHeader() {
    return `Bearer ${this.getAccessToken()}`
  }
}
```

- Create `src/history.js`

```js
import createHistory from 'history/createBrowserHistory'

export default createHistory()
```

## Add Routes to our `<Router>` to work with login, logout, and callback

- In the component that contains your `Router`, add the following

```js
import Auth from './auth'
import history from './history'

const auth = new Auth()
```

We need the auth component so we can allow the user to login, logout, and access profile information. The `history` object will allow us to provide history to our Router, and to modify it as necessary.

Because of that we will change from using the `BrowserRouter` to a simple `Router` and provide our custom history object to it.

- In your import, change your `BrowserRouter` to a simple `Router` (e.g.  `BrowserRouter as Router` to just `Router`)

- In your `render` function where `<Router>` is found, change this to `<Router history={history}>`

- To your router add these routes

```js
  <Route path="/login" render={() => auth.login()} />
  <Route path="/logout" render={() => auth.logout()} />
  <Route path="/callback" render={() => {
      auth.handleAuthentication()

      return <></>
    }}
  />
```

Now we can use the `/login` and `/logout` routes to allow the user to login or logout. Additionally we can check if the user is authenticated and redirect them to the `/login` page if we need to (e.g. ensuring that some parts of our app are protected behind a login form)

## Change your code to route the user to auth

- To have the user login, send them to the `/login` route

Now every time we make a request to the backend we should include information about our identity. This allows the backend to identify which User/Profile/Account in the database the current user is associated with. In order to do this we update every API request to include a `header` with an `Authorization` header equal to `Bearer ${token}`` where `${token}` is the `auth0` token.

For example:

```js
  axios.get('/tacos').then(response => {
    console.log(response.data)
  }
```

becomes

```js
  axios.get('/tacos', {}, {
    headers: {
      Authorization: auth.authorizationHeader()
    }
  }).then(response => {
    console.log(response.data)
  })
```

*NOTE* If you are using `axios` as your library for web requests you can set this header globally and not have to repeat it for every request.

To do this, add this code in your `App` `componentWillMount` callback. It will ensure every axios request will include the authorization header to let our backend know our identity.

```js
const auth = new Auth()

if (auth.isAuthenticated()) {
  axios.defaults.headers.common = {
    Authorization: auth.authorizationHeader()
  }
}
```

## Add a way to find a current user

In our Rails application we need a way to access the currently active user. We will do this by adding a *private* method to `ApplicationController` that fetches the currently authenticated user.

*NOTE* In the instructions below if you called your `User` model `Profile` or such, use that class name in place of `User`

In the file `app/controllers/application_controller.rb`

```ruby
  private

  def current_user
    token = request.headers["Authorization"].to_s.split(" ").last
    payload, header = *JSONWebToken.verify(token)

    User.from_auth_hash(payload)
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
```

This code needs our `User` class to be able to find (or create) a user. So, in your `User` ActiveRecord class add the following code. *NOTE* that inside the `do` block is where you would capture any user specific information such as `avatar`, `name`, `email`, etc.

```ruby
def self.from_auth_hash(payload)
  User.find_or_create_by(auth_sub: payload["sub"]) do |user|
    user.avatar_url = payload["picture"]
    user.name = payload["given_name"]
  end
end
```

This code needs the `JWT` library so we will add the `jwt` gem to the Gemfile

Next we need a class, `JSONWebToken` in the file `lib/json_web_token.rb` that can parse the jwt and present a payload and header

```ruby
require "net/http"
require "uri"

class JSONWebToken
  def self.verify(token)
    JWT.decode(token, nil,
              true,
              algorithm: "RS256",
              iss: "https://OURAPP.auth0.com/",
              verify_iss: true) do |header|
      jwks_hash[header["kid"]]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("https://OURAPP.auth0.com/.well-known/jwks.json")

    jwks_keys = Array(JSON.parse(jwks_raw)["keys"])

    jwks_keys.map { |key| [key["kid"], OpenSSL::X509::Certificate.new(Base64.decode64(k["x5c"].first)).public_key] }.to_h
  end
end
```

