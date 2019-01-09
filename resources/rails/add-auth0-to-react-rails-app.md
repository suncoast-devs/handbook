https://github.com/benjaminkent/findabro/commit/a802020fe04a0f01607eec898032fc860059a916#diff-8b7db4d5cc4b8f6dc8feb7030baa2478

## Add a way to find a current user

In our Rails application we need a way to access the currently active user. We will do this by adding a *private* method to `ApplicationController` that fetches the currently authenticated user.

*NOTE* In the instructions below if you called your `User` model `Profile` or such, use that class name in place of `User`

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

Next we need a class, `JSONWebToken` in the file `app/lib/json_web_token.rb` that can parse the jwt and present a payload and header

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

## React Front End

- Every API request needs to include a `header` with `Authorization: `Bearer ${token}`` where `${token}` is the `auth0` token.

```js
axios.post(url, parameters, {
  headers: {
    Authorization: `Bearer ${token}'
  }
})
```

- In the React app create an `Auth` object, typically `src/auth.js`

```js
import auth0 from 'auth0-js'
import history from './history'

export default class Auth {
  userProfile

  auth0 = new auth0.WebAuth({
    domain: 'OURAPP.auth0.com',
    clientID: 'OURKEY',
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
}
```

- Create `src/history.js`

```js
import createHistory from 'history/createBrowserHistory'

export default createHistory()
```

