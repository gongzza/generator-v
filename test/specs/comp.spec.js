import helper from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import util from '../util'

const target = 'comp'
describe(target, () => {
  const generatorName = util.getGeneratorName(target)
  const name = 'mock'
  const destFile = path.join('src', name + '.vue')

  describe('with name', () => {
    beforeEach(() => {
      return helper.run(generatorName)
              .withArguments([name])
    })

    it('create file with content', () => {
      assert.file([destFile])
      assert.fileContent(destFile, name)
    })
  })

  describe('without name', () => {
    it('do not run generator', () => {
      const generator = helper.run(generatorName)

      assert.equal(generator.ran, false, 'generator는 실행되지 않아야 한다.');
    })
  })
})
