---
title: PostgreSQL
---

The database engine we will be using for our back-end work.

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

<!--
#### Configure pgcli with nice defaults

```shell
pgcli >/dev/null 2>&1
sed -i "s/multiline_continuation_char = ''/multiline_continuation_char = '.'/g" ~/.config/pgcli/config
sed -i "s/multi_line = False/multi_line = True/g" ~/.config/pgcli/config
sed -i "s/enable_pager = True/enable_pager = False/g" ~/.config/pgcli/config
sed -i "s/wider_completion_menu = False/wider_completion_menu = True/g" ~/.config/pgcli/config
sed -i "s/syntax_style = default/syntax_style=native/g" ~/.config/pgcli/config
```
 -->

## Test if it is working:

From PowerShell:

```shell
createdb MyTestDatabase
```

Then:

```shell
pgcli MyTestDatabase
```

If this command runs without requiring a password the configuration is complete

To close the `pgcli` tool you can type `exit` and press return.
