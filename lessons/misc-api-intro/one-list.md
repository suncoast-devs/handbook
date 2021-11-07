---
title: A more complex API
order: 1
---

After seeing a simple example of an API let's take a look at a more complex
example.

## One List

The One List API is an API for managing a list of todo items.

Let's review the style of API access we've already seen. The first URL pattern
will retrieve the full list of TODO items.

`/items?access_token={access_token}`

Each URL we investigate will have an `access_token` and this will allow us to
maintain different lists for different users.

The examples below are based on the
[online documentation](https://one-list-api.herokuapp.com/) of the One List API.

## `GET` `/items?access_token={access_token}`

This API URL will get the list of all todo items. If we run `http` to fetch data
from the API like:

```shell
http "https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage"
```

We would see output similar to:

```json
[
  {
    "id": 6,
    "text": "Finish Assignment",
    "complete": true,
    "user_id": 4,
    "created_at": "2016-08-17T20:06:34.874Z",
    "updated_at": "2018-10-02T16:10:59.754Z"
  },
  {
    "id": 20,
    "text": "eat breakfast",
    "complete": true,
    "user_id": 4,
    "created_at": "2016-08-17T20:42:59.666Z",
    "updated_at": "2018-10-02T16:11:59.553Z"
  }
]
```

We see that each item has six fields, `id`, `text`, `complete`, `user_id`,
`created_at`, and `updated_at`.

| field      | description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| id         | The unique identifier for this column. It will be an increasing value.  |
| text       | The description of the todo.                                            |
| complete   | A boolean indicating if we consider the todo complete.                  |
| user_id    | Identifies the user/list and should be the same for any `access_token`. |
| created_at | The timestamp when the item was created.                                |
| updated_at | The timestamp when the item was last updated.                           |

## Get a specific item

Use the URL `GET` `/items/{id}?access_token={access_token}` to retrieve a
specific token. Notice that in the URL we put the specific TODO item's `id`
while also providing the access token.

```shell
http "https://one-list-api.herokuapp.com/items/20?access_token=illustriousvoyage"
```

This will return the details on only item with `id` of `20`.

```json
{
  "id": 20,
  "text": "eat breakfast",
  "complete": true,
  "user_id": 4,
  "created_at": "2016-08-17T20:42:59.666Z",
  "updated_at": "2018-10-02T16:11:59.553Z"
}
```

## Create a new item

We are now going to see our first API usage where we send data to the API to be
stored/updated/deleted.

We use the URL `POST` `/items?access_token={access_token}` to **CREATE** an
item. Notice for the first time we are using a different verb, the `POST`. The
`POST` verb cannot be generated from the URL bar, but can from a web form, which
makes sense since we often use forms to create data, as well as from code or the
command line.

The JSON we will send to the server should look like this:

```json
{
  "item": {
    "text": "New text here",
    "complete": false
  }
}
```

We can specify this on the command line with `httpie` by writing:
`item:='{ "text": "New text here", "complete": false }'`. We can also specify
the `POST` verb.

```shell
http POST "https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage" item:='{ "text": "New text here", "complete": false }'
```

The response from this request will be the JSON representation of the newly
created todo item. If you are also trying this, your IDs and timestamps will be
different.

```json
{
  "id": 1588,
  "text": "New text here",
  "complete": false,
  "user_id": 4,
  "created_at": "2020-04-23T00:56:05.709Z",
  "updated_at": "2020-04-23T00:56:05.709Z"
}
```

If you keep repeating the same command you will see new items being created and
returned to you, each with new `id` values.

## Update an item

To update an item with this API we use a very similar structure as the `POST`
used to create, but this time we change the VERB to `PUT` and include the `id`
in the URL:

`PUT` `/items/{id}?access_token={access_token}`

The body of the method has the same structure as the `POST`, that is the JSON
object containing `text` and `complete` keys.

```shell
http PUT "https://one-list-api.herokuapp.com/items/1588?access_token=illustriousvoyage" item:='{ "text": "New text here. Updated", "complete": true }'
```

The JSON response from this will be similar to:

```json
{
  "id": 1588,
  "text": "New text here. Updated",
  "complete": true,
  "user_id": 4,
  "created_at": "2020-04-23T00:56:05.709Z",
  "updated_at": "2020-04-23T01:03:16.815Z"
}
```

Notice that the `text` and `complete` are updated, but the server has also
updated the `updated_at` time.

## Deleting items

To delete an item we switch to using the `DELETE` verb and specify the item in
the URL.

`DELETE` `/items/{id}?access_token={access_token}`

However we do not specify a body since no additional information is needed to
find the item and remove it.

```shell
http DELETE "https://one-list-api.herokuapp.com/items/1588?access_token=illustriousvoyage"
```

And this will return an empty response.

But what would happen if we were to try to delete the item again? We need to
also consider the `response code` that the server sends us in addition to the
body of the response. The response code is a number that represents a status of
what the server did in _response_ to our request. If we run that `http` command
to delete that item again, you will see that this will return a `404` response
code which means `not found`.

## Review our API questions

If you review the API documentation at: `https://one-list-api.herokuapp.com/`
you will see that each API URL (known as an _end point_) has different answers
to our _API questions_

Generally these answers are:

- What is the input that needs to be sent?
  `Any URL parameters, like {id} and query parameters like {access_token} as well as the body of the request if required`
- What is the format of the input? `The body will be in JSON format`
- What is the name/location/identity of the code to be run?
  `This will be the URL and the specific verb to use`
- What is the output that will be returned?
  `The response body and the response code`
- What is the format of the output?
  `The body will be in JSON and the response code will be a number`

## HTTP response codes

THe various HTTP response codes come in five sections.

| Code Range | Description                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 100-199    | Informational responses. These are rarely seen in most APIs.                                                                                                                 |
| 200-299    | Success. The response is some form of success. Some of the successes are more specific. For instance 201 indicates that there was a success and some new resource is created |
| 300-399    | Redirection. Indicates that the required resource is located at a different URL                                                                                              |
| 400-499    | Client error. Indicates that the client has not complied with the API in some way.                                                                                           |
| 500-599    | Server error. The server experienced some form of error when handling the request                                                                                            |

Here are some common HTTP response codes you are likely to see

| Code | Description                                                                                                                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | All is ok. Data is likely included in the response                                                                                                                                                                                                                       |
| 201  | All is ok and we created something on your behalf. Data is likely included in the response. Also a `Location` header indicating the URL of the new resource may be included                                                                                              |
| 204  | No content. The request was a success but no content is being returned                                                                                                                                                                                                   |
| 206  | Partial content. Only part of the content requested is being returned                                                                                                                                                                                                    |
| 301  | Moved permanently. The resource has been moved to a new URL, which is included in the `Location` header. The client can cache this result and use the new URL from now on                                                                                                |
| 302  | Moved temporarily. The resource can be located at a new URL, included in the `Location` header. The client should continue to use the original URL for future requests because the relocation is only temporary                                                          |
| 304  | Not modified. Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy |
| 400  | Bad request. The request could not be processed by the server. Perhaps the body was not parsable, or required parameters are missing                                                                                                                                     |
| 401  | Unauthorized. The resource requires authorization in order to process and no valid authorization was provided                                                                                                                                                            |
| 404  | Not found. The requested resource cannot be found.                                                                                                                                                                                                                       |
| 405  | Method not allowed. The verb specified is not supported by the server                                                                                                                                                                                                    |
| 406  | Not acceptable. The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request                                                                                                                          |
| 500  | Internal server error. The server experienced an internal error. Perhaps there is a syntax error in the code, or the database is not working.                                                                                                                            |
| 501  | Not implemented. The service to process this request is not implemented                                                                                                                                                                                                  |

## Sites to look up response codes

- [HTTP Status Dogs](https://httpstatusdogs.com/)
- [Text HTTP Status](https://httpstatuses.com/)
- [HTTP Status Cats](https://www.flickr.com/photos/girliemac/albums/72157628409467125/)
