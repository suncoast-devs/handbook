# How to add sample data to a Rails application

Often times when developing an application we want to have sample data in our database. We *could* do this with `rails console` and using our models to create instances of models. However, this is not repeatable and we often forget how we created this sample data.

An alternative is to create a `rails task` to use the same commands from `rails console` but in a repeatable way.

## Step 1: Create a rails task

```sh
rails generate task sampledata:load
```

This will create a file `lib/tasks/sampledata.rb` that looks like this:

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

## Additional: Related Models

Let's say that we have a model `Review` that relates to a `Restaurant` with a `belongs_to` relationship.

```ruby
class Review < ApplicationRecord
  belongs_to :restaurant
end
```

Then we can create related reviews like this:

```ruby
restaurant = Restaurant.create!(name: "Ultimate Tacos", location: "123 Main Street")

restaurant.reviews.create!(body: "Best tacos in the world", stars: 5)
restaurant.reviews.create!(body: "Definitely try the chips and salsa.", stars: 4)
restaurant.reviews.create!(body: "Pro tip: tacos are $2 on Taco Tuesday", stars: 4)
```

_NOTE_: This also works well when you have data related to a user. For instance:

```ruby
bill = User.create!(name: "Bill")
bill.posts.create!(subject: "How to generate data in Ruby", text: "Lorem ipsum...")
```

## Additional: Use `Faker` to generate fake data

The [Faker](https://github.com/stympy/faker) library can be used to generate fake data

```sh
bundle add faker
```

Now we can use code such as `Faker::StarWars.character`, or `Faker::Name.name` to generate fake data.

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)
```

## Addutional: Supply sample images to models that use `ActiveStorage`

### Using a local file

If our `Restaurant` model has an attached `image` we can supply it like this:

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)

restuarant.image.attach(filename: "pic.png", io: File.open(Rails.root.join("public/pic.png")))
```

This assumes the picture is in our `public` folder and is named `pic.png`

### Using a file directly from the internet

What if we want to use a placeholder image service?

If we add the `down` gem to our `Gemfile` we can write code such as:

```ruby
restaurant = Restaurant.create!(name: Faker::Company.name, location: Faker::Address.full_address)

restuarant.image.attach(filename: "pic.png", io: Down.download("https://placem.at/people?random=1"))
```

This will use the https://placem.at service to pull a [random image](https://placem.at/people?random=1) and supply it as our restaurant image.

