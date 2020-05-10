---
title: Powershell
---

As a developer on the Windows platform, one of our main tools is `Powershell`.
`Powershell` is the command line interface (or shell) we use to run commands and
interact with our computer. Using the shell seems difficult at first, but with
practice, this becomes a much more efficient way of using our computers. For a
tutorial on using the shell, see [this page.](/handbook/skills/command-line)

To open `Powershell`, open your `start` menu or type \(Win + R\), then type
`Powershell`, this searches your system and give you the option to start it,
just like any other program.

## PRO TIP

Since we are going to run this often you may consider pinning it to your screen
by right-clicking the icon in the Task Bar and selecting "Pin to taskbar"

## Note for WINDOWS HOME users

You may need to change the security settings on your machine.

To do so, start a Powershell as administrator by using the Windows + R key and
typing `Powershell` -- You will see an option to `Run as Administrator` and you
should choose that option.

You will know are running as administrator if your prompt is:

```sh
PS C:\Windows\system32>
```

If so, enter `Set-ExecutionPolicy -ExecutionPolicy Unrestricted` and press
enter.

If you receive a prompt about changing the Execution Policy, enter "Y" for YES
and press enter.
