module.exports = {
  git: {
    getLatestTagFromAllRefs: true,
    commit: false,
    tag: true,
    push: true,
    tagAnnotation: "Release ${version}",
  },
  hooks: {
    "after:bump": ["echo ${version} > version"],
  },
  github: {
    release: true,
    releaseName: "Release ${version}",
    tokenRef: "GITHUB_TOKEN_RELEASE_IT",
    releaseNotes(context) {
      console.log(context);
      const customNote = `### 🐳 Pull Docker image\n\`docker pull ${process.env.DOCKER_REGISTRY}/${process.env.DOCKER_REPO}/${process.env.DOCKER_IMAGE}:${context.version}\`\n\n`;
      return customNote + context.changelog;
    },
  },
  npm: false,
  plugins: {
    "@release-it/conventional-changelog": {
      ignoreRecommendedBump: false,
      infile: false,
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "feat",     section: ":tada: Features" },
          { type: "fix",      section: ":bug: Bug Fixes" },
          { type: "perf",     section: ":zap: Performance Improvements" },
          { type: "revert",   section: ":rewind: Reverts" },
          { type: "docs",     section: ":memo: Documentation" },
          { type: "style",    section: ":art: Styles" },
          { type: "refactor", section: ":twisted_rightwards_arrows: Code Refactoring" },
          { type: "test",     section: ":test_tube: Tests" },
          { type: "build",    section: ":gear: Build System" },
          { type: "ci",       section: ":rocket: Continuous Integration" },
          { type: "sec",      section: ":shield: Security Fix" },
          { type: "chore",    section: ":broom: Chore" },
        ],
      },
    },
  },
}