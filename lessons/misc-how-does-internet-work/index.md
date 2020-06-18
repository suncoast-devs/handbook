---
title: How does the web work
assignments:
  - api-intro
---

# How does the web work?

You are viewing this page on `handbook.suncoast.io` right now. How did your
browser know where to go, how to fetch this information, and how to display it?
What are the technologies and processes involved in making this work? In this
lesson we will scratch the surface of the deep stack of technologies, processes,
code, services, servers, and protocols needed to make this work.

## Domains and Hosts

One of the first things the browser looks at is the URL you are attempting to
access. The URL has a few components, the first being the `protocol` to use. By
`protocol` we mean the form of communication. It indicates the format for how
your browser and the remote server are going to communicate. For web requests
this is typically `http` or `https`, it is the part before the `:` in the full
address. These are not the only `protocol` the browser supports but are
certainly the most common.

Once the browser realizes you wish to visit `handbook.suncoast.io` it must
figure out how to address the server. The internet itself does not deal in terms
of names like `handbook.suncoast.io` but in terms of a numerical address in the
form `1.2.3.4` or `192.168.145.241`. The `host names` (e.g.
`handbook.suncoast.io`) are a convenience to users to not have to deal with
remembering the address a service is located at, and also allows the owner of
the service to move it without having to tell people the new address. These
addresses are an `IP Address` (Internet Protocol Address).

So how does the browser know to find the `IP Address` of `handbook.suncoast.io`?
It uses a service known as `DNS` (`Domain Name Services`). Every client has a
defined list of `IP Addresses` that are equipped to perform a translation of a
domain name like `handbook.suncoast.io` into its address `104.248.50.87`. The
`DNS` process allows your computer to quickly translate the address.

How does this work?

The first address that your computer might have is that of your local router. In
this case, your browser sends a request to that address asking for the address
of `handbook.suncoast.io`. If your router has recently _resolved_ (turned the
name into an address) it will return that information to your browser. However,
every request for a translation from a name into an address comes with a `TTL`
(Time To Live), a number of seconds that the information can be safely stored
and reused. So if that time has expired your router must ask for fresh
information, the same as if it had never requested the information in the first
place. Your router will then look at its own list of DNS addresses. Typically
this these addresses belong to your ISP, but you may have also set up to use DNS
services from a company like Google, Cloudflare, OpenDNS or other organizations
that run "Public DNS Servers." Your router will send a request to it's DNS
service on your behalf and await a result. That DNS service does a lookup in
much the same way. For instance, if it has recently answered the same request,
say your neighbor also looked up `handbook.suncoast.io` it will return that
_cached_ result. If that has expired, or it hasn't ever looked up that address
it will then try to determine the "authoritative answer" to the request.

The first thing it needs to do is find out where this _authoritative answer_
lives. It does so by looking at the `Top Level Domain` or `TLD`. In this case,
the TLD is `.io`, but these can also be `.com` and `.org`, etc. The DNS server
then asks the TLD server "What servers know about `suncoast.io`?" Notice it only
cares about `suncoast.io` since it really wants to ask the owner of
`suncoast.io` about the `handbook` part. The TLD server will respond with the
DNS servers responsible for `suncoast.io` that were set up when the domain was
_registered_.

These servers are then asked for the details of `handbook.suncoast.io` and the
result is cached, and passed back down to the router, which caches it as well,
and then sent to the computer, which also caches it, and finally to the browser.

Whew! And all we have done so far is ask "What address should I send my request
to for `handbook.suncoast.io`"

The Internet is a wondrous thing indeed! Oh, and we skipped over quite a bit of
detail here about how these requests travel over the internet itself, the
different kind of "packets", and many other details of how DNS works. We also
didn't discuss a new protocol for secure DNS requests called "DNS over HTTPS" or
a similar protocol called DNSSEC. This is a good example of how each technology
we encounter is, itself, a deep and fascinating subject.

## Let's take a look at a few DNS examples

Your computer may come with a tool named `dig` to lookup DNS entries. If not you
may have a tool named `nslooup`.

Let's lookup `handbook.suncoast.io`

```shell
dig handbook.suncoast.io
```

In addition to other details, you will get something similar to the following.
NOTE, your address may differ from `162.243.166.170`

```
;; ANSWER SECTION:
handbook.suncoast.io.	20	IN	A	162.243.166.170
```

The sections here mean we are looking for `handbook.suncoast.io`, we are asking
for an `A` (Address) and the answer was `162.243.166.170` and we may cache this
information for 20 more seconds before having to request it.

This is a fairly simple response. However, responses may be complex.

Try using `dig` (or `nslookup`) to query `amazon.com`

```shell
dig amazon.com
```

In addition to other details, you will get something similar to the following.
NOTE, your address may differ from those below

```
;; ANSWER SECTION:
amazon.com.		60	IN	A	205.251.242.103
amazon.com.		60	IN	A	176.32.98.166
amazon.com.		60	IN	A	176.32.103.205
```

Here we received _three_ different answers. This means that any of these three
addresses are valid for `amazon.com`. This implies that `amazon.com` is using
_load balancing_. Our client should choose one of these three to use. Some
clients _randomly_ choose while others take the first entry. Try running the
lookup again and you will see that `amazon.com` is returning the answers in
random order. This allows amazon.com to _spread_ out the requests to different
servers.

A service like `amazon.com` may also be sending responses back based on
geography. That is, it will send different responses to requests coming from the
east coast of the US than the west coast. Amazon is large enough to have
geographically distributed servers and thus want to _direct_ you to the
physically closest server to give you the fastest response time. It also allows
them to have _fault tolerance_. Since they have many servers that can handle
your request it does not matter if one of them fails. They simply remove it from
the available list of servers. Your browser will use one of the other addresses
if it cannot communicate with the first one it tries.

Another type of response may be a `CNAME` response. Try a lookup of
`www.yahoo.com`

```
www.yahoo.com.		57	IN	CNAME	new-fp-shed.wg1.b.yahoo.com.
new-fp-shed.wg1.b.yahoo.com. 57	IN	A	72.30.35.9
new-fp-shed.wg1.b.yahoo.com. 57	IN	A	98.138.219.232
new-fp-shed.wg1.b.yahoo.com. 57	IN	A	98.138.219.231
new-fp-shed.wg1.b.yahoo.com. 57	IN	A	72.30.35.10
```

You'll see that `www.yahoo.com` is a CNAME for `new-fp-shed.wg1.b.yahoo.com`.
The `CNAME` means canonical name, or that `new-fp-shed.wg1.b.yahoo.com` is the
real name of `yahoo.com`. Then that name is resolved and we see that there are
**4** addresses for that name.

DNS makes for remarkably dynamic and resilient service.

## Making Connections

What happens after our computer resolves the address of a server? The next thing
we need to do is connect to a particular _service_ on that machine. Remember
when we mentioned that part of the URL is a `protocol`. This also indicates
which `service` we want to speak to.

There are many kinds of services we can run over the internet. The most familiar
is `http` and `https` for serving web pages and APIs. But there are also
services like `pop3` and `smtp` which deal with email as well as services like
`postgres`, our database.

Each of these `services` will be _listening_ for a connection from a client on a
particular `port number`. If you think of the `IP Address` as a street address
of an office building, you can think of the `port number` as which room in the
building the service is in.

Port number range from `1` to `65535` with many of the common services being in
the range less than `1024`. Any port number `1024` or less is typically
restricted to privileged accounts on a server. Taking our example of `http` and
`https` these services are typically on port `80` and `443` respectively.

To connect to a service on a port the computer creates something called a
`socket`. A `socket` is a virtual connection between your computer and a port on
a remote computer. Think of it like a pipe that information can flow through in
both directions. Once this socket is established we can _send_ information and
we can _receive_ information in return.

## How do we connect to one of these ports?

Let's try connecting like the browser does.

For this, we will be using a tool named `netcat`.

On Mac OS install it with: `brew install netcat` On Linux it is likely
`sudo apt install netcat`. On Windows: `scoop install netcat`

To connect: `nc handbook.suncoast.io 80`

Now that we are connected, how do we talk? We use the `http` protocol that is
[well documented.](https://tools.ietf.org/html/rfc2616)

## HTTP

# GET a page

```
GET / HTTP/1.1
Host: handbook.suncoast.io

```

(blank line after Host:)

This will send back some text. This text includes:

- Headers
- Status codes (200 OK, 404 Not Found, 500 Errors, ...)
- https://http.cat

What are other HTTP headers?

- `Date` _Timestamp on Server_
- `Content-Type` _How should this content be interpreted_
- `Content-Length` _How long is this content in bytes_
- `Last-Modified` _When was this content last modified_

- Other tools
  - `curl`
  - `http` (httpie)
  - `Insomnia`

# Resources

- This is a nice
  [visualization](https://www.verisign.com/en_US/website-presence/online/how-dns-works/index.xhtml)
  of the DNS process.
