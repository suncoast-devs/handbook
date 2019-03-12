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
```

To have the database engine running all the time:

```sh
brew services start postgresql
```

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
```

### Linux Subsystem Starting PostgreSQL after a reboot

For every session when you want to do database work, execute this command:

```sh
sudo service postgresql start
```
