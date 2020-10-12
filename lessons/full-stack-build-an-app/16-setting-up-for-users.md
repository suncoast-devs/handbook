---
title: Setting up for Users
order: 16
---

# Setting up for Users

To keep track of the user that created restaurants and reviews we will need to
add the idea of users and login/logout features.

We will create a user model and the associated controller to manage them. Then
we will make user interface components for creating accounts and for logging in.

## User Model

To begin we will create a user model that stores information about the user.
Each user will have the following attributes:

- Id
- Full Name
- Email Address
- Password

It unwise to store **unencrypted** passwords in our database. Thus we will not
store the raw password, but a **hashed** password.

### Hashing Passwords

The idea of a hashed password relies on the idea of a "one-way function", that
is a function that is fast and easy to compute in one direction, but difficult
to compute in the other.

Let's take a look at the idea of a "two-way function". A simple example would be
`double`, a function that takes a number and multiplies it by two. If I give you
the input of this function, say `42`, you can quickly and reliably compute the
output, `84`. If I give you output, say `246`, it is trivial for you to figure
out what a corresponding input would be, `123`. This would be true no matter how
large the numbers get. Given `24686850904684` you can quickly figure out what
the corresponding input is.

A classic example of a one-way function is the prime factorization function.
Given two prime numbers, say `17` and `5`, it is easy to multiply them together
and get `85`. Given a number like `85`, it isn't too hard to figure out which
two prime numbers multiply together to get that number. This isn't true as the
number gets larger. If I give you the number `682654107378822049` it isn't so
trivial to compute the two numbers that are its prime factors (the answer is
`982451653` and `694847533` by the way)

For something like a password, we will use the idea of a `hashing function`. A
`hashing function` attempts to take an input value and compute a fixed size and
_mostly_ unique value. Small changes in the input should make a large and
unpredictable change in the output.

A popular hashing function is `SHA256`. If we take the text `dotnet` and process
it with this algorithm we get back out the result:
`3831fff4af76125e90081ac7eb855a1bcce0733045f9d26cd620466e0d4acf97`. If we take
the text `ditnet`, just one letter different we get
`fb89fe75f8be03f17435f563121e940360cd9fcfcbd3f8978b59c160fdaca711`

Given a result of a `SHA256` hash it is _very_ difficult to work out what text
generated it.

We will be using the built-in `dotnet` hashing algorithm based on
[`PBKDF2`](https://en.wikipedia.org/wiki/PBKDF2), a strong password hashing
algorithm.

## Defining our model

For our model, we will want to treat the `Id`, `FullName`, and `Email` as we
have other fields. For the password, we will be creating and storing a
`HashedPassword` in the database. This field should **never** be exposed in any
API so we will mark it as `JsonIgnore` so that serialization skips it.

We also wish to be able to _assign_ a plain text password to a user. The
assigning of this plain text password should have the effect of hashing that
value and storing it in the `HashedPassword` property. We will also need a way
to validate a user password.

```csharp
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace TacoTuesday.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [JsonIgnore]
        public string HashedPassword { get; set; }

        // Define a property for being able to _set_ a password
        public string Password
        {
            // Define only the `set` aspect of the property
            set
            {
                // When set, use the PasswordHasher to encrypt the password
                // and store the result in our HashedPassword
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }
        }

        // Add a method that can validate this user's password
        public bool IsValidPassword(string password)
        {
            // Look to see if this password, and the user's hashed password can match
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);

            // Return True if the verification was a success
            return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}
```

We will also mark the `FullName` and the `Email` as required since we'll use the
email as the login and we want to be able to address the user by name.

This class uses a custom `setter` for the `Password` which will allow us to set
it from the API. That setter hashes the password and assigns the user's
`HashedPassword` property (stored in the database)

We also have a method `IsValidPassword` that can identify if we have a valid
password.

## Generating a migration

Add the `Users` to the `DatabaseContext` class:

```csharp
// Tell the context about the User collection/table
public DbSet<User> Users { get; set; }
```

Add the migration:

```shell
dotnet ef migrations add CreateUserModel
```

After validating the migration looks good, run it:

```shell
dotnet ef database update
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="f644136"/>
