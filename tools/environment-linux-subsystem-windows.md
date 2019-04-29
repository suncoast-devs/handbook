# Setting up your Windows Development Environment

## Installing the Linux Subsystem for Windows

The `Linux Subsystem for Windows` allows us to run all of the open source tools we would normally run on an OS X or Linux environment directly on your Windows 10 machine.

The requirements are:

- 64-Bit version of Windows 10

## Step 1 - Install Git for Windows

We also need to install Git in Windows so our editor can use it.

Download and RUN the installer [Git for Windows](https://gitforwindows.org/).

NOTES: - It will ask you about your path variable, I recommend selecting the third option `use git and optional unix tools`. This will allow git to be used in your terminal

NOTES: - Also choose "Visual Studio Code" as your default editor

To configure Git to know who you are, we need to teach it your email address and your full name.

To enter this configuration, start by typing 'PowerShell' into the windows search bar, and click on the "Windows Powershell - Desktop App" entry

```sh
mkdir C:\home

$Name = Read-Host -Prompt 'Type in your name as you used at GitHub: '
$Email = Read-Host -Prompt 'Type in the email address you used at GitHub: '
git config --global hub.protocol https
git config --global user.name "$Name"
git config --global user.email "$Email"
```

Exit this PowerShell

### Step 2 - Install/Enable Windows Subsystem for Linux

- Enter 'PowerShell' in the windows search bar, find 'Windows Powersell' and _right click_ and select "Run As administrator"
- Once the PowerShell window opens, enter the following:

```sh
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

- This might take a while depending on the speed of your computer.

### Step 2 - Install Ubuntu

- Open a browser and navigate to `https://aka.ms/wslstore`

![](./assets/wslstore.png)

- Click on the `Ubuntu` logo

![](./assets/choose-ubuntu.png)

- Click on the `Get` button. Wait for the download to complete and then click `Launch`

![](./assets/ubuntu.png)

### Step 3 - Follow prompts for first time run

The screen will say "Installing, this may take a few minutes..."

When the prompt indicates `Enter new UNIX username:` enter a lowercase and no-spaces version of your first initial and last name.
When the prompt indicates `Enter new UNIX password:` enter the same password as your windows password
When the prompt indicates `Retype new UNIX password:` retype your password

Once you receive a prompt:

```sh
echo \\\n
UFMxPSdcW1xlWzM2bVx3XF0gXFtcZVszM21cXVxb \\\n
XGVbMW1cXSQoZ2l0IGJyYW5jaCAyPi9kZXYvbnVs \\\n
bCB8IHNlZCAicy8qIFwoLipcKS9cMSAvIikkIFxb \\\n
XGVbMG1cXScKCiMtLS0tLS0tLS0tLS0tLS0tLS0t \\\n
LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiMgUnVi \\\n
eSBHZW0gZW5zdXJlIHBhdGgKIy0tLS0tLS0tLS0t \\\n
LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t \\\n
LS0KZ2VtIGVudiBnZW1kaXIgMj4vZGV2L251bGwg \\\n
JiYgZXhwb3J0IFBBVEg9IiQoZ2VtIGVudiBnZW1k \\\n
aXIpL2JpbjokUEFUSCIK | base64 -d >> ~/.bash_profile

echo "cd" >> ~/.bash_profile

sudo sed -i "s#/home/$\{USER\}#/mnt/c/home#g" /etc/passwd

mv .??* /mnt/c/home
```

Exit the Ubuntu environment.

Restart the Ubuntu environment.

```sh
sudo apt update
```

## Configure Git for Linux

```sh
sudo apt install git
```

and then

```sh
(
  echo -n "Type in your name as you used at GitHub: " && read name
  echo -n "Type in the email address you used at GitHub: " && read email

  git config --global user.name "${name}"
  git config --global user.email "${email}"
)
```

## Node.js

```sh
sudo apt install --no-install-recommends nodejs npm
```

When complete, continue with:

```sh
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=~/.npm-global/bin:\$PATH" >> ~/.bash_profile
source ~/.bash_profile
```

## Yarn

```sh
npm install -g yarn
```

## Netlify

Before continuing, please sign up for an account with [Netlify](https://www.netlify.com/)

Once you have your account created, run the following command in the terminal.

```sh
npm install -g netlify-cli
```

## Hub

```sh
cd
wget https://github.com/github/hub/releases/download/v2.7.1/hub-linux-amd64-2.7.1.tgz
tar -xf hub-linux-amd64-2.7.1.tgz
cd hub-linux-amd64-2.7.1
sudo ./install
cd
```

## App App

```sh
npm install -g app-app
```

## Trash

```sh
sudo apt install trash-cli
```

## Installing Ruby

_To be installed prior to Unit-3 for Ruby students_

### Step 1 - Install `chruby`

```sh
cd
sudo apt install make
wget -O chruby-0.3.9.tar.gz https://github.com/postmodern/chruby/archive/v0.3.9.tar.gz
tar -xzvf chruby-0.3.9.tar.gz
cd chruby-0.3.9/
sudo make install
sudo ./scripts/setup.sh
```

_NOTE_ You may be prompted to close this window and rerun the `Ubuntu` program.

### Step 2 - Install `ruby-install`

```sh
cd
wget -O ruby-install-0.7.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.7.0.tar.gz
tar -xzvf ruby-install-0.7.0.tar.gz
cd ruby-install-0.7.0/
sudo make install
```

### Step 3 - Install Ruby 2.6.1

```sh
cd
sudo apt update
ruby-install ruby-2.6.1
```

### Step 4 - Make Ruby 2.6.1 your default

```sh
cd
echo 'ruby-2.6.1' > ~/.ruby-version
echo 'chruby ruby-2.6.1' | tee -a ~/.profile
```

### Step 5 - Ensure irb is installed

```sh
chruby ruby-2.6.1
gem install irb
```

### Step 6 - Ensure irb is configured

```sh
[ -f ~/.irbrc ] || curl https://suncoast.io/handbook/tools/assets/irbrc > ~/.irbrc
gem install awesome_print
```

### Step 6 - Validate Ruby install

- Close your `Ubuntu` window
- Start a new `Ubuntu` window
- Type `ruby -v`
- The output should include `2.6.1`
