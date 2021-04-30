---
title: Rhythm's gonna get you
tags: ['c-sharp', 'console', 'sql', 'ef-core']
---

# Rhythm's gonna get you

For this project, we will model and create a database. We are starting a record label company, and we a place to store our bands, albums, and eventually songs. You are creating a console app that stores our information in a database.

## Objectives

- Practice working with SQL
- Practice working with ORMs (EF Core)

## Setup

Create a console that allows a user to store and manage the company's bands, albums, and (eventually) songs.

## Top Tips

Although in reality an album could be done by more than one band, our system will just have an album involving **one** band. That is, an album belongs to one band.

### Setup

```shell
dotnet new sdg-console -o RhythmsGonnaGetYou
```

### Explorer Mode

- Create a database that stores `Albums`, `Bands`, and `Songs`. They should have the following properties, use your best judgment for types. Also include the foreign keys when making your CREATE TABLE statements. HINT: You might have to create your tables in a _specific order_

  - Albums

    - Id
    - Title
    - IsExplicit
    - ReleaseDate

  - Bands

    - Id
    - Name
    - CountryOfOrigin
    - NumberOfMembers
    - Website
    - Style
    - IsSigned
    - ContactName
    - ContactPhoneNumber

  - Songs

    - Id
    - Track Number
    - Title
    - Duration

  - A Band has many Albums and Album belongs to one Band. An Album has many Songs and a Song belongs to one Album.

- Create a menu system that shows the following options to the user until they choose to quit your program

  - Add a new band
  - View all the bands
  - Add an album for a band
  - Add a song to an album
  - Let a band go (update isSigned to false)
  - Resign a band (update isSigned to true)
  - Prompt for a band name and view all their albums
  - View all albums ordered by ReleaseDate
  - View all bands that are signed
  - View all bands that are not signed
  - Quit the program

### Adventure Mode

- Track the individual members of a band. Since musicians play in several different groups, create a new table called `Musicians` and make it a _many to many_ relationships with a Band.

- Add the following menu options
  - View albums in a genre
  - View all members of a band

### Epic Mode

- Add another entity that you feel would benefit the system. Update your ERD, tables, and user interface to support it.

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
