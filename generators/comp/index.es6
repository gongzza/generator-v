import Generator from 'yeoman-generator'
import path from 'path'

class ComponentGenerator extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.option('skip-import', {
      description: 'component를 생성할 때 import 구문을 넣지 않습니다.',
      type: Boolean,
      alias: 'si',
      default: false
    })

    this.option('skip-member', {
      description: '옵션으로 지정한 맴버들을 추가하지 않는다. 단, 파라메터로 넘겨주는 맴버들은 추가한다.',
      type: Boolean,
      alias: 'sm',
      default: false
    })

    this.option('skip-test', {
      description: '테스트 케이스를 생성하지 않습니다.',
      type: Boolean,
      alias: 'st',
      default: false
    })

    this.option('skip-test-import', {
      description: '테스트 케이스를 생성하면서 import 구문을 넣지 않습니다.',
      type: Boolean,
      alias: 'sti',
      default: false
    })

    try {
      // name을 필수로 받도록 처리
      this.argument('name', { type: String, required: true })

    } catch(err) {
      this.log.error(this.help())
      this.abort = true
    }

  }

  initializing() {
    if (this.abort) return

    this.props = this.config.getAll()

    this.options.basename = path.basename(this.options.name)
  }
  prompting() {}
  configuring() {}
  // default() {}
  writing() {
    if (this.abort) return

    const semi = (this.props.useSemi)? ';' : ''

    const filename = this.options.name + this.props.suffixScript
    this.fs.copyTpl(
      this.templatePath('Vue.vue'),
      this.destinationPath(path.join(this.props.srcPath, 'components', filename)),
      { props: this.props, options: this.options, semi }
    )

    if (!this.options.skipTest) {
      const specfilename = this.options.name + this.props.testSuffixScript
      this.fs.copyTpl(
        this.templatePath('specs/Vue.spec.js'),
        this.destinationPath(path.join(this.props.testSpecPath, 'components', specfilename)),
        { props: this.props, options: this.options, semi }
      )
    }
  }
  conflicts() {}
  install() {}
  end() {}
}

module.exports = ComponentGenerator
