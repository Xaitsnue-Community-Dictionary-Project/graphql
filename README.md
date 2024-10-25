# Setting up Apollo server on your local machine

1. Clone this repository onto your machine and open the folder in VS Code
2. `npm init`: Initialize the node project (run this command and below in the terminal)

3. Edit newly created `package.json` file: add `"start": "node index.js"` into `scipts` and `"type": "module"` outside

4. `npm install @apollo/server graphql`: Install necessary packages
5. `npm start`: Run this to start the server and open the localhost (http://localhost:2409)

- graphql : The library that implements the core GraphQL parsing and execution algorithms.
- @apollo/server : The Apollo GraphQL server


The tutorial can be also found [here](https://dineshigdd.medium.com/how-to-set-up-a-graphql-server-a-beginners-guide-to-graphql-fe1e7bb83ffc).

## Example query: looking up word "fox"

Paste this query into `Operation` tab:
```
query ExampleQuery($englishName: String!) {
  animal(english: $englishName) {
    xaitsnue
    grammar
    speakers
    variant
    other_info
    semantic_domain
  }
}
```

Hit the button `Example Query` to run the query.
The result will show in the `Response` tab on the right:
```
{
  "data": {
    "animal": {
      "xaitsnue": "'asá",
      "grammar": "noun",
      "speakers": "AT, JK, JB, JD, EK",
      "variant": null,
      "other_info": null,
      "semantic_domain": "mammal"
    }
  }
}
```
