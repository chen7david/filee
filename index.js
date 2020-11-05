const fs = require('fs')

class Filee {
    constructor(path){
        this.path = path
        this.state = {}
    }

    static async load(path){
        const file = new this(path)
        await file.read()
        return file || null
    }

    static async create(path, data){
        return fs.promises.writeFile(path, JSON.stringify(data), 'utf8')
        .then(async () => {
            const file = new this(path)
            await file.read()
            return file
        }).catch(err => false)
    }

    async read(){
        return fs.promises.readFile(this.path, 'utf8').then(data => {
            Object.assign(this.state, JSON.parse(data))
            return true
        }).catch(err => false)
    }

    async write(data){
        return fs.promises.writeFile(this.path, JSON.stringify({data}), 'utf8')
        .then(() => {
            return true
        }).catch(err => false)
    }

    getContent(){
        return this.state.container
    }

    patch(params = {}){
        Object.assign(this.state, params)
        return this
    }

    update(params = {}){
        this.state = params
        return this
    }

    async save(){
        return await this.write(this.state)
    }

    async delete(){
        return fs.promises.unlink(this.path).then(() => {
            Object.assign(this.state, {})
            return true
        }).catch(err => false)
    }
}

module.exports = Filee