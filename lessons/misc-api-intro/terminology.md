---
title: Common API Terms
order: 3
---

- `Endpoint` - The URL and VERB combination that performs some action such as
  returning information, updating information, or deleting information
- `Payload` or `Body` or `Data` - The information we send to the API
- `Request Headers` - A series of key/value pairs the client provides to the
  server containing details about the request. Can indicate the kind of data
  being sent, the kind of data the client can handle in response, and details
  about the client itself.
- `Response` - The information the API returns to us. Comprised of
  - `Response Code` - A number representing a kind of success or failure
  - `Response Headers` - A series of key/value pairs containing additional
    details about the response. Can indicate the kind of data being returned,
    details about how the server completed the request, or cookie values the
    client should store.
  - `Response Body` - The actual data returned to the client for processing
