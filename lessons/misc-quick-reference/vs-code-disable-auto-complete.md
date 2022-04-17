---
title: Disable Auto Complete in Visual Studio Code
---

# Turn off all auto suggests in VS Code

Some students do not like the auto-complete nature of VS Code. I recommend
waiting to see if you find these auto-complete suggestions helpful. Later, if
you want, you can turn these features off.

Use the `View / Command Palette` menu option and type in 'Open Settings (JSON)"
to open your settings file. Just _INSIDE_ the opening `{` of the file, paste the
following:

```
"editor.suggest.showConstants": false, "editor.suggest.showConstructors": false,
"editor.suggest.showCustomcolors": false, "editor.suggest.showEnums": false,
"editor.suggest.showFields": false, "editor.suggest.showEvents": false,
"editor.suggest.showFolders": false, "editor.suggest.showFunctions": false,
"editor.suggest.showIssues": false, "editor.suggest.showKeywords": false,
"editor.suggest.showInterfaces": false, "editor.suggest.showMethods": false,
"editor.suggest.showProperties": false, "editor.suggest.showModules": false,
"editor.suggest.showOperators": false, "editor.suggest.showReferences": false,
"editor.suggest.showSnippets": false, "editor.suggest.showStructs": false,
"editor.suggest.showTypeParameters": false, "editor.suggest.showUnits": false,
"editor.suggest.showUsers": false, "editor.suggest.showValues": false,
"editor.suggest.showVariables": false, "editor.suggest.showWords": false,
"editor.suggest.showColors": false, "editor.suggest.showClasses": false,
```
