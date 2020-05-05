---
title: Setting up PostgreSQL
---

The database engine we will be using for our back-end work.

## Installation

Start a Terminal and run:

```sh
brew install postgresql
```

```sh
brew services start postgresql
```

```sh
brew install pgcli
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

## Test if it is working:

From Terminal:

```sh
createdb MyTestDatabase
```

Then:

```sh
pgcli MyTestDatabase
```

If this command runs without requiring a password the configuration is complete

To close the `pgcli` tool you can type `exit` and press return.
