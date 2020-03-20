# Editors

## [Visual Studio Code](https://code.visualstudio.com)

_First time setup instructions for Mac_

- Make sure you are running VS Code from your applications folder, not your downloads
- Launch VS Code
- Use `Command Shift P` to launch the command palette
- Type `command` to search for the entry `Shell Command: Install 'code' command in PATH` and press `ENTER`

_Plugins we recommend to start with_

```sh
code --install-extension 2gua.rainbow-brackets
code --install-extension austincummings.razor-plus
code --install-extension esbenp.prettier-vscode
code --install-extension hasanali.gitignore-templates
code --install-extension jchannon.csharpextensions
code --install-extension jorgeserrano.vscode-csharp-snippets
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.csharp
code --install-extension ScottSauber.blazorsnippets
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension esbenp.prettier-vscode
```

_Settings we require_

Go to `Code` menu, then `Preferences`, then `Settings`

- In the search bar enter `tab size`
- Find the setting `Editor: Tab Size` and change this to `2`

- In the search bar enter `formatOn`
- Find the setting `Editor: Format on Save` and turn this _ON_

_Tips and Tricks_

In VS Code Use `Command Shift P` to launch the command palette and Type `Configure User Snippets`

- Look for the `csharp.json` and open it.
- Copy the following below and paste underneath the commented section within the `{}`.

```json
"Print to console": {
		"prefix": "write",
		"body": [
			"Console.WriteLine($\"$1\");",
			"$2"
		],
		"description": "Log output to console"
	},
	"Read from Console": {
		"prefix": "read",
		"body": [
			"Console.ReadLine().ToLower();",
			"$1"
		],
		"description": "Read input from user, set to lower"

	}
```
- This allows you to more efficiently create `Console.WriteLine($" ");` and `Console.ReadLine().ToLower();`

- [VS Code can do that?!](https://vscodecandothat.com)
