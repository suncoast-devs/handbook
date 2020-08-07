---
title:
  Adding OAuth authentication to our application using
  [auth0](https://auth0.com)
---

_NOTE_ This assumes you created an `API` only style Rails application

_NOTE_ This also assumes you have
[React Router](https://github.com/ReactTraining/react-router) installed in your
React client

## Configuring auth0 service

- Login (or signup)
- You will be asked to choose a domain name
- Create a new application
- Choose an application name
- Select `Single Page Web App` as the application type
- Select the `settings` tab. Scroll down to `Allowed Callback URLs` and enter
  `http://localhost:3001/callback`
- Make note of your `domain` and your `Client ID` values

## React Front End

In this section we will configure our React front end to

- integrate with the Auth0 interface
- Add routes to handle the login, logout, and `callback` from Auth0

### Add auth0 to our client application

Inside the _client_ folder (cd client)

```shell
npm install --save auth0-js
```

_NOTE_ Restart your `npm start` if it was already running

### Create a class to interact with the Auth0 API

- In the React app create an `Auth` class in `src/auth.js`

_NOTE_ Replace the value of `DOMAIN` with the domain from your `auth0` account
_NOTE_ Replace the value of `CLIENTID` with the configured client id from your
`auth0` account _NOTE_ Replace the value of `AFTER_LOGIN` with the React route
to go to after a successful login _NOTE_ Replace the value of `FAILED_LOGIN`
with the React route to go to after a failed login _NOTE_ Replace the value of
`AFTER_LOGOUT` with the React route to go to after a successful logout

```javascript
import auth0 from 'auth0-js'
import history from './history'

const DOMAIN = 'OURDOMAIN.auth0.com'
const CLIENTID = 'xxxxxxxxx'
const AFTER_LOGIN = '/'
const AFTER_LOGOUT = '/'

class Auth {
  userProfile

  auth0 = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENTID,
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    responseType: 'token id_token',
    scope: 'openid email profile',
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

    window.location = AFTER_LOGOUT
  }

  handleAuthentication(callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)

        if (callback) {
          callback()
        }

        window.location = AFTER_LOGIN
      } else if (err) {
        window.location = FAILED_LOGIN
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

  getIdToken() {
    const idToken = localStorage.getItem('id_token')
    if (!idToken) {
      throw new Error('No ID Token found')
    }
    return idToken
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
    return `Bearer ${this.getIdToken()}`
  }
}

const auth = new Auth()

export default auth
```

- Create `src/history.js`

```javascript
import createHistory from 'history/createBrowserHistory'

export default createHistory()
```

### Add Routes to our `<Router>` to work with login, logout, and callback

- In the component that contains your `Router`, add the following

```javascript
import auth from './auth'

import history from './history'
```

We need the auth component so we can allow the user to login, logout, and access
profile information. The `history` object will allow us to provide history to
our Router, and to modify it as necessary.

Because of that we will change from using the `BrowserRouter` to a simple
`Router` and provide our custom history object to it.

- In your import, change your `BrowserRouter` to a simple `Router` (e.g.
  `BrowserRouter as Router` to just `Router`)

- In your `render` function where `<Router>` is found, change this to
  `<Router history={history}>`

- To your router add these routes

```javascript
  <Route path="/login" render={() => auth.login()} />
  <Route
    path="/logout"
    render={() => {
      auth.logout()

      return <></>
    }}
  />
  <Route path="/callback" render={() => {
      auth.handleAuthentication(() => {
        // NOTE: Uncomment the following lines if you are using axios
        //       to set the axios authentication headers

        // axios.defaults.headers.common = {
        //   Authorization: auth.authorizationHeader()
        // }
      })

      return <></>
    }}
  />
```

Now we can use the `/login` and `/logout` routes to allow the user to login or
logout. Additionally we can check if the user is authenticated and redirect them
to the `/login` page if we need to (e.g. ensuring that some parts of our app are
protected behind a login form)

### Setup axios to provide custom Authorization headers for every request.

To do this, add this code in your `App` `componentWillMount` callback. It will
ensure every axios request will include the authorization header to let our
backend know our identity.

```javascript

componentWillMount() {
  if (auth.isAuthenticated()) {
    axios.defaults.headers.common = {
      Authorization: auth.authorizationHeader()
    }
  }
}
```

_NOTE_ If you are using fetch, or if you do not want to set the common headers,
you must provide the `Authorization` header on every request.

## Rails Backend Setup

### Setting up the Rails environment to be ready to process our requests

Before we get started we need to add the following gem to our `Gemfile`:

```shell
bundle add jwt
```

_NOTE_ You must then restart the Rails application

### Add a way to find a current user

In our Rails application we need a way to access the currently active user. We
will do this by adding a _private_ method to `ApplicationController` that
fetches the currently authenticated user.

_NOTE_ In the instructions below if you called your `User` model `Profile` or
such, use that class name in place of `User`

In the file `app/controllers/application_controller.rb`

```ruby
  private

  def current_user
    @user ||= begin
      token = request.headers["Authorization"].to_s.split(" ").last
      payload, header = *JSONWebToken.verify(token)

      User.from_auth_hash(payload)
    end
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
```

### If you don't already have a User model in your app ...

If you have not created a model for the user yet, you should do so now.

You should include the user's `name`, and their `auth_sub`. The `auth_sub` is
the `OAuth` identifier for the user. It includes the service (google, facebook,
twitter) and their identifier on that service. It is the column we lookup users
by and is mandatory.

You may also want to add other columns such as `email`, etc.

_NOTE_ If you already have a User model, do not do this step.

```shell
rails generate model User name:string email:string auth_sub:string
```

### If you already have a User model ...

We need to add the `auth_sub` column on our `User` (or `Profile` or etc) model:

```shell
rails generate migration AddAuthSubToUser auth_sub:string
```

### Add a method to the User (Profile, etc) class to find or create the account

This code needs our `User` class to be able to find (or create) a user. So, in
your `User` ActiveRecord class add the following code. _NOTE_ that inside the
`do` block is where you would capture any user specific information such as
`avatar`, `name`, `email`, etc.

```ruby
# Add this code *within* the `class` definition
def self.from_auth_hash(payload)
  User.find_or_create_by(auth_sub: payload["sub"]) do |user|
    # This code will be called whenever we create a User for the first time.

    # This code would save a user's avatar as a URL
    # user.avatar_url = payload["picture"]

    # This code would attach an ActiveStorage profile image by downloading the user's profile and storing it locally
    # If you do this, you must also run `bundle add down` to add the `down` gem
    #
    # begin
    #   picture = Down.download(payload["picture"])
    #   user.profile_image.attach(io: picture, filename: picture.original_filename)
    # rescue Down::Error => exception
    #   Rails.logger.info exception
    # end

    # This code would store their email address
    # user.email = payload["email"]

    # Capture the user's name
    user.name = payload["name"]
  end
end
```

### Payload example

Here is an example of what is in the `payload` variable.

```ruby
{
  "given_name"     => "Gavin",
  "family_name"    => "Stark",
  "nickname"       => "gavin",
  "name"           => "Gavin Stark",
  "picture"        => "https://lh3.googleusercontent.com/-c6NG56mpFhk/AAAAAAAAAAI/AAAAAAAAAfI/fMqUEK6ZmOI/photo.jpg",
  "gender"         => "male",
  "locale"         => "en",
  "updated_at"     => "2019-01-14T15:37:55.567Z",
  "email"          => "gavin@gstark.com",
  "email_verified" => true,
  "iss"            => "https://gstark.auth0.com/",
  "sub"            => "google-oauth2|113743542470462017512",
  "aud"            => "sPmodN6xIAdBYJuCZczXxKXqf0Bwht81",
  "iat"            => 1547480275,
  "exp"            => 1547516275,
  "at_hash"        => "jivTOKfCQHcnVtdTwo0qUA",
  "nonce"          => "fYMdfd_HsH2FMQjBilfGyCX0LP_Y7vPn"
}
```

### Add the JWT support code

Next we need a class, `JSONWebToken` in the file `app/lib/json_web_token.rb`
that can parse the jwt and present a payload and header

_NOTE_ Replace the _two_ instances of the text `OURDOMAIN` with the domain name
you created in auth0

```ruby
require "net/http"
require "uri"

class JSONWebToken
  def self.verify(token)
    JWT.decode(token, nil,
              true,
              algorithm: "RS256",
              iss: "https://OURDOMAIN.auth0.com/",
              verify_iss: true) do |header|
      jwks_hash[header["kid"]]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("https://OURDOMAIN.auth0.com/.well-known/jwks.json")

    jwks_keys = Array(JSON.parse(jwks_raw)["keys"])

    jwks_keys.map { |key| [key["kid"], OpenSSL::X509::Certificate.new(Base64.decode64(key["x5c"].first)).public_key] }.to_h
  end
end
```
