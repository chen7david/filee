const fs = require('fs')

class Filer {
    constructor(path){
        this.path = path
        this.file = {}
    }

    static async load(path){
        const file = new this(path)
        return await file.read() || null
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
            Object.assign(this.file, JSON.parse(data))
            return true
        }).catch(err => false)
    }

    async write(data){
        return fs.promises.writeFile(this.path, JSON.stringify(data), 'utf8')
        .then(() => {
            return true
        }).catch(err => false)
    }

    patch(params = {}){
        Object.assign(this.file, params)
        return this
    }

    update(params = {}){
        this.file = params
        return this
    }

    async save(){
        return await this.write(this.file)
    }

    async delete(){
        return fs.promises.unlink(this.path).then(() => {
            Object.assign(this.file, {})
            return true
        }).catch(err => false)
    }
}

module.exports = Filer