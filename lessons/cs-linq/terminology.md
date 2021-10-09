---
title: Terminology
order: 1000
---

| Term        | Definition                                                                                                                                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LINQ        | Stands for `L`anguage `IN`tegrated `Q`uery. It is a set of methods our various collections (e.g. `List`) will acquire once we add `LINQ` to our codebase.                                                       |
| Expressions | A combination of operands (variables, literals, method calls) and operators that can be evaluated to a single value.                                                                                            |
| Select      | Makes a new list, of `equal size`, by running an expression on every item in the list and using that value when filling the new list.                                                                           |
| Count       | Determines and returns how many items are in our list.                                                                                                                                                          |
| Where       | The `Where` statement is like a filter. Makes a new list, of _equal or smaller_ size by running an expression against every item, keeping items when the expression returns `true`.                             |
| Aggregate   | Returns a single value. It starts with a value we will call the `current value`. The given expression gets to use, one at a time, the current value and the item from the list, returning a new `current value` |
| Sum         | Returns _an integer_ by adding up the value of the expression for each item.                                                                                                                                    |
| All         | Returns _a boolean_ if the expression evaluates to `true` for every element in the list.                                                                                                                        |
