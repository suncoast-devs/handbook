---
title: Writing an API Client
tags: ['api']
---

In this project, you will practice accessing an API. You'll see how an API request is made from code, and see how data is returned from an API.

## Objectives

- Understand API requests and responses from code.

### Setup

For C#:

```shell
dotnet new sdg-console -o ApiClient
```

For JavaScript:

```shell
app-app --beta ApiClient
```

### Explorer Mode

- [ ] TOP TIP: Choose an API that has a simple, less nested API. Perhaps one that just returns an array of one-level-deep objects. This will make your task _significantly_ easier.
- [ ] Choose one of the APIs from [this list](https://github.com/public-apis/public-apis) that does not request "AUTH" (Authorization) since an API that requires authorization is a little more difficult to use when first learning. I have also selected some sample APIs that will be good choices:

| API            | Documentation                                  |
| -------------- | ---------------------------------------------- |
| Dogs           | https://dog.ceo/dog-api/                       |
| Studio Ghibli  | https://ghibliapi.herokuapp.com/#tag/Films     |
| Open Brewery   | https://www.openbrewerydb.org/                 |
| Recipes        | http://www.recipepuppy.com/about/api/          |
| Deck of Cards! | http://deckofcardsapi.com/                     |
| Geocode        | https://geocode.xyz/api                        |
| Jobs           | https://jobs.github.com/api                    |
| Lyrics         | https://lyricsovh.docs.apiary.io/#reference    |
| Quotes         | https://pprathameshmore.github.io/QuoteGarden/ |
| SpaceX         | https://docs.spacexdata.com/?version=latest    |
| Jokes          | https://github.com/15Dkatz/official_joke_api   |
| Star Wars API  | https://swapi.dev                              |

- [ ] After choosing your API **read** the documentation.
- [ ] Create a new application for accessing the API. (For `C#` use `sdg-console`, for `JS` use `app-app`)
- [ ] For `C#` create a class to store information that comes back from your API.
- [ ] Write code to query the API and show results.
- [ ] If your API has more than one endpoint (URL) support a few options, perhaps by creating a menu system in your application.

## Epic Mode

Use the site [Mockaroo](https://mockaroo.com/) to create a mock API. You may need an account and then learn how their "Mock API" feature works.

Once you have created your Mock API for whatever schema you wish, create a client application to work with it.
