---
title: Rhythm's gonna get you
---

# Rhythm's gonna get you

For the past few lessons, we have chatted about and worked with data; for this
project, we continue our journey into data and modeling a database. We are
starting a record label company, and we a place to store our bands, albums, and
songs. You are creating a console app that stores our companies information in a
database.

## Objectives

- Practice working with SQL
- Practice working with ORMs (EF Core)

## Requirements

Create a console that allows a user to store and manage the company's bands,
albums, and songs.

```shell
dotnet new --install SDG.templates.Console.Database
```

### Explorer Mode

- [ ] Create a database that stores `Albums`, `Bands`, and `Songs`. They should
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
    - PersonOfContact
    - ContactPhoneNumber
  - [ ] Song

    - Id
    - Title
    - Lyrics
    - Length
    - Genre

  - Add foreign keys to fulfill the following

    - [ ] One Band has many Albums
    - [ ] One Album has many Songs

  - [ ] Create an interface to let the user:

    - [ ] Add a new band
    - [ ] View all the bands
    - [ ] Add an album
    - [ ] Add songs to an album
    - [ ] Let a band go (update isSigned to false)
    - [ ] Resign a band (update isSigned to true)
    - [ ] View all albums for a band
    - [ ] View all the albums ordered by ReleaseDate
    - [ ] View an album's songs
    - [ ] View all bands that are signed
    - [ ] View all bands that are not signed

### Adventure Mode

- [ ] Add the ability to:
  - [ ] Associate one song with many genres
  - [ ] Associate one band with many styles
- [ ] Track the individual members of a band. Create a new table called
      `Musicians` and give it a many to many relationships with a Band
- Add the following queries
  - [ ] View albums in a genre
  - [ ] View all members of a band

### Epic Mode

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
