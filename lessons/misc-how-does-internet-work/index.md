---
title: How does the web work
---

## Domains and Hosts

- How does the browser know where to go when "suncoast.io" is requested?

  - Domain names, host names, TLDs
    - _Top Level Domains_ (TLDs) allocated by ICANN
    - Domains registered with a domain registrar
      - Domain ownership specifies a number of things
        - Contact information
        - Main DNS (more on that later)
    - Host names come before the domain name
      - Controlled by the domain owner
  - DNS
    - Domain Name Service
    - Translates a host name, eventually, into an IP address.
  - Lookups and TTLs for DNS
    - DNS results come with a _Time To Live_ (expiry time)
    - Propagating DNS queries
    - This way new DNS entries can be updated
  - How to use `dig`, a tool to look up DNS

    ```shell
    dig gstark.com
    dig suncoast.io
    dig amazon.com
    ```

  - Load balancing (multiple A records), fault tolerance
  - Special name for referencing our own host:
    - `localhost` resolves to `127.0.0.1`

## Making Connections

- What happens after our computer resolves the address of a server?
  - Connect to a `service` over a `socket`
    - A service is something like 'http' or 'https', or email via 'pop3' or
      'smtp', or our `postgres` database
    - The socket determines which `port number` to connect to. Each service
      dedicates a specific port number to listen on. Think of the `ip` as the
      address of a building and the `port number` as the apartment number or the
      office number. Port numbers for services can be between 1 and 65535, but
      are typically less than 1024. For instance `http` is `80` while `https` is
      `443`.
  - What service are we talking about (web, email, etc)
  - How does the server know? PORTS
  - Unencrypted web is port 80
    - e.g. http://gstark.com:80
  - Encrypted web is port 443
- How do we connect to one of these ports?
  - Try it like the browser does!
  - Use the tool: `telnet`
    - Mac OS: `brew install telnet`
    - Linux: likely already installed
  - Now that we are connected, how do we talk?
  - http protocol
    - [documented](https://tools.ietf.org/html/rfc2616)

### HTTP

- GET a page

  ```
  GET / HTTP/1.1
  Host: gstark.com

  ```

  (blank line after Host:)

- Spits back a webpage (and some other stuff)
  - Also headers
  - status codes (404 not found, 500 errors, ...)
  - https://http.cat
- What are other HTTP headers?

  - `Date` _Timestamp on Server_
  - `Content-Type` _How should this content be interpreted_
  - `Content-Length` _How long is this content in bytes_
  - `Last-Modified` _When was this content last modified_
  - `ETag` _A checksum of the content, would be the same value for the same
    content_

- Other tools
  - `curl`
  - `http` (httpie)
- `http amazon.com`
  - Get back a 301 redirect
  - redirects to `https://amazon.com`
  - which redirects to `https://www.amazon.com`
