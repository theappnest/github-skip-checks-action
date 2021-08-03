# github-skip-checks-action

This GitHub action marks checks as successful if no changes occurred to specified files.

## Usage

```yaml
jobs:
  skip_checks:
    runs-on: ubuntu-latest
    steps:
      - uses: theappnest/github-skip-checks-action@master
        with:
          paths: |
            foo/**
            bar/**
          checks: |
            lint-foo-bar
            test-foo-bar
```

## Inputs

- `token` (optional) GitHub token. Defaults to secrets.GITHUB_TOKEN.
- `paths` List of path globs to check for changes.
- `checks` List of checks to mark as successful.
