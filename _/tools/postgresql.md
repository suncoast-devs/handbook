# Setting up PostgreSQL

The database engine we will be using for our back-end work.

## Mac Instructions

```sh
brew install postgresql pgcli
```

If you have used and configured `pgcli` you may skip the next instruction:

```sh
pgcli >/dev/null 2>&1
sed -i.bak "s/multiline_continuation_char = ''/multiline_continuation_char = '.'/g" ~/.config/pgcli/config
sed -i.bak "s/multi_line = False/multi_line = True/g" ~/.config/pgcli/config
sed -i.bak "s/enable_pager = True/enable_pager = False/g" ~/.config/pgcli/config
sed -i.bak "s/wider_completion_menu = False/wider_completion_menu = True/g" ~/.config/pgcli/config
sed -i.bak "s/syntax_style = default/syntax_style=native/g" ~/.config/pgcli/config
```

To have the database engine running all the time:

```sh
brew services start postgresql
```

## Windows instructions

###

To download the Postgres [download the installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and follow the prompts.

During the install process, you will have to supply a password. Remember this for later

You do not need (and shouldn't) to install `StackShare`.

Be sure that postgres has been added to your `PATH` variable. You can do this by opening a new powershell and typing `psql -U postgres` and it should ask you for a password. If your terminal says `command not found`, then [follow these instructions](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools) to add postgres to your `PATH`.

### pgcli

To get pgcli, you need to install [python](https://realpython.com/installing-python/#windows), then follow [these instructions](https://www.pgcli.com/install)

Like above, python and pip should be installed to you `PATH`, you should be able open up a new powershell and type `python` and `pip` and they should do something. If you are getting a `command not found`, they add to your path in the same manner as above.

## Create a user without a password

Now you should be able to run `createdb -U postgres`. This is find, but we want to be able to connect the database without a username and password. This will allow our local development to be easier.

1. Connect to any database using `pgcli`
2. Run the following commands, replacing `username` with the name of your profile. This will create a user in postgres with the same name as your computer name and allow that user to log into postgres.

```sql
CREATE ROLE username superuser;

ALTER ROLE username WITH LOGIN;

```

3. Next will configure your database to allow users to log in without a password. Open the `pg_hba.config` file in VS Code using the following command

```sh
code "C:\Program Files\postgres\12\data\pg_hba.config"
```

In this file, there will a list of domains, change all the `md5` to `trust`

4. You will need to reload postgres, open a powershell as administrator, and run the following command

```sh
pg_ctl reload -D "C:\Program Files\postgres\12\data"
```

Now you should be able to connect your database with only `pgcli MyDatabase`.

## Linux or Linux Subsystem for Windows instructions

- If using another flavor of Linux the `apt` and `service` instructions may be different. For instance with OpenSUSE the instruction is `sudo systemctrl postgresql start` instead.

```sh
sudo apt install postgresql libpq-dev python-pip
```

```sh
sudo pip install pgcli
# If the command above fails, try:  sudo pip2 install pgcli
```

```sh
sudo service postgresql start
```

```sh
sudo su postgres -c "createuser --superuser ${USER}"
```

If you have used and configured `pgcli` you may skip the next instruction:

```sh
pgcli >/dev/null 2>&1
sed -i "s/multiline_continuation_char = ''/multiline_continuation_char = '.'/g" ~/.config/pgcli/config
sed -i "s/multi_line = False/multi_line = True/g" ~/.config/pgcli/config
sed -i "s/enable_pager = True/enable_pager = False/g" ~/.config/pgcli/config
sed -i "s/wider_completion_menu = False/wider_completion_menu = True/g" ~/.config/pgcli/config
sed -i "s/syntax_style = default/syntax_style=native/g" ~/.config/pgcli/config
```

### Linux Subsystem Starting PostgreSQL after a reboot

For every session when you want to do database work, execute this command:

```sh
sudo service postgresql start
```
