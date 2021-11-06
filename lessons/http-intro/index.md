---
title: Introduction to HTTP
---

In this lesson we will discuss some of the basic technologies and protocols that
enable the web-based applications we are going to create.

When we speak of the "web" we are mostly concerning ourselves with the HTTP (and
HTTPS) protocol. HTTP stands for the HyperText Transport Protocol and is one of
many internet standards governed by the IETF (Internet Engineering Task Force).

However, before we can dive into the details of HTTP and how we will be
interacting with it we need to investigate some lower-level technologies that
make HTTP possible.

## Internet history

Starting in the 1970s researchers were looking for ways to interconnect
computers to share information. These computers were mostly at research and
educational institutions. The first widely recognized network was ARPANET which
combined local networks of computers into a network-of-networks (the beginnings
of the ideas of "the web"). From this some standards began to evolve, one of
which became the Transmission Control Protocol and Internet Protocol. Perhaps
you have seen these mentioned by their abbreviation: TCP/IP.

In the early 1980s, further work, funded by the National Science Foundation,
created the NSFNET which created standards such as the Domain Name System (DNS)
and the adoption of TCP/IP. In the late 1980s independent service providers,
ISPs, began connecting to this network. Soon ARPANET was decommissioned and in
the late 1980s NSFNET was decommissioned leading the way to commercial traffic
being allowed on the now named "Internet".

In 1989/1990, Tim Berners-Lee began research to create a network of linked
documents that could be hosted on any node of the network and could be accessed
from any node. These linked documents could reference each other and these links
could reference another document on another host. While the idea of hyper-text
(documents containing links to other documents) had existed for a while, the
merger of that idea with the network created what we now refer to as the World
Wide Web.

Development of HTTP was initiated by Tim in that work 1989, and formalized in
1997 via a process known as a Request For Comment (or RFC). An RFC is a formal
specification and proposal which is then discussed, modified, and finally
ratified into a standard. The RFC for HTTP is
[RFC 2068](https://tools.ietf.org/html/rfc2068) and runs over 100 pages.

In this lesson we will review the portions of HTTP that are relevant to
application developers that interact with HTTP clients (our browsers) and HTTP
servers (our backend application). The depth and breadth of how the internet
works, how data is transferred, and how the protocols enable us to work is
worthy of a course all its own. For those interested in networking, devops, or
systems engineering consider a deeper dive into these subjects.

## Starting at the top, how does the browser know where to go?

When you type `https://suncoast.io` in your browser's URL bar how does it know
where to go?

Fortunately one of the technologies mentioned above provides that answer. DNS,
the Domain Name System, is a protocol and set of services that allow our
computer to translate a human friendly domain name (`suncoast.io`) into an _IP
address_, a network location, that the internet knows how to route to.

Devices on the internet only know how to speak to each other based on their IP
(Internet Protocol) address. Every device has its own address and knows how to
speak to the other devices in its local network. Part of recognizing these
addresses is understanding how to _route_ or pass along traffic to the next stop
on the internet which will bring you closer to your destination. Routing is a
complex topic beyond the scope of this lesson.

However, understanding how DNS works is relevant since we may need to register
domains and hosts as part of deploying our applications.

## Domains and Hosts

Our domain name, `suncoast.io` is made up of multiple parts, all of which play a
part in turning our host name into an address.

1. Host name
2. Domain name
3. Top Level Domain (TLD)

Looking at our `suncoast.io` the final portion of the text is `io`. This is our
Top Level Domain. These TLDs are controlled and allocated by an organization
known as the Internet Corporation for Assigned Names and Numbers (ICANN) via the
Internet Assigned Numbers Authority (IANA). It is their job to determine what
top level domains exists and who is allowed to manage them. In the early days of
the Internet there were very few TLDs and as you can see now there are many.
Some TLDs represent countries, while others represent the type of organization
allowed to have such a domain name (e.g. `.edu` domains). Some TLDs, such as
`io`, are assigned to countries or territories. In this case, the British Indian
Ocean Territory. Many of these assignees will sell domain names within their TLD
and thus `suncoast.io` is a valid domain name even though we are not part of the
British Indian Ocean Territory.

Within a TLD, organizations are assigned a domain name. This is the next level
down below the `.io` in our case. To obtain a domain name you must _register_ it
with a _registrar_. A _registrar_ is an organization, enabled by the TLD's
assignee to register a domain. By registering the domain, and often paying a
fee, an organization can claim ownership of a domain within a TLD. In our case
`suncoast.io`, at the time of writing, is registered with
[NameCheap](https://www.namecheap.com/) a popular registrar for many TLDs. By
registering, and keeping our registration up to date, Suncoast Developers Guild
is allowed to control the definition of this domain and any **hosts** within.

Host names are the last component. You may have seen domains that have multiple
hosts defined within them. Perhaps `www.domain.io`, `shop.domain.io`,
`mail.domain.io`, `support.domain.io`, etc. All of these hosts are defined and
controlled by the domain owner. The definition of these hosts are configured by
their DNS server. Each domain on the internet must define one or more DNS
servers which allow other hosts on the internet to ask about the presence of a
host, and how to communicate with it. Each domain informs their DNS registrar of
the names of their DNS Servers. These servers do not need to be associated with
the registrar but often registrars provide both registration and DNS services.

## So what is DNS?

DNS translates a host name into specific details, often an IP address, about
that host. DNS translates a hostname and a record type into a definition.

When a client initiates a DNS request it sends its request to one of its defined
DNS servers. Often this is a local machine on the network. Most routers provide
a local DNS service to the devices on its network. When the request is received,
this first DNS server (perhaps your router) will look to see if it has recently
done the same lookup and return a stored (cached) value. If it does not have an
answer for this request it will forward the request to **its** DNS server. In
the case of your local network router, this will often be the DNS server of your
ISP or perhaps a custom DNS server from a DNS provider (such as Cloudflare,
OpenDNS, Google). Since these providers supply DNS to many clients it may have
cached this request. These servers may forward their request to another parent
DNS server. Or they may try to resolve it on their own. To resolve it on their
own they would ask a group of special DNS servers called the "Root DNS Servers".
These are highly secure, tightly controlled servers that are geographically
spread. It is their purpose to indicate where the DNS servers for TLDs are
located. So when our request for `suncoast.io` hits a DNS server that needs to
directly resolve, it asks the _root servers_ for the DNS for `io`. It then asks
that server for the DNS servers for `suncoast.io`. As you remember we had to
tell our registrar our list of DNS servers. This is where that is critical. With
that list of DNS servers the request for `suncoast.io` is sent to the servers
with the information and the result percolates all the way back.

This seems like quite a lot of effort each time we make a request for
`suncoast.io`. Fortunately every DNS entry also comes with a Time To Live (TTL)
value which indicates how long each server should cache that information. This
may be as short as 60 seconds, or be expressed in days. A long TTL will allow
DNS servers to cache the information efficiently, but it will not allow us to
_change_ the information quickly. A short TTL will allow us to change our DNS
entries quickly, but will increase traffic for our clients and our servers.

Finally your computer, and even your browser, will cache this information to
make the lookup as efficient as possible.

## Let's try some DNS!

Let's try to find the IP address of `www.wikipedia.org`.

On a Mac OS or linux machine we have a tool named `dig`. On Windows you can use
`nslookup`

If we `dig www.wikipedia.org` (or `nslookup`) you will see a response like the
following. NOTE: you may receive different results since DNS changes all the
time.

```
www.wikipedia.org.	86400	IN	CNAME	dyna.wikimedia.org.
dyna.wikimedia.org.	600	IN	A	208.80.154.224
```

This indicates that `www.wikipedia.org` was resolved to a `CNAME` of
`dyna.wikimedia.org` with a TTL of 86400 seconds, or one day.

A `CNAME` is a `Canonical Name` record indicating the creator of
`www.wikipedia.org` really hosts that on a server with the name
`dyna.wikimedia.org` but would like to use `www.wikipedia.org` as a more
friendly name. When our computer receives back a `CNAME` answer it then sends
_another_ request but this time for `dyna.wikimedia.org` which receives an
answer of `208.80.154.224` which has a TTL of only 600 seconds, or ten minutes.

Finally our computer has a way to turn that name in the URL to a specific
address on the internet to communicate with. Whew!

## Making Connections

So what happens after our computer resolves the address of a server? The next
thing it needs to do is make a _connection_ to that server over what is called a
`socket`.

Every service on the internet is associated with a port number on a server. You
can think of the IP address of a server like your own postal address. If each
postal address is an apartment building, the port number is like the apartment
number where a specific service is located. HTTP is on port `80` while HTTPS is
on port `443`. SMTP (Simple Mail Transport Protocol) is found on port `25`, etc.
These services could be on different ports, but then users would have to type
that into the URL. For instance we could put our HTTP on port `8080` but then
users would have to run `http://suncoast.io:8080` and that isn't too friendly.
When we run our local development servers you will notice that we use a port
number for this. One of the common operating system rules is that user
applications are not allowed to run on ports less than `1024`. This prevents a
user of a server from starting their own HTTP server that the public would
access. It also allows us to run multiple development applications on different
_ports_ while we are developing.

The way in which this connection is created is complex and requires some
knowledge of the inner workings of the TCP/IP protocol. What is important to
know here is that your client will connect, via a socket connection, to a port
on the server. Once this is done information can flow through this connection in
both directions.

## Communicating over our connection

Now that we have a connection to our port (say port `80` for HTTP) how do we
communicate? Each protocol (HTTP, SMTP, DNS, FTP, etc.) has its own language.
Within that 100+ page _RFC_ we mentioned earlier is a detailed description of
the HTTP protocol. Every client (known as a `user agent` or more commonly known
to us as a browser) must speak this protocol to the server and every server must
respond in this protocol to a client.

As with many protocols you will notice that HTTP is an "answer-response" style
communication. That is we (the client) will introduce ourselves to the server
first and make a request. The server will acknowledge our greeting and provide a
response.

The simplest request to a web server looks like this:

```
GET / HTTP/1.1
Host: suncoast.io

```

The first line says we are making a `GET` request which is one of many style
requests. For now this indicates we just want to receive information. The second
part `/` is the URL within this server we are asking for, here we want the _home
page_, and finally we indicate which version of the protocol we are speaking.
This allows the server to know how to answer our request.

The second line says which host we are asking for. We need to repeat this here
since the server only knows that a client connected to its IP address. It does
not know which name they looked up to receive that address. A single server
might only provide for a single host, or it might host thousands of sites. This
`Host:` line tells the server which application/site the client is interested
in.

Finally, a third, blank line is sent to indicate that the client is done
speaking, for now, and it is time for the server to begin processing.

To try this, on Mac OS or Linux you can use the `nc` utility:

```shell
nc suncoast.io 80
```

Running this you will see nothing at all and you can enter the three lines
above.

You may receive the following result: (the service may have changed since this
writing)

```
HTTP/1.1 301 Moved Permanently
Cache-Control: public, max-age=0, must-revalidate
Content-Length: 36
Content-Type: text/plain
Date: Tue, 07 Apr 2020 23:10:57 GMT
Location: https://suncoast.io/
Age: 53123
Connection: keep-alive
Server: Netlify
X-NF-Request-ID: bf529c09-e2b6-4930-b104-da5c979f89bd-22571322

Redirecting to https://suncoast.io/
```

You will notice the first line contains the protocol version again. This is the
protocol version the server is responding with. The remainder of the line is a
response code (`301`) and a textual description. The `301` indicates that the
URL we gave it has been moved elsewhere. We'll see where in a moment.

The remaining lines before the blank line are known as `headers`. This is extra
information that is not part of the content that the user agent (client,
browser) is interested in. For instance we see that there are 36 characters in
the response body, that the response is a plain text, that the server's date and
time is 7th of April, 2020 and that the new location for this moved URL is
`https://suncoast.io`. There are many different types of headers and we will
learn more as we learn about both backend and frontend development.

Finally after the blank line is the body of the message. This is what would be
displayed to the user in a browser.

However, many user agents (browsers) will see the `301` and not display the
plain text page `Redirecting to https://suncoast.io` but rather follow the
redirection before showing the result.

In this case the user is being redirected from unencrypted `http` to encrypted
`https`. At this point the DNS lookup and socket connection process happens all
over again.

In fact as you are browsing the web this process is repeating itself hundreds
and thousands of times. As a simple example, almost every image on a web page
goes through this entire process. A simple web page rendering may make dozens to
hundreds of requests over HTTP/HTTPS. All involve this same lookup, connect,
communicate process.

As you develop code on the frontend and the backend, take a moment to reflect on
how much code and technology our applications ride atop. Many other engineers
and software developers have built amazing infrastructure that powers our
applications. Truly we are
[standing on the shoulders of giants](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants).
