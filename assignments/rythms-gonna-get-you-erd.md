---
title: Rhythm's gonna get you - ERD
tags: ['c-sharp', 'console', 'sql', 'ef-core']
---

# Rhythm's gonna get you - ERD

For this project, we will model and create a database. We are starting a record label company, and we a place to store our bands and albums. You are creating a console app that stores our information in a database.

## Objectives

- Practice creating an Entity Relationship Diagram
- Practice working with SQL

## Requirements

Create the ERD (Entity Relationship Diagram) and resulting tables that allow a user to store and manage the company's bands, albums, and songs.

## Top Tips

Although in reality an album could be done by more than one band, our system will just have an album involving **one** band. That is, an album belongs to one band.

### Explorer Mode

- Create an ERD for these entities: `Albums`, `Bands`, and `Songs`. They should have the following properties, use your best judgment for types.

  - Album

    - Id
    - Title
    - IsExplicit
    - ReleaseDate

  - Band

    - Id
    - Name
    - CountryOfOrigin
    - NumberOfMembers
    - Website
    - Style
    - IsSigned
    - ContactName
    - ContactPhoneNumber

  - Song

    - Id
    - Track Number
    - Title
    - Duration

  - Draw the relationship lines between these entities. Remember that SQL JOIN gives us the ability to traverse from one table to another _through_ a table in-between. (HINT)

  - Create SQL statements that:
    - Add a new band
    - View all the bands
    - Add an album for a band
    - Add a song to an album
    - Let a band go (update isSigned to false)
    - Resign a band (update isSigned to true)
    - Given a band name, view all their albums
    - View all albums (and their associated songs) ordered by ReleaseDate
    - View all bands that are signed
    - View all bands that are not signed
