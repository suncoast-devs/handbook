---
title: Ciphers
tags: ['algorithms']
---

Congratulations, you've been recruited into the Suncoast Developers Spy Agency (SDSA). Before we can send you out into the field we need to make sure you know how to encode and decode our secret messages!

## Objectives

- Continue working with algorithmic thinking

## Requirements

Write your answers in a _text_ file on your computer. If you have `Visual Studio Code` installed, feel free to use it. Otherwise use `Notepad` or `TextEdit`.

### Vigenère cipher

We looked at Caser ciphers in class. For our field work we'll use a more advanced version, known as a Vigenère cipher.

`[The following is from Wikipedia]` [citation](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)

In a Caesar cipher, each letter of the alphabet is shifted along some number of places. For example, in a Caesar cipher of shift 3, `A` would become `D`, `B` would become `E`, `Y` would become `B` and so on. The Vigenère cipher has several Caesar ciphers in sequence with different shift values.

To encrypt, a table of alphabets can be used, termed a _tabula recta_, _Vigenère square_ or _Vigenère table_. It has the alphabet written out `26` times in different rows, each alphabet shifted cyclically to the left compared to the previous alphabet, corresponding to the `26` possible Caesar ciphers. At different points in the encryption process, the cipher uses a different alphabet from one of the rows. The alphabet used at each point depends on a repeating keyword.[citation needed]

For example, suppose that the plaintext to be encrypted is

    ATTACKATDAWN.

The person sending the message chooses a keyword and repeats it until it matches the length of the plaintext, for example, the keyword "LEMON":

    LEMONLEMONLE

Each row starts with a key letter. The rest of the row holds the letters A to Z (in shifted order). Although there are 26 key rows shown, a code will use only as many keys (different alphabets) as there are unique letters in the key string, here just 5 keys: {L, E, M, O, N}. For successive letters of the message, successive letters of the key string will be taken and each message letter enciphered by using its corresponding key row. The next letter of the key is chosen, and that row is gone along to find the column heading that matches the message character. The letter at the intersection of [key-row, msg-col] is the enciphered letter.

For example, the first letter of the plaintext, A, is paired with L, the first letter of the key. Therefore, row L and column A of the Vigenère square are used, namely L. Similarly, for the second letter of the plaintext, the second letter of the key is used. The letter at row E and column T is X. The rest of the plaintext is enciphered in a similar fashion:

Plaintext: `ATTACKATDAWN`

Key: `LEMONLEMONLE`

Ciphertext: `LXFOPVEFRNHR`

Decryption is performed by going to the row in the table corresponding to the key, finding the position of the ciphertext letter in that row and then using the column's label as the plaintext. For example, in row L (from LEMON), the ciphertext L appears in column A, which is the first plaintext letter. Next, in row E (from LEMON), the ciphertext X is located in column T. Thus T is the second plaintext letter.

### Explorer Mode

- Write an _algorithm_ for **encrypting** using this cipher. Use any language statements you want, but try to keep them small, focused, and simple. Remembering the types of statements we've used in previous assignments.

### Adventure Mode

- Write an _algorithm_ for **decrypting** using this cipher. Use any language statements you want, but try to keep them small, focused, and simple. Remembering the types of statements we've used in previous assignments.

### Epic Mode

- Watch [this video](https://www.youtube.com/watch?v=QgHnr8-h0xI) explaining how to **break** this cipher. Then describe the process in your own words. Don't worry if you understand all of the process, just do your best to express what you understood in your own words.
