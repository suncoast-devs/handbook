# Creating and running a C# program

Before we can start writing code in `C#` we must have a directory and a project to contain our code. This project will tell our computer how to organize our code, how to make the code ready to run (known as `compiling`) and finally how to run our code.

## The `dotnet` command

We will be using the `dotnet` command frequently. This command has many ways to use it and we'll discover those in various other lessons. To get started with a `C#` project we'll use the `dotnet` command to make a `new` project. The simplest program we can write will interact with us, the user, by what we call the `console.` On Mac OS or Linux the `console` will be our `terminal/shell` and on Windows this will be our `Powershell` window.

# Running `dotnet new console` to make a new console application

Now that we have created a directory to contain our application we can use the `dotnet` app to create the project:

```sh
dotnet new console -o our-dotnet-app
```

You should see something similar to:

```
The template "Console Application" was created successfully.

Processing post-creation actions...
Running 'dotnet restore' on /Users/sdg-student/sdg/our-dotnet-app/our-dotnet-app.csproj...
  Restore completed in 190.3 ms for /Users/sdg-student/sdg/our-dotnet-app/our-dotnet-app.csproj.

Restore succeeded.
```

And then we will make that directory our current directory by using the `cd` command:

```sh
cd our-dotnet-app
```

# What files make up our project?

The `dotnet new console` command generates a new project for us from a _template_. In this case we are using the `console` template. Each template we use with the `dotnet new` command will generate a different set of startup files for us. These files give us a place to start as well as configure our tools so we can get started writing code.

Let's see what startup files appear in our folder:

```
.
├── Program.cs
└── our-dotnet-app.csproj
```

We may also see an `obj` folder but we will ignore that for a moment.

There are two files in our folder. The first, `our-dotnet-app.csproj` is a file that `dotnet` wrote for us. It contains details about the project itself such as which version of `dotnet` our program needs. For the most part, we are _not going to modify this file_

The second file, `Program.cs` is where we will start writing our `C#` code. The `.cs` file extension indicates to our code editor as well as the `dotnet` tool that this code is written in the `c-sharp` (or `cs`) language.

# Let's run our code!

The template `Program.cs` simply prints out the phrase `Hello World!` which is a common [first learning task in a new language.](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)

To get `dotnet` to run our program and see if the phrase appears on our screen we will use the `dotnet run` command.

`dotnet run`

We should see the following output on the screen if our program ran correctly:

```
Hello World!
```

Now as we change our code and add more functionality we can return to our terminal/Powershell and run `dotnet run` again to see our new code in action.

# Watch our code and automatically run it.

If you find yourself in a cycle of:

- Change code
- Run `dotnet run`
- See output
- Repeat

you can use an alternative to `dotnet run` called `dotnet watch run`. By using this version of the command we are telling `dotnet` to watch our code for any changes and as soon as it sees any, to run it right away.

With this option our terminal/Powershell will look like:

```
dotnet watch run
watch : Started
Hello World!
watch : Exited
watch : Waiting for a file to change before restarting dotnet...
```

Now our working cycle can be:

- Change code
- See output
- Repeat

This leaves us in our code editor more often and allows us to focus.
