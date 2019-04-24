import CodePen from '@handbook/CodePen'

## Boolean attributes

<CodePen>

You'll sometimes see attributes written without values — this is perfectly allowed. These are called boolean attributes, and they can only have one value, which is generally the same as the attribute name. As an example, take the `disabled` attribute, which you can assign to form input elements if you want them to be disabled (greyed out) so the user can't enter any data in them.

As shorthand, it is perfectly allowable to write this as follows (we've also included a non-disabled form input element for reference, to give you more of an idea what is going on):

<pre data-lang='html'>
{`

<input type="text" value="I am disabled" disabled="disabled" />

<input type="text" value="I am also disabled" disabled>

<input type="text" value="I am enabled">
`}
</pre>

</CodePen>

---

import Nav from './Nav'

<Nav/>
