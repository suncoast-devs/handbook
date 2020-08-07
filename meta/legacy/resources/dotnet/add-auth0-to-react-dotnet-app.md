---
title:
  Adding OAuth authentication to our application using
  [auth0](https://auth0.com)
---

_NOTE_ This assumes you created an `API` + `React` app using the `sdg-react`
template

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
  `https://localhost:5001/callback`
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
`auth0` account

```javascript
import auth0 from 'auth0-js'
import history from './history'

const DOMAIN = 'OURAPP.auth0.com'
const CLIENTID = 'xxxxxxxxx'

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
    // navigate to the home route
    history.replace('/')
  }

  handleAuthentication(callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)

        if (callback) {
          callback()
        }

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
- Insert the following lines

```javascript
import { createBrowserHistory } from 'history'

export default createBrowserHistory()
```

### Add Routes to our `<Router>` to work with login, logout, and callback

We want to add some new routes to our app.

- In `App.js` add

```javascript
import auth from './auth'
```

- To your router add these routes

```javascript
  <Route path="/login" render={() => auth.login()} />
  <Route
    path="/logout"
    render={() => {
      auth.logout()
      return <p />
    }}
  />
  <Route
    path="/callback"
    render={() => {
      auth.handleAuthentication(() => {
        // // NOTE: Uncomment the following lines if you are using axios
        // //
        // // Set the axios authentication headers
        // axios.defaults.headers.common = {
        //   Authorization: auth.authorizationHeader()
        // }
      })
      return <p />
    }}
  />
```

Now we can use the `/login` and `/logout` routes to allow the user to login or
logout. Additionally we can check if the user is authenticated and redirect them
to the `/login` page if we need to (e.g. ensuring that some parts of our app are
protected behind a login form) _NOTE_ Make sure if you are using axios to
include the import statement as well as uncommenting lines 193 & 194

```javascript
import axios from 'axios'
```

Now go to `index.js` and add

```javascript
import history from './history'
```

We need the auth component so we can allow the user to login, logout, and access
profile information. The `history` object will allow us to provide history to
our Router, and to modify it as necessary.

Because of that we will change from using the `BrowserRouter` to a simple
`Router` and provide our custom history object to it.

- In your import, change your `BrowserRouter` to a simple `Router`
- In your `render` function, change `<BrowserRouter>` tags to `<Router>`
- In your `render` function where `<Router>` is found, add the property
  `history={history}` to the `<Router>` tag/component.

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

## .NET API Setup

### Setting up the .NET environment to be ready to process our requests

Go the `StartUp.cs` file

After the line `app.UseHttpsRedirection();`

Add:

```csharp
      app.UseAuthentication();
```

Next, add to your `ConfigurationServices` method

```csharp

 services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

      }).AddJwtBearer(options =>
      {
        options.Authority = "DOMAIN";
        options.Audience = "CLIENTID";
      });

```

You will have to add the correct `using` statement.

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
```

Replace `DOMAIN` with the same domain you used in the client app and replace
`CLIENTID` with the client ID that you used in the client app _NOTE_ This time
when setting the `DOMAIN` be sure to include `Https://`.

### Restricting endpoints

### Access the current user

By setting this up, we are given access the the `User` object in our
controllers. That `User` object has a list of `Claims` and these claims are all
the information we have about that user.

That means that if we the userId for the current user it would look like this:

```csharp

[Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class SecretController : ControllerBase
  {
    [HttpGet]
    public object Get()
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      return new {userId = userId, message="only logged in users can see this"};
    }
  }
```

_NOTE:_ We can use `attributes` to secure out endpoints.

## Full Code example:

https://github.com/mdewey/Auth0Example.git
