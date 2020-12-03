module.exports = {
  extends: ['gitmoji', '@commitlint/config-lerna-scopes'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?: \((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket', 'header']
    }
  },
  rules: {
    'header-max-length': [2, 'always', 75]
  }
}
