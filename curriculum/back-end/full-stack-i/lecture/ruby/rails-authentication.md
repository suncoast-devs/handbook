# Simple Authentication with Bcrypt

## Steps

1. Create a user model with `name`, `email` and `password_digest` with: `rails generate model user name email password_digest`

2. Run `rails db:migrate`

3. Add these routes below

   ```ruby
   # Path: config/routes.rb

     get '/signup' => 'users#new'
     post '/users' => 'users#create'
   ```

4. Create a users controller with a new and create action:

   ```ruby
   # Path: app/controllers/users_controller.rb

   class UsersController < ApplicationController

     def new
       @user = User.new
     end

     def create
       user = User.new(user_params)
       if user.save
         session[:user_id] = user.id
         redirect_to root_path
       else
         redirect_to signup_path
       end
     end

   private

     def user_params
       params.require(:user).permit(:name, :email, :password, :password_confirmation)
     end
   end
   ```

5. Now create the view file where we put the signup form.

   ```HTML+ERB
   <!-- Path: app/views/users/new.html.erb -->

   <div class="page-header">
     <h1>Signup!</h1>
   </div>

   <%= form_for(@user, html: { class: "form-horizontal", role: "form" }) do |f| %>
     <div class="form-group">
       <%= f.label :name, class: "col-sm-2 control-label" %>
       <div class="col-sm-10">
         <%= f.text_field :name, class: "form-control" %>
       </div>
     </div>
     <div class="form-group">
       <%= f.label :email, class: "col-sm-2 control-label" %>
       <div class="col-sm-10">
         <%= f.text_field :email, class: "form-control" %>
       </div>
     </div>
     <div class="form-group">
       <%= f.label :password, class: "col-sm-2 control-label" %>
       <div class="col-sm-10">
         <%= f.password_field :password, class: "form-control" %>
       </div>
     </div>
     <div class="form-group">
       <%= f.label :password_confirmation, class: "col-sm-2 control-label" %>
       <div class="col-sm-10">
         <%= f.password_field :password_confirmation, class: "form-control" %>
       </div>
     </div>
     <%= f.submit "Submit", class: "btn btn-primary" %>
   <% end %>
   ```

6. Uncomment 'bcrypt' in the Gemfile

7. Add `has_secure_password` to add encryption of the user's password

   ```ruby

   # Path: app/models/user.rb

   class User < ActiveRecord::Base
     has_secure_password
   end
   ```

8. Run `bundle install`

9. Create a sessions controller to `create` (login) and `destroy` (logout) sessions.

   ```ruby
   # Path: app/controllers/sessions_controller.rb

   class SessionsController < ApplicationController

     # logging in
     def new
     end

     # handle the post from the login page
     def create
       # Extract the email and password from the params
       email = params[:email]
       password = params[:password]

       # Find the user by their email
       user = User.find_by(email: email)

       # If we found a user and their password checks out
       if user && user.authenticate(password)
         # Save the user_id in the session cookie
         session[:user_id] = user.id

         # logged in!
         redirect_to root_path
       else
         # Nope, something went wrong
         redirect_to login_path
       end
     end

     # logout
     def destroy
       # Remove their user_id from the session
       session[:user_id] = nil
       redirect_to root_path
     end
   end
   ```

10. Create a form for user's to login with.

    ```HTML+ERB

    <!-- path: app/views/sessions/new.html.erb -->

    <div class="page-header">
      <h1>Login</h1>
    </div>

    <%= form_tag(login_path, html: { class: "form-horizontal", role: "form" }) do %>
      <div class="form-group">
        <%= label_tag :email, class: "col-sm-2 control-label" %>
        <div class="col-sm-10">
          <%= text_field_tag :email, class: "form-control" %>
        </div>
      </div>
      <div class="form-group">
        <%= label_tag :password, class: "col-sm-2 control-label" %>
        <div class="col-sm-10">
          <%= password_field_tag :password, class: "form-control" %>
        </div>
      </div>
      <%= submit_tag "Submit", class: "btn btn-primary" %>
    <% end %>
    ```

11. Update your routes file to include new routes for the session controller.

    ```ruby
    # Path: config/routes.rb

      get '/login'  => 'sessions#new'
      post '/login' => 'sessions#create'
      get '/logout' => 'sessions#destroy'
    ```

12. We will add a few methods to the ApplicationController to allow us to find the current user.

    ```ruby
    # Path: app/controllers/application_controller.rb

    class ApplicationController < ActionController::Base

      # Returns the current use if logged in
      def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
      end
      helper_method :current_user

      # Returns a boolean representing if the user is logged in
      def logged_in?
        !!current_user
      end
      helper_method :logged_in?

      # Method to use in a filter to ensure the user is logged in
      def authorize!
        redirect_to login_path unless logged_in?
      end
    end
    ```

13. Now we can add a `before_filter` to ensure we authorize the user. We _could_ add this to the ApplicationController but then we would have to _exclude_ this from controllers that do _not_ require login (e.g. user controller, session controller, homepage controller, etc.)

    ```ruby
    # path: app/controller/widgets_controller.rb

    # This is just an example controller, you would add this to your *own* controller files
    class WidgetsController < ApplicationController
      before_filter :authorize!
    end
    ```

14. We can use the `current_user` and `logged_in?` methods to customize pages, even the appliction layout file

    ```HTML+ERB

    <!-- Path: app/views/layouts/application_layout.html.erb -->
    <% if logged_in? %>
      Logged in: <%= current_user.email %> | <%= link_to "Logout", logout_path %>
    <% else %>
      <%= link_to 'Login', login_path %> | <%= link_to 'Signup', signup_path %>
    <% end %>
    ```
