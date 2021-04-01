# zMug.js
zMug.js: a JSON to HTML builder

![zMug.js](https://www.itslennee.it/zMug/img/zmug_black_small.png)

> *The Lorenz SZ40, SZ42a and SZ42b were German rotor stream cipher machines used by the German Army during World War II.*
> *...The sender then retransmitted the message but, critically, did not change the key settings from the original **"HQIBPEXEZMUG".***

zMug.js takes its name from the "Indicator", **"HQIBPEXEZMUG".**, or ZeeMug/ZedMug in the cryptography sector. Like the Indicator, zMug.js is a "decrypter" which takes a JSON file and builds the HTML structures for each page is called.

## How does it work? (version 0.1)

zMug fetches the needed information from a JSON file, and builds all the indicated elements in a master parent (v.0.1). You can create multiple children in a single instance, for recursively call zMug and build the content.

### Basic data structure

Your JSON file needs to use the following object as base structure:

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

### Properties.

In order to understand what to build and which attributes to create, you need some generic properties that refers to some attributes, simply because their use is more common than others, or some other more specialized. zMug uses a syntax that can be quite flexible. In the same object you can create a single child, or multiple children.

There are two **MANDATORY properties: "name"** and **"type"**, which respectively are the element's ID and type/tag.

For example, I would like to create a div called "zMug". My JSON should be:

```
{
  "name": "zMug",
  "type": "div"
}
```

#### Optional properties.

All other properties can be omitted or left with value: null. Let's delve into these:

1. "class": nomen omen, add the declared class (or classes), for the corresponding element.
2. "value": **used when "type" is a text tag (h1/h2/h3/h4/h5/h6/p) or img**. For text tags, "value" will be the text content, and for img the src.
3. "strong": **for text type only** selected characters to add a strong tag.
4. "attTyp" & "attVal": they need to be used together. "attTyp" defines the attribute, while "attVal" its value.
5. "child": if this element has to have a/some child/children, zMug will be recursively called to create the necessary elements with "name" as parent.

### Array values

zMug gives you the option to send arrays as values for every property. Please note that, if you use an array to define multiple elements, you need to use arrays for every subsequent property.

#### Example

As a case in-point, I need to build two divs and a p. Your data should be something like this:

1. "name" and "type": **name and value must have the same length**. You'll get a critical error if they don't match. If you need only one element

  - In our example:

  ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    ...
  }
  ```

NOTE: "name", "type" and "value" cannot be arrays of arrays as value. The other properties, tho, can.

2. "value": we need a string for our P. So, we'll have a null for our divs, and:

  ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    "value": [null,null,"This is zMug. A JS builder!"],
    ...
  }
  ```

3. "class": every element can have a single class, multiple or none.

  - Our first div doesn't have any classes (if so, you must use null, if you have multiple elements), the second has one, and our p has four classes.

  ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    "value": [null,null,"This is zMug. A JS builder!"],
    "class": [null,"classDiv2",["arrayClassP_1","arrayClassP_2","arrayClassP_3"]],
    ...
  }
  ```

4. "strong": if you need more than one string to get the strong tag, you need an array.

  - Remember, only text tags can use "strong". So we need null for our divs:
   ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    "value": [null,null,"This is zMug. A JS builder!"],
    "class": [null,"classDiv2",["arrayClassP_1","arrayClassP_2","arrayClassP_3"]],
    "strong": [null,null,["Hello","This","JS"]]
    ...
  }
  ```

5. "attTyp" and "attVal": if you need more attribute for the same element, **you need the type of container for attTyp and attVal**. 


  - We want onmouseenter and onmouseleave on "exampleDiv1" and style on "exampleP":
   ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    "value": [null,null,"This is zMug. A JS builder!"],
    "class": [null,"classDiv2",["arrayClassP_1","arrayClassP_2","arrayClassP_3"]],
    "strong": [null,null,["Hello","This","JS"]],
    "attTyp": [["onmouseenter","onmouseleave"],null,"style"],
    "attVal": [["function1()","function2()"],null,"width:200px;font-size:20px"]
    ...
  }
  ```

6. "child": if you have multiple elements, you can have a single object or an array of objects for each element as children.
 ```
  {
    "name": ["exampleDiv1","exampleDiv2", "exampleP"],
    "type": ["div","div","p"],
    "value": [null,null,"This is zMug. A JS builder!"],
    "class": [null,"classDiv2",["arrayClassP_1","arrayClassP_2","arrayClassP_3"]],
    "strong": [null,null,["Hello","This","JS"]],
    "attTyp": [["onmouseenter","onmouseleave"],null,"style"],
    "attVal": [["function1()","function2()"],null,"width:200px;font-size:20px"]
    "child": [[{
      "name": "exampleDiv1Child1",
      "type": "div"
    },{
      "name": "exampleDiv1Child2",
      "type": "div"
    }],
    {
      "name": "exampleDiv2Child1",
      "type": "div"
    }]
  }
  ```
  
### Recursive children and alternative types
lorem
### Goals
