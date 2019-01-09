# How to add sample data to a Rails application

Often times when developing an application we want to have sample data in our database. We *could* do this with `rails console` and using our models to create instances of models. However, this is not repeatable and we often forget how we created this sample data.

An alternative is to create a `rails task` to use the same commands from `rails console` but in a repeatable way.

## Step 1: Create a rails task

```sh
rails generate task sampledata:load
```

This will create a file `lib/tasks/sampledata` that looks like this:

```ruby
namespace :sampledata do
  desc "TODO"
  task load: :environment do
  end

end
```

## Step 2: Update the task

Change the `"TODO"` to a descriptive entry such as `"Loads sample data into the database"`

## Step 3: Add your sample data creation code

Inside the `task ... do` block add your code such as:

```ruby
restaurant = Restaurant.create!(name: "Ultimate Tacos", location: "123 Main Street")
```

*NOTE* we are using `create!` to get an exception and stop if there is any validation error. Otherwise, we might overlook data that is not created due to validation errors.

## Step 4: Run the task

This will run that task and create any of the data the script creates

```sh
rails sampledata:load
```

## Step 5: Clear the database if needed

To clear any existing data before running your sample data load you can do this:

```sh
rails db:schema:load
```
## Step 6: Use `Faker` to generate fake data

The [Faker](https://github.com/stympy/faker) library can be used to generate fake data

```sh
bundle add faker
```

Now we can use code such as `Faker::StarWars.character`, or `Faker::Name.name` to generate fake data.

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)
```

## Step 7: Supply sample images to models that use `ActiveStorage`

### Using a local file

If our `Restaurant` model has an attached `image` we can supply it like this:

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)

restuarant.image.attach(file_name: "pic.png", io: File.open(Rails.root.join("public/pic.png")))
```

This assumes the picture is in our `public` folder and is named `pic.png`

### Using a file directly from the internet

What if we want to use a placeholder image service?

If we add this code at the *TOP* of our file:

```ruby
require 'open-uri'
```

we can write code such as:

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)

restuarant.image.attach(file_name: "pic.png", io: open("https://placem.at/people?random=1"))
```

This will use the https://placem.at service to pull a random image and supply it as our restaurant image.

