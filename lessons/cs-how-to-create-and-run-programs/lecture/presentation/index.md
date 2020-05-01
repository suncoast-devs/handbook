theme: Next, 1

# Creating and running a `C#` program

---

Before we can write code in `C#` we must create a project.

Each project will be in it's own directory.

<sub>We should create these projects in an organized parent folder such as `sdg` in our _home_ directory</sub>

<br>
<br>
<br>

`.NET` provides a tool for creating new projects!

---

# [fit] Introducing `dotnet new`

- This command creates new projects from a **template**
- Includes starter code for us!
- We'll be using it **ALOT**

---

# [fit] Lets make our first `C#` project together!

![inline](./assets/lets-do-this.gif)

---

# [fit] Being in the right place <sub>at the right time</sub>

- In your shell change to the directory where you are going to keep your projects.
- For most of you, this can be an `sdg` folder in your home directory. Or similar inside of your `Documents` folder.

<br>

```sh
cd sdg
```

---

# [fit] Create our app!

- Use the dotnet tool to create our application

<br>
<br>

```bash
dotnet new console -o our-dotnet-app
```

---

# [fit] What does this do?

```bash

# command  action   template   output  project-name
#   |        |         |         |          |
#   v        v         v         v          v
  dotnet    new     console     -o     our-dotnet-app
```

---

# [fit] Where is our project?

We need to _change directory_ into the newly created directory

<br>
<br>

```sh
cd our-dotnet-app
```

---

# [fit] Open our project in our editor!

Now we can open our project in our editor!

<br>
<br>

```sh
code .
```

---

# [fit] Let's take a look around

![inline](./assets/activities.gif)

---

# `dotnet new` creates initial files for us

Let's see what files appear in our folder.

```
├── Program.cs
└── our-dotnet-app.csproj
```

We may also see an **`obj`** folder but we will ignore that for a moment.

^ There are two files in our folder. The first, `our-dotnet-app.csproj` is a file that `dotnet` wrote for us. It contains details about the project itself such as which version of `dotnet` our program needs. For the most part, we are _not going to modify this file_

---

# Run the code

The template `Program.cs` simply prints out the phrase `Hello World!` which is a common first learning task in a new language.

To get `dotnet` to run our program and see if the phrase appears on our screen we will use the **`dotnet run`** command.

<br>

```sh
dotnet run
```

---

# Output

We should see the following output on the screen if our program ran correctly:

<br>

```
Hello World!
```

<br>

Now as we change our code and add more functionality we can return to our terminal/Powershell and run `dotnet run` again to see our new code in action.

---

# Run our code automatically

We can also use the **`dotnet`** command to keep track of our code and run it every time we save our code!

<br>

```
dotnet watch run
```

<br>

```
dotnet watch run
watch : Started
Hello World!
watch : Exited
watch : Waiting for a file to change before restarting dotnet...
```

^ If you find yourself in a cycle of:
^ - Change code
^ - Run `dotnet run`
^ - See output
^ - Repeat
