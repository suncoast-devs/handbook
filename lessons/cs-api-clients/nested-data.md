---
title: Handling Nested Data
order: 4
---

The API data we've seen so far in this lesson has been a flat list of objects.
What would we do if the API presents nested data?

For this, we have to use nested classes and objects as well.

# Deck of Cards API

The [Deck of Cards API](https://deckofcardsapi.com/) is an excellent example of
a nested API. We can create a simple client for it.

## Getting Started

First, we will use the endpoint `Shuffle the Cards` endpoint to get a new list
of cards. The endpoint is available at
`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

The response from this API endpoint looks like this:

```json
{
  "success": true,
  "deck_id": "3p40paa87x90",
  "shuffled": true,
  "remaining": 52
}
```

We can create a class to hold this information.

```C#
using System;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DeckOfCardsClient
{
    class Program
    {
        class Deck
        {
            [JsonPropertyName("success")]
            public bool Success { get; set; }

            [JsonPropertyName("deck_id")]
            public string DeckId { get; set; }

            [JsonPropertyName("shuffled")]
            public bool Shuffled { get; set; }

            [JsonPropertyName("remaining")]
            public int Remaining { get; set; }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

            // Parse the JSON data into a `Deck` object.
            var deck = await JsonSerializer.DeserializeAsync<Deck>(responseAsStream);

            // Print out the deck identifier
            Console.WriteLine($"The deck id is {deck.DeckId}");
        }
    }
}
```

## Getting a few cards from the deck

We can now extend the `Deck` class and add a method to return some cards. The
API gives us an endpoint to deal a few cards:

`https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2`

The `count` query parameter allows us to specify the number of cards to draw
while the `<<deck_id>>` represents the place in the URL where we should place
the `DeckId` property identifying the current deck.

The data returned by this API endpoint is not a flat object or list. It is a
nested structure:

```json
{
  "success": true,
  "cards": [
    {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    },
    {
      "image": "https://deckofcardsapi.com/static/img/8C.png",
      "value": "8",
      "suit": "CLUBS",
      "code": "8C"
    }
  ],
  "deck_id": "3p40paa87x90",
  "remaining": 50
}
```

Normally we would make one class to hold this response. Here, however, we need
two classes to process this data correctly. One that wraps the outer layer of
the object containing the attributes `success`, `cards`, `deck_id`, and
`remaining` and another to capture the structure for individual cards with
properties `image`, `value`, `suit`, and `code`.

## Defining the Card class

We will define the card class _first_ since it is the inner class. We will also
define the class as a sibling of the `Deck` class as we'd like to be able to use
this class in our main code.

```C#
class Card {
  [JsonPropertyName("image")]
  public string Image { get; set; }

  [JsonPropertyName("value")]
  public string Value { get; set; }

  [JsonPropertyName("suit")]
  public string Suit { get; set; }

  [JsonPropertyName("code")]
  public string Code { get; set; }
}
```

## Defining the API response class

Now that we have a Card class we can define the class we'll use to process this
API result:

```C#
class DealCardsResponse {
  [JsonPropertyName("success")]
  public bool Success { get; set; }

  [JsonPropertyName("deck_id")]
  public string DeckId { get; set; }

  [JsonPropertyName("remaining")]
  public int Remaining { get; set; }

  // This is a nested property. The JSON
  // we deserialize is an array of cards
  [JsonPropertyName("cards")]
  public List<Card> Cards { get; set; }
}
```

In this class, we can teach the deserializer to treat the JSON array of `cards`
as a `List<Card>` in `C#`. The deserializer will then treat all the JSON objects
inside that part of the response as `Card` objects and deserialize them
accordingly.

```json
{
  // All this is deserialized using the properties defined in DealCardsResponse
  "success": true,
  "deck_id": "3p40paa87x90",
  "remaining": 50,

  // This is deserialized based on DealCardsResponse and the property Cards
  "cards": [
    // But it is an array of Card, so each of these are deserialized as Card objects
    {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    },
    {
      "image": "https://deckofcardsapi.com/static/img/8C.png",
      "value": "8",
      "suit": "CLUBS",
      "code": "8C"
    }
  ]
}
```

## Creating a method on Deck to give us some cards

First, we will define our class `DealCardsResponse` _within_ our `Deck` class
definition. We'll also mark the class as `private` so that nothing other than
the `Deck` code can use it. We do this because the `DealCardsResponse` is an
[implementation detail](https://enterprisecraftsmanship.com/posts/what-is-implementation-detail/).
We need this class to write the implementation of dealing cards, but nobody
_using_ the `Deck` class needs this implementation. The `DealCardsResponse`
class is _unlike_ the `Card` class that we _do_ expose outside the `Deck` since
we need to share how `Card`s work.

The code for dealing a card is:

```C#
public async Task<List<Card>> DealCardsAsync(int count)
{
  var client = new HttpClient();

  // Make a `GET` request to the API and get back a *stream* of data.
  var responseAsStream = await client.GetStreamAsync($"https://deckofcardsapi.com/api/deck/{DeckId}/draw/?count={count}");

  // Parse the JSON data into a `DealCardsResponse` object.
  var response = await JsonSerializer.DeserializeAsync<DealCardsResponse>(responseAsStream);

  return response.Cards;
}
```

## Using our new code:

To use this code, we need to call `DealCardsAsync` and `await` the result. We
then have a `List<Card>` we can iterate over.

```C#
var cards = await deck.DealCardsAsync(2);

foreach (var card in cards)
{
    Console.WriteLine($"The {card.Value} of {card.Suit}");
}
```

## Putting it all together

We have used two API endpoints from the
[Deck of Cards API](https://deckofcardsapi.com/). The first, creating a deck,
returns a single object and was straightforward to deserialize using a single
class.

The second API endpoint, dealing cards, returns a nested object, and thus we
needed to define multiple classes to properly deserialize it. The `Card` class
we made `public` so it is available to users of the `Deck` class. The other
class, `DealCardsResponse`, is an implementation detail, and we don't need to
expose it, and thus we define it _within_ the `Deck` class and mark it as
`private`.

The entire code is presented here:

```C#
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DeckOfCardsClient
{
    class Program
    {
        class Card
        {
            [JsonPropertyName("image")]
            public string Image { get; set; }

            [JsonPropertyName("value")]
            public string Value { get; set; }

            [JsonPropertyName("suit")]
            public string Suit { get; set; }

            [JsonPropertyName("code")]
            public string Code { get; set; }
        }

        class Deck
        {
            [JsonPropertyName("success")]
            public bool Success { get; set; }

            [JsonPropertyName("deck_id")]
            public string DeckId { get; set; }

            [JsonPropertyName("shuffled")]
            public bool Shuffled { get; set; }

            [JsonPropertyName("remaining")]
            public int Remaining { get; set; }

            // This class is an implementation detail of a Deck
            // and we don't need this code *outside* of the Deck itself
            private class DealCardsResponse
            {
                [JsonPropertyName("success")]
                public bool Success { get; set; }

                [JsonPropertyName("deck_id")]
                public string DeckId { get; set; }

                [JsonPropertyName("remaining")]
                public int Remaining { get; set; }

                // This is a nested property. The JSON
                // we deserialize is an array of cards
                [JsonPropertyName("cards")]
                public List<Card> Cards { get; set; }
            }

            public async Task<List<Card>> DealCardsAsync(int count)
            {
                var client = new HttpClient();

                // Make a `GET` request to the API and get back a *stream* of data. Use the `DeckId` and `count` to populate the URL
                var responseAsStream = await client.GetStreamAsync($"https://deckofcardsapi.com/api/deck/{DeckId}/draw/?count={count}");

                // Parse the JSON data into a `DealCardsResponse` object.
                var response = await JsonSerializer.DeserializeAsync<DealCardsResponse>(responseAsStream);

                return response.Cards;
            }
        }

        static async Task Main(string[] args)
        {
            var client = new HttpClient();

            // Make a `GET` request to the API and get back a *stream* of data.
            var responseAsStream = await client.GetStreamAsync("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

            // Parse the JSON data into a `Deck` object.
            var deck = await JsonSerializer.DeserializeAsync<Deck>(responseAsStream);

            // Print out the deck identifier
            Console.WriteLine($"The deck id is {deck.DeckId}");

            var cards = await deck.DealCardsAsync(2);

            foreach (var card in cards)
            {
                Console.WriteLine($"The {card.Value} of {card.Suit}");
            }
        }
    }
}
```
