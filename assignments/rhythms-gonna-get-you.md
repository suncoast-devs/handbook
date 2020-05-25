---
title: Rhythm's gonna get you
tags: ["c-sharp", "console", "sql", "ef-core"]
---

# Rhythm's gonna get you

For this project, we will model and create a database. We are starting a record
label company, and we a place to store our bands, albums, and eventually songs.
You are creating a console app that stores our information in a database.

## Objectives

- Practice working with SQL
- Practice working with ORMs (EF Core)

## Requirements

Create a console that allows a user to store and manage the company's bands,
albums, and (eventually) songs.

```shell
dotnet new --install SDG.templates.Console.Database
```

### Explorer Mode

- [ ] Create a database that stores `Albums`, and `Bands`. They should
      have the following properties, use your best judgment for types. (We will
      add foreign keys in the next step)

  - [ ] Album
    - Id
    - Title
    - IsExplicit
    - ReleaseDate
  - [ ] Band
    - Id
    - Name
    - CountryOfOrigin
    - NumberOfMembers
    - Website
    - Style
    - IsSigned
    - ContactName
    - ContactPhoneNumber

  - Add foreign keys to fulfill the following

    - [ ] One Band has many Albums

  - [ ] Create an interface to let the user:

    - [ ] Add a new band
    - [ ] View all the bands
    - [ ] Add an album for a band
    - [ ] Let a band go (update isSigned to false)
    - [ ] Resign a band (update isSigned to true)
    - [ ] Prompt for a band name and view all their albums
    - [ ] View all albums ordered by ReleaseDate
    - [ ] View all bands that are signed
    - [ ] View all bands that are not signed

### Adventure Mode

- [ ] Add the ability for an album to have many songs
  - [ ] Song

    - Id
    - Title
    - Lyrics
    - Length
    - Genre
- [ ] Track the individual members of a band. Create a new table called
      `Musicians` and give it a many to many relationships with a Band
- Add the following queries
  - [ ] View albums in a genre
  - [ ] View all members of a band

### Epic Mode

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
