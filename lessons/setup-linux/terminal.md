---
title: Terminal
---

## Helpful environment variables

This setup step sets options for the "pager" -- the pager is a tool used to show
information one-page-at-a-time in our terminal. This setup configures it not
pause if the information it is showing is less than one screen full.

```shell
echo "export LESS=-F" >> ~/.zshrc
echo "export LESS=-F" >> ~/.bash_profile
```
