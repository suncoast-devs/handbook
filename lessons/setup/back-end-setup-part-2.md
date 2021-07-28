---
title: Back-End Setup Part 2
order: 30
---

# Insomnia

Insomnia is a graphical tool that allows us to work with web based APIs.

## Installation

<OperatingSystemSwitch allowedOperatingSystems={['Mac']}>

```shell
brew install --cask insomnia
```

</OperatingSystemSwitch>

<OperatingSystemSwitch allowedOperatingSystems={['Windows']}>

```shell
scoop install insomnia
```

</OperatingSystemSwitch>

<SectionSeparator />

# PostgreSQL

The database engine we will be using for our back-end work.

<OperatingSystemSwitch allowedOperatingSystems={['Mac']}>

## Installation

Start a Terminal and run:

```shell
pg_config >/dev/null 2>&1 && echo "STOP"
```

If this comes back and says "STOP" -- **STOP AND DISCUSS WITH YOUR INSTRUCTOR**

Otherwise, proceed to the next step.

```shell
brew install postgresql
```

```shell
brew services start postgresql
```

```shell
brew install pgcli
```

## Configure pgcli with nice defaults

The following command will set some common user configuration options in your
pgcli. If you've used pgcli before and have custom configured it, this will
_overwrite_ your configuration changes.

```shell
sdg pgcliConfig
```

</OperatingSystemSwitch>

<OperatingSystemSwitch allowedOperatingSystems={['Windows']}>

## Installation

Start a PowerShell and run:

```shell
pg_config --version
```

If this comes back with a line similar to `PostgreSQL` followed by numbers:
**STOP AND DISCUSS WITH YOUR INSTRUCTOR**

If this comes back with a line that says `command not found` you may proceed to
the next step.

```shell
scoop install postgresql
```

Close that PowerShell

---

Start a **PowerShell as Administrator**.

- This next command tells PostgreSQL to start on boot

```shell
pg_ctl register -N PostgreSQL
```

- This next command starts PostgreSQL right away.

```shell
net start PostgreSQL
```

**CLOSE** the administrator PowerShell.

---

Start a new regular PowerShell

```shell
createuser -U postgres --superuser $USER
```

```shell
scoop install python
```

```shell
pip install pgspecial click Pygments prompt_toolkit psycopg2 sqlparse configobj pendulum cli_helpers
```

```shell
pip install pgcli --no-deps
```

</OperatingSystemSwitch>

## Install a graphical tool for working with our database

`psql` and `pgcli` are good _command-line_ tools for working with a database.
You may prefer working with a graphical user interface for your database work.
If so, install [BeeKeeper Studio](https://www.beekeeperstudio.io) and use it in
place of `psql` and `pgcli`.

## Test if it is working:

From Terminal:

```shell
createdb MyTestDatabase
```

Then:

```shell
pgcli MyTestDatabase
```

If this command runs without requiring a password the configuration is complete.

To close the `pgcli` tool you can type `exit` and press return.
