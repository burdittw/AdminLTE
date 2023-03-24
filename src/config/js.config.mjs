import fs from 'fs-extra'

try {
  fs.copySync('./src/js', './dist/js')
  console.log('Javascript files copy success!')
} catch (error) {
  console.error(error)
}
