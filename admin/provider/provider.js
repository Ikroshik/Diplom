const path = require('node:path');
const fs = require('node:fs')

const { BaseProvider } = require('@admin-bro/upload')

class MyProvider extends BaseProvider {
  constructor(bucket, assetPath) {
     // it requires bucket as a parameter to properly pass it to other methods
     super(bucket)
     this.assetPath = assetPath
  }
  // your implementation goes here
  async upload(file, key) {
    const fullPath = path.resolve(this.assetPath, key)
    const dirPath = path.dirname(fullPath)

    if (!fs.existsSync(dirPath)) {
        await fs.promises.mkdir(dirPath, { recursive: true })
    }
    await fs.promises.copyFile(file.path, fullPath)
    await fs.promises.unlink(file.path)
    console.log(key)
    return key
}

async delete(key, bucket) {
    const filePath = path.resolve(this.assetPath, key)

    if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath)
        const dirPath = path.dirname(filePath)
        const otherFiles = await fs.promises.readdir(dirPath)
        if (otherFiles && otherFiles.length == 0) {
            await promises.rmdir(dirPath)
        }
    }
}

path(key, bucket) {
    return "/" + bucket + "/"+key
}
}

module.exports = MyProvider;