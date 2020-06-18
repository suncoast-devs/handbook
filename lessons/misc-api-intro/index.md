---
title: Introduction to APIs
assignments:
  - api-intro
---

Whenever two pieces of code communicate they do so with a prescribed format. The
two pieces of code need to agree on:

- What is the input that needs to be sent?
- What is the format of the input?
- What is the name/location/identity of the code to be run?
- What is the output that will be returned?
- What is the format of the output?

All of this together describes an `A`pplication `P`rogramming `I`interface, or
`API`. The secret is that as we've been writing methods we've already been
writing and _using_ APIs!

## Simple example

Let's look at a simple example:

```csharp
int AddTwoNumbers(int firstNumber, int secondNumber)
{
  return firstNumber + secondNumber;
}
```

Let's apply our list above:

- What is the input that needs to be sent? `firstNumber and secondNumber`
- What is the format of the input?
  `firstNumber is an integer and secondNumber is an integer`
- What is the name/location/identity of the code to run?
  `The method is called AddTwoNumbers`
- What is the output that will be returned? `The sum of the two numbers we gave`
- What is the format of the output? `A single int`

These same questions apply any time two pieces of code communicate in some way.
Even our simple use of C# language features adhere to this rule. It also applies
when the code we are asking to run isn't logically or physically located inside
our own application, or even on our own computer!

## Remote APIs

The most interesting use of APIs is when we can use an existing API that we do
not need to incorporate directly into our code. These APIs are typically hosted
on other computers, maintained by others, and provided to us for free or with a
cost. We will typically access these APIs over the internet and thus the answer
to our five questions gets slightly more complicated.

## Using our first simple API

I'm a fan of the TV Show _"Parks and Recreation"_ and the character _Ron
Swanson._ He is known for his funny sayings and expressions. Luckily for me,
there is an API on the internet that can show me funny quotes of his. The
project's [homepage](https://github.com/jamesseanwright/ron-swanson-quotes)
describes how the API works. We'll be looking at all the different options, but
let's take a look at the simplest option, one that just gives us back a single
quote.

- What is the input that needs to be sent? `None`
- What is the format of the input? `None`
- What is the name/location/identity of the code to be run?
  `http://ron-swanson-quotes.herokuapp.com/v2/quotes`
- What is the output that will be returned?
  `A list containing a single quote from Ron`
- What is the format of the output? `A JSON array (of length 1) of strings`

Soon we will learn how to access APIs via the command line, however, for now we
will use a few tools that allow us to interact with APIs directly.

The first of which is `httpie` which you should have installed as part of your
developer setup. If not, please visit that lesson and return after installing
it.

Let's run the `http` command (for `httpie`) and supply it the location of our
API.

```shell
http --verbose http://ron-swanson-quotes.herokuapp.com/v2/quotes
```

Your output will be similar to the following:

```shell
GET /v2/quotes HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: ron-swanson-quotes.herokuapp.com
User-Agent: HTTPie/2.0.0



HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 56
Content-Type: application/json; charset=utf-8
Date: Wed, 22 Apr 2020 15:24:46 GMT
Etag: W/"38-8d39bb7c"
Server: Cowboy
Via: 1.1 vegur
X-Powered-By: Express

[
    "Crying: acceptable at funerals and the Grand Canyon."
]
```

Let's break down all of the information that the `http` command output. All the
lines before the first blank lines represent the _headers_ that the tool sent to
the server. When earlier we said that there was no information the _API_
required, there are still inputs that the webserver needs. For instance, the
first line `GET /v2/quotes HTTP/1.1` indicates which URL on the server we are
looking for and what version of HTTP we are speaking. Also included is the
`Host` to indicate which host we are speaking to. There is more detail about how
all this works on THE LESSON ON HOW THE INTERNET WORKS.

All the lines after the first set of blank lines and before the second set of
blank lines are the _response headers._ This is information the remote web
server sends back to us to tell us about the kind of information it is returning
to us. One of the most interesting is
`Content-Type: application/json; charset=utf-8`. This line indicates that the
body of the response should be considered as JSON data. `utf-8` means use the
`utf-8` standard for representing characters. This would allow the response to
use a wide range of characters, such as emoji!

Everything after the blank line following the headers is the information the
remote API returned to us. From the LESSON ON JSON, we see that this is an array
`[]` containing a single string `""` and that string is a quote from Ron.

## An analogy

Let's make an analogy to our understanding of methods. This API above is similar
to a method in `C#` named:

```csharp
List<string> GetOneQuote()
{
  // Body of code here
}
```

and our `http` command line is like running this code with

```csharp
GetOneQuote()
```

Except here we are using a tool that knows how to make API requests across the
internet and show us the response.

Soon we will learn how to write our own APIs and how to use APIs that
**create**, **update**, and **delete** data as well as just retrieve it.

## Ok, but what about if we need to send the API some input?

If we need to send the API input there are several ways of doing so. We will
investigate some here and visit the rest when we discuss how to create, update,
and delete data.

The first way is to provide input as part of the URL itself. Looking at the
documentation for the Ron Swanson API we see that if we tack on `/<count>` where
`<count>` is a number we can receive more than one quote.

> This is called a URL parameter. That is, the parameter is part of the URL
> itself.

### URL parameters

To use this we might do:

```shell
http --verbose http://ron-swanson-quotes.herokuapp.com/v2/quotes/5
```

The answers to our API questions are now:

- What is the input that needs to be sent? `Count of quotes`
- What is the format of the input? `as part of the URL`
- What is the name/location/identity of the code to be run?
  `http://ron-swanson-quotes.herokuapp.com/v2/quotes/<count>`
- What is the output that will be returned? `A list of quotes from Ron`
- What is the format of the output? `A JSON array of strings`

And the result of calling the API will look like:

```
[
    "Breakfast food can serve many purposes.",
    "Give a man a fish and feed him for a day. Don't teach a man to fish… and feed yourself. He's a grown man. And fishing's not that hard.",
    "Crying: acceptable at funerals and the Grand Canyon.",
    "Keep your tears in your eyes where they belong.",
    "Friends: one to three is sufficient."
]
```

The same style of URL parameter applies for searching. See if you can write the
answers to the API questions and generate an `http` command line to search for a
word Ron may have said.

### Query Parameters

The second way to send input to an API is by using what is called a
`URL query parameter`. These work similar to the URL parameters we've seen but
they go _after_ the URL and a `?` character. You may have seen this when looking
at the URL bar for a google search. Your URL might look something like this:
`https://www.google.com/search?q=API`. The `?` indicates that the URL has ended
and the list of query parameters is beginning. Each parameter is of the form
`key=value`. So in this case the name of the parameter is `q` and the value of
the parameter is `API`. This is how Google knows which term you are searching
for. Try it now. Put `https://google.com?q=Breakfast` in your browser URL bar
and press enter. You'll see google will have identified your search query!

The Ron Swanson API does not use this mode for specifying its inputs but if it
had, those queries would look like this:

`http://ron-swanson-quotes.herokupapp.com/v2/quotes?count=5`
`http://ron-swanson-quotes.herokupapp.com/v2/quotes?term=Breakfast`

### What is this `GET` we keep seeing everywhere?

In addition to the URL we send, and any parameters we send, the HTTP protocol
also specifies a `verb`, the _kind_ of request this is. Every request you make
by typing a URL into your browser is known as a `GET` request. A `GET` request
indicates to the remote server that we wish to fetch information and we are not
_sending_ it any data that it needs to keep. You'll see that these kinds of
requests fit that style:

- Give me a Ron Swanson quote
- Give me 12 Ron Swanson quotes
- Give me any Ron Swanson quotes where he mentions work

However, it would _not_ fit a style of:

- Here is a new Ron Swanson quote I want you to keep around.
- Please remove the 4th Ron Swanson quote.
- There is a mis-spelling in the 12th Ron Swanson quote, here is the corrected
  quote.

All of those requests modify information and thus a `GET` request is not
sufficient. Luckily there are other verbs we can use.

# PUT, POST, DELETE

These are the next most common verbs. They are typically used to CREATE, UPDATE,
and DELETE information.

If we need to supply additional information, say to a `POST` request to create
data, we will put the information in the `body` of the request. We will see some
examples when we try a few APIs that allow us to create and modify data.
