---
title: Slack
---

Slack is the primary tool for communicating at Suncoast Developers Guild. This
guide covers some of our favorite Slack tips and tricks.

# Posting Code!

When you want to post a small code block to Slack it helps to format it!

If you are simply showing a one line bit of code and want to do it _inline_ you
can format it like so:

```
Hi there, is this code correct: `var answer = 42;` or do I need to do something else?
```

This will format the snippet `var answer = 42;` in a stylized manner directly in
your message!

If you have a longer block you can enclose it in three backtick (\\`) characters
like this:

````
Hi Mary, can you help me with this code?

```
var answer = 42;
Console.WriteLine($"The answer to your question is: {answer}");
```

I'm not sure if this is what we were supposed to do. Thanks!

````

And the code inside the backticks will be formatted as block of code!

# Posting snippets for LONG blocks of code

If you click the _lightning bolt_ icon next to where you would type a message
there is an option titled "Create a Text Snippet." This will launch a dialog box
where you can:

- Type a title for your text
- Tell Slack the language type for your text (HTML, CSS, C#, JavaScript,
  Markdown, etc)
- Paste or type your long text
- Type a message to accompany the long text

This posts the long text in a way where the receiving user, or channel, will get
a brief summary and a "click to see more" message as opposed to pasting the
entire text in backticks, which will include the entire body. If the text is
long, creating a snippet is more friendly!
