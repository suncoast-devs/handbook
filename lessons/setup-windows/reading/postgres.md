# Setting up PostgreSQL

The database engine we will be using for our back-end work.

## Installation

[Download the installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and follow the prompts.

During the install process, you will have to supply a password. Remember this for later

You do not need to (and **SHOULD NOT**) install `Stack Share`.

## Post Installation

Be sure that postgres has been added to your `PATH` variable.

You can check to see if this has been done by opening Powershell and typing `psql -U postgres` and see if you are prompted for a password **OR** you receive an error.

If receive an error, then [follow these instructions](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools) to add postgres to your `PATH`.

### pgcli

To get pgcli, you need to install [python](https://www.python.org/downloads/windows/).

Choose the option for version `2` -- then choose the entry that says "Windows x86-64 MSI installer"

During the installation, enable the option "Add python.exe to Path"

Start a **new** Powershell and run

```sh
pip install pgcli
```

<!--
#### Configure pgcli with nice defaults

```sh
pgcli >/dev/null 2>&1
sed -i "s/multiline_continuation_char = ''/multiline_continuation_char = '.'/g" ~/.config/pgcli/config
sed -i "s/multi_line = False/multi_line = True/g" ~/.config/pgcli/config
sed -i "s/enable_pager = True/enable_pager = False/g" ~/.config/pgcli/config
sed -i "s/wider_completion_menu = False/wider_completion_menu = True/g" ~/.config/pgcli/config
sed -i "s/syntax_style = default/syntax_style=native/g" ~/.config/pgcli/config
```
 -->

### Create a user without a password

If we were installing our database server to support multiple users as well as remote connections from other machines we would want to ensure we have a password associated with our account. However, we are going to use this database from our own machine and **NOT** allow remote connections. Also many of the tools we want to use would require us to add this password to our setup and for local development.

Thus we are going to configure our postgres user to not require a password.

#### Steps:

1. From a powershell run `pgcli -U postgres` and enter the password you used during the postgres installation.

2. Run the following commands, **REPLACING** `username` with the name of your profile. This will create a user in postgres with the same name as your computer name and allow that user to log into postgres.

```sql
CREATE ROLE username superuser;

ALTER ROLE username WITH LOGIN;
```

Exit `pgcli` (control + D)

3. Next will configure your database to allow users to log in without a password. Open the `pg_hba.config` file in VS Code using the following command

```sh
code 'C:\Program Files\PostgreSQL\12\data\pg_hba.conf'
```

Once open use the "Find and Replace" VS Code feature to file `md5` and replace it with `trust` -- NOTE the leading space.

4. You will need to reload postgres, open a `Powershell as administrator`, and run the following command

```sh
pg_ctl reload -D "C:\Program Files\PostgreSQL\12\data"
```

Exit the administrator Powershell

#### Test if it is working:

From Powershell:

```sh
createdb MyTestDatabase
```

Then:

```sh
pgcli MyTestDatabase
```

If this command runs without requiring a password the configuration is complete
