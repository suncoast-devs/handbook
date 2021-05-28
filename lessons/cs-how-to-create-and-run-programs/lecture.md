theme: Next, 1

# Creating and running a `C#` program

---

# Projects

- Before we can write code in `C#` we must create a project.

- Each project will be in its own directory.

- We should create these projects in an organized parent folder such as `sdg` in our _home_ directory

<br />

`.NET` provides a tool for creating new projects!

---

# [fit] Introducing `dotnet new`

- This command creates new projects from a **template**
- Includes starter code for us!
- We'll be using it **A LOT**

---

# [fit] Lets make our first `C#` project together!

![inline](./assets/lets-do-this.gif)

---

# [fit] Being in the right place <sub>at the right time</sub>

- In your shell change to the directory where you are going to keep your projects.
- Good options:
  - **`sdg`** directory in home folder
  - **`sdg`** directory on your desktop
  - **`sdg`** directory in your Documents folder
  - Or name the directory `code`, `school` or `dev`; but do keep all your projects together in a folder.

<br />

---

# Example:

```shell
cd sdg
```

---

# [fit] Create our app!

- Use the dotnet tool to create our application

<br />
<br />

```shell
dotnet new sdg-console -o OurDotnetApp
```

---

# [fit] What does this do?

```shell

# command  action   template   output  project-name
#   |        |         |         |          |
#   v        v         v         v          v
  dotnet    new    sdg-console  -o     OurDotnetApp
```

---

# [fit] Where is our project?

We need to _change directory_ into the newly created directory

<br />
<br />

```shell
cd OurDotnetApp
```

---

# [fit] Open our project in our editor!

Now we can open our project in our editor!

<br />
<br />

```shell
code .
```

---

# [fit] Let's take a look around

![inline](./assets/activities.gif)

---

# [fit] `dotnet new` creates initial files for us

Let's see what files appear in our folder.

```
├── Program.cs
└── OurDotnetApp.csproj
```

We may also see an **`obj`** folder but we will ignore that for a moment.

^ There are two files in our folder. The first, `OurDotnetApp.csproj` is a
file that `dotnet` wrote for us. It contains details about the project itself
such as which version of `dotnet` our program needs. For the most part, we are
_not going to modify this file_

---

# Run the code

The template `Program.cs` prints out the phrase `Welcome to C#`.

To get `dotnet` to run our program and see if the phrase appears on our screen we will use the **`dotnet run`** command.

<br />

```shell
dotnet run
```

---

# Output

We should see the following output on the screen if everything is correct:

<br />

```
Welcome to C#
```

<br />

Now as we change our code and add more functionality we can return to our terminal/Powershell and run `dotnet run` again to see our new code in action.

---

# Run our code automatically

We can also use the **`dotnet`** command to keep track of our code and run it every time we save our code!

<br />

```
dotnet watch run
```

<br />

```
dotnet watch run
watch : Started
Welcome to C#
watch : Exited
watch : Waiting for a file to change before restarting dotnet...
```

^ If you find yourself in a cycle of:

^ - Change code

^ - Run `dotnet run`

^ - See output

^ - Repeat
