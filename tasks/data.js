import fs from 'fs'
import getRepos from '../helpers/getRepos'
import getSiteData from "../data"

const writeJson = (filename, data) => {
    fs.writeFileSync(`src/_data/${filename}`, JSON.stringify(data));
}

const writeData = () => {
    return getRepos()
        .then(repos => {
            const site = getSiteData(repos);
            writeJson("site.json", site)
            return repos
        })
}

export default () => {
    return writeData().catch((err) => {
      console.warn(err)
    })
}
