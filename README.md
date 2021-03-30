# zMug.js
zMug.js: a JSON to HTML builder

![zMug.js](https://www.itslennee.it/zMug/img/zmug_black_small.png)

> *The Lorenz SZ40, SZ42a and SZ42b were German rotor stream cipher machines used by the German Army during World War II.*
> *...The sender then retransmitted the message but, critically, did not change the key settings from the original **"HQIBPEXEZMUG".***

zMug.js takes its name from the "Indicator", **"HQIBPEXEZMUG".**, or ZeeMug/ZedMug in the cryptography sector. Like the Indicator, zMug.js is a "decrypter" which takes a JSON file and builds the HTML structures for each page is called.

## How does it work? (version 0.1)

Your JSON file needs to use the following structure:

```
{
  "name": "",
  "type": "",
  "class": "",
  "value": "",
  "strong": "",
  "attrTyp": "",
  "attrVal": "",
  "child": ""
}
```

All properties are optional **except** the two **MANDATORY: "name"** and **"type"**, which respectively are the element's ID and type/tag.

For example, I would like to create a div called "zMug". My JSON should be:

```
{
  "name": "zMug",
  "type": "div"
}
```
