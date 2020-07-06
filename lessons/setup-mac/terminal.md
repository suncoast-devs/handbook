---
title: Terminal
---

The default color scheme for `Terminal` is black text on a while background.
This can be difficult to use for long periods of time. Consider changing your
default profile to `Pro` which will give you light text on a dark background.

Recommended profiles:

- Pro
- Homebrew
- TheOne

To change your default profile, start `Terminal` and select `Preferences` from
the _Terminal_ menu. Click on `Profiles` then on `Pro` (or any other profile you
want) and then click the `Default` button.

> NOTE: if you choose a profile that is bright and colorful, but difficult for
> your instructor or fellow classmates to read you will be making it more
> challenging to receive assistance.

## Helpful environment variables

This setup step sets options for the "pager" -- the pager is a tool used to show
information one-page-at-a-time in our terminal. This setup configures it not
pause if the information it is showing is less than one screen full.

```shell
echo "export LESS=-F" >> ~/.zshrc
echo "export LESS=-F" >> ~/.bash_profile
```
