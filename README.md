# filer-js

## Getting Started
```js
const Filer = require('filee')

const someAsyncFunction  = async () => {
    const file = await Filer.create('name.info') // creates a new file with the given name and file extenstion and retuns a filer obeject.
    await file.update({name: 'filer'}).save() // overwrites the entire file with the new content object and retuns a boolean.
    await file.patch({name: 'filer'}).save() // overwrites existing values and adds new ones and retuns a boolean.
    await file.delete() // deletes the file and retuns a boolean.
}
```

## Special Case
if you wish to populate the file object before writing it to disk you can do this:

```js
const Filer = require('filee')

const someAsyncFunction  = async () => {
    const file = new Filer('name.info') // creates a new file with the given name and file extenstion and retuns a filer obeject.
    file.update({name: 'filer'}) // overwrites the entire file with the new content object and retuns the filer object.
    file.patch({name: 'filer'}) // overwrites existing values and adds new ones and retuns the filer object.
    await file.save()
    await file.delete() // deletes the file and retuns a boolean.
}
```

```js
async graph(){
    const graph = await Filee.load(this.graphPath())
    await graph.read()
    return graph ? graph.getContent() : []  
}
```