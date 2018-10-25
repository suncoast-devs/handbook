---
title: Super amazing animated gif prompt
draft: true
---

We all like funny animated gifs, right?

We all like personalizing our shell prompts, right?

So lets do both!

## Demo

![demo](https://gstark-monosnap.s3.amazonaws.com/screencast_2015-08-13_09-27-10.gif "Demo")

# Requirements

- iTerm2 version 2.9 or later [https://iterm2.com/downloads.html](download) -- currently requires a test version
- zsh (because setting an animated gif in the prompt in bash works, but is unreasonably slow)
- imgcat (iTerm2 script for displaying images) -- [https://iterm2.com/images.html](download)
- An animated gif of your own
- Awesomeness

# Process

To speed up our prompt we will pre-process our animated gif (using the imgcat utility) into the format iTerm requires and save the output somwehere. I choose `~/.zsh/images/prompt.base64` or something similar.

```
imgcat /path/to/funny.gif > ~/.zsh/images/prompt.base64`
```

Update your prompt in your `~/.zshrc` to `cat` out the preprocessed file to the display. Here is an example of mine:

```
animate_if_error()
{
  if [[ $? -ne 0 ]]; then
    PROMPT="$(cat ~/.zsh/images/prompt.base64)
$ "
  else
    PROMPT="$ "
  fi
}

precmd_functions+=animate_if_error
```

Now any time a command fails my prompt is updated with a hillarious animated gif (in reality, like all good zsh-ers my prompt is way more complex)
