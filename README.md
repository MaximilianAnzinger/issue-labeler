# Issue Labeler

[![Basic validation](https://github.com/MaximilianAnzinger/issue-labeler/actions/workflows/basic-validation.yml/badge.svg?branch=main)](https://github.com/MaximilianAnzinger/issue-labeler/actions/workflows/basic-validation.yml)

# Usage

## Create `.github/issue-labeler.yml`
Create a `.github/issue-labeler.yml` file with a list of labels and config options to match and apply the label to issues.

The key is the name of the label in your repository that you want to add (e.g. `bug` or `enhancement`), and the value is an array of strings and other options that will be used to match against the issue title and body.

A basic example might look like this:
```yaml
- bug:
    - bug
    - weird
- enhancement:
    - enhancement
    - improvement
```

### Regex matching
Besides simple keywords you can use regular expressions to describe the matching pattern.

```yaml
- bug:
    - \\d+
```
Will match any issue title or body containing a number.

> [!WARNING]  
> Remember to escape special characters, e.g. `C\\+\\+` <-> `C++`

### Case sensitivity
By default, the matching is case sensitive. To make it case insensitive, you can use the `caseSensitive` flag.

```yaml
- bug:
    - bug
    - caseSensitive: false
```

This will match `Bug`, `BUG`, `bug`, etc.

### Matching strategy
The default matching strategy is `any`, which means that if any of the keywords match, the label will be applied. You can change this to `all` to require all keywords to match.

```yaml
- bug:
    - bug
    - weird
    - strategy: all
```

This will only match if both `bug` and `weird` are present in the issue title or body.

## Create workflow
Create a workflow (e.g. `.github/workflows/issue-labeler.yml`) to run the action when an issue is opened.

```yaml
name: "Issue Labeler"
on:
  issues:
    types: [opened, edited]

permissions:
  issues: write
  contents: read

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
    - uses: github/issue-labeler@v1.0 # Use the latest version
      with:
        configuration-path: .github/issue-labeler.yml
        repo-token: ${{ github.token }}
        include-title: 1 // Default is 1
        include-body: 1 // Default is 1
```

Per default, the action will look for keywords in the title and body of the issue. You can disable this by setting `include-title` and `include-body` to `0`.

# Thanks to
- [labeler](https://github.com/actions/labeler): This action is heavily influenced by the labeler action that is highly recommended for labeling PRs.