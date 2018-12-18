---
title: Setting up PostgreSQL
draft: true
---

The database engine we will be using for our back-end work.

# Mac Instructions

```sh
brew install postgresql pgcli
```

To have the database engine running all the time:

```sh
brew services start postgresql
```


# Linux Subsystem for Windows instructions

- If using another flavor of Linux the `apt` and `service` instructions may be different. For instance with OpenSUSE the instruction is `sudo systemctrl postgresql start` instead.

```sh
sudo apt install postgresql libpq-dev python-pip

sudo pip install pgcli

sudo service postgresql start

sudo su postgres -c "createuser --superuser ${USER}"
```

## Linux Subsystem Starting PostgreSQL after a reboot

To start PostgreSQL after a reboot:

```sh
sudo service postgresql start
```

