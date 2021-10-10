---
title: Terminology
order: 1000
---

| Term                         | Definition                                                                                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSV                          | Comma Separated Values, a structure for storing data into a file.                                                                                              |
| CsvHelper                    | A Library package that allows our program to read and write CSV files.                                                                                         |
| StreamWriter                 | The purpose of this is to accept information and send it into the requested file we indicate to it (e.g. `var fileWriter = new StreamWriter("numbers.csv");`). |
| CsvWriter                    | Code that knows how to write in the CSV format to the fileWriter (e.g. `var csvWriter = new CsvWriter(fileWriter, CultureInfo.InvariantCulture);`).            |
| CultureInfo.InvariantCulture | Indicates that we do not want any specific formatting of strings or numbers in our file (e.g. don't format numbers like `12000` as `12,000` or `12.000`).      |
| StreamReader                 | Loads the data from our CSV file.                                                                                                                              |
| CsvReader                    | Reads the data from our CSV file.                                                                                                                              |
