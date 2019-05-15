# Mac OS X - Setting up your Development Environment

## Terminal

Terminal.app is the application that allows us to run our `shell` -- the default shell we will use is called `bash`

A shell is a program that allows us to interact with our computer by executing commands and seeing the results. For a tutorial on using a shell, see [this page](/handbook/skills/command-line)

## How

Using either Finder or Spotlight, start the `Terminal` application.

Lets do some configuration to give us a nice user interface.

- Open preferences by selecting "Preferences" from the "Terminal" menu
- Click the `Profiles` icon
- Click on "Pro" entry in the list that appears on the left
- Click the "default" button which is found underneath the list
- Ensure `Antialias text` is selected
- If you want a larger font, click the "Change" button next to the font name and choose a larger font size.
- Click the area to the left "Color & Effects" found within the "Background" section
- Change `Opacity` to 100%
- Close the popup window
- Close Preferences
- Exit Terminal application

Now restart Terminal application. The background should be a solid black color.

If you haven't previously configured your command prompt, copy and paste the following command into terminal:

```sh
echo WyAtZiAvdXNyL2xvY2FsL2V0Yy9iYXNoX2NvbXBsZXRpb24uZC9naXQtY29tcGxldGlvbi5iYXNoIF0gJiYgc291cmNlIC91c3IvbG9jYWwvZXRjL2Jhc2hfY29tcGxldGlvbi5kL2dpdC1jb21wbGV0aW9uLmJhc2gKWyAtZiAvdXNyL2xvY2FsL2V0Yy9iYXNoX2NvbXBsZXRpb24uZC9naXQtcHJvbXB0LnNoIF0gJiYgc291cmNlIC91c3IvbG9jYWwvZXRjL2Jhc2hfY29tcGxldGlvbi5kL2dpdC1wcm9tcHQuc2gKCiMgUHJvbXB0IHdpdGggZnVsbCBwYXRoIGFuZCBnaXQgc3RhdHVzCmV4cG9ydCBQUzE9J1xbXGVbMDszMm1cXVx3IFxbXGVbMDszMW1cXSQoX19naXRfcHMxICIoJXMpIiAyPi9kZXYvbnVsbCkgXFtcZVswOzMzbVxdXCQgXFtcZVswOzAwbVxdJwoKIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyBSdWJ5IEdlbSBlbnN1cmUgcGF0aAojLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKZXhwb3J0IFBBVEg9IiQoZ2VtIGVudiBnZW1kaXIgMj4vZGV2L251bGwpL2JpbjokUEFUSCIK | base64 -D >> ~/.bash_profile
```

Now restart the Terminal application.

## Homebrew

Homebrew is an easy, terminal based way of installing apps to our Mac. It helps us, as developers, manage the apps and tools we use to create software.

This will be how will install many of the other tools.

Start Terminal application and copy the following line and paste it into your terminal window

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

The installation may prompt you for your password several times (your password won't show on screen when you type it) and it may take a while to complete the installation

## Git

Git is a distributed source control system. This allows us to work on and collaborate on different projects with little to no headache.

Git is how we will be managing our files and sharing code between each other. It will seem rough at first but with practice, you will never know how any else shares documents

From your terminal, run the following commands (current directory does not matter):

```sh
brew install git
```

To configure Git to know who you are, we need to teach it your email address and your full name.

From your terminal, run the following commands (current directory does not matter):

```sh
echo -n "Type in your name as you used at GitHub (example: Jane Smith): " && read name; echo -n "Type in the email address you used at GitHub (example: jane@example.com): " && read email; git config --global user.name "${name}"; git config --global user.email "${email}"
```

Finally we will tell Git and GitHub to use the `https` protocol we will enter the following in Terminal:

From your terminal, run the following commands (current directory does not matter):

```sh
git config --global hub.protocol https
```

## Node.js

Node is a runtime for javascript. This means that with node, we can run javascript on our machines without having to be in a browser

For the first part of the training, we are concentrating on the HTML/CSS and JavaScript. Many useful tools for those languages are built with node.

From your terminal, run the following command (current directory does not matter):

```sh
brew install node
```

## Yarn

Yarn is a package manager for node packages. This means that we can install and use libraries that are written in node.

We will be using this to run our scripts and as well as installing packages. This will be more useful the more we dive deeper in JavaScript

From your terminal, run the following command (current directory does not matter):

```sh
brew install yarn
```

## Netlify

Netlify is a static website hosting company. It allows for easy deployment of your websites so they are on the web!

Before continuing, please sign up for an account with [Netlify](https://www.netlify.com/)

```sh
npm install -g netlify-cli
```

## Hub

Hub is command line helper for github. It allows for easy github manipulation from our terminal.

From your terminal, run the following commands (current directory does not matter):

```sh
brew install hub
```

## App App

App-App is a tool created by SDG for creating projects using HTML, CSS, and JavaScript

App App ensures a good project folder setup and includes all the needed tools

From your terminal, run the following command (current directory does not matter):

```sh
npm install --global app-app
```

## Trash

A command line tool to safely delete files by placing them in the _trash folder_ instead of immediately deleting them.

From your terminal, run the following commands (current directory does not matter):

```sh
brew install trash
```

Then when you need to delete a file or folder from within terminal:

```sh
trash file
trash directory
```

<!-- ## Ruby

```sh
brew install chruby ruby-install
echo "source /usr/local/opt/chruby/share/chruby/chruby.sh" >> ~/.bash_profile
echo "source /usr/local/opt/chruby/share/chruby/auto.sh" >> ~/.bash_profile
```

Close your terminal window. Start a new terminal window

```sh
ruby-install --latest ruby && (ls ~/.rubies | tail -1 > ~/.ruby-version)
```

Close your terminal window. Start a new terminal window.

```sh
ruby -v
```

This should show a recent ruby version (2.6.3 as of this writing - April 2019)

```sh
gem install awesome_print
```

Additional setup:

```sh
[ -f ~/.irbrcg ] || cat > ~/.irbrcg <<EOF
require 'irb/completion'
require 'irb/ext/save-history'

# Require awesome_print in our environment
begin
  require 'awesome_print'
rescue LoadError
end

# Keep an IRB history
IRB.conf[:SAVE_HISTORY] = 1000
IRB.conf[:HISTORY_FILE] = "#{ENV['HOME']}/.irb_history"

# Simple prompt mode
IRB.conf[:PROMPT_MODE] = :SIMPLE

# Configure awesome print if available
if defined?(AwesomePrint)
  require 'awesome_print/ext/active_support'
  require 'awesome_print/ext/active_record'

  AwesomePrint.irb!

  AwesomePrint.defaults = {
    plain: false,
    index: false,
    ruby19_syntax: true,
    color: {
      hash:       :pale,
      class:      :white,
      bigdecimal: :yellow,
      integer:    :yellow,
      fixnum:     :yellow,
      symbol:     :yellow,
    },
    indent: -2
  }
end

# If we are in Rails
if ENV['RAILS_ENV'] || defined?(Rails)
  # Customize the IRB prompt
  app_name = Rails.application.class.parent_name.downcase
  app_env  = Rails.env[0...3]

  IRB.conf[:PROMPT] ||= {}
  IRB.conf[:PROMPT][:RAILS] = {
    PROMPT_I: "#{app_name}> ",
    PROMPT_S: "#{app_name}* ",
    PROMPT_C: "#{app_name}? ",
    RETURN: "=> %s\n"
  }
  IRB.conf[:PROMPT_MODE] = :RAILS
end
EOF
```
 -->
