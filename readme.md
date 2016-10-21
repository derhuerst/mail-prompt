# mail-prompt 📎

**A CLI prompt for email addresses.**

[![npm version](https://img.shields.io/npm/v/mail-prompt.svg)](https://www.npmjs.com/package/mail-prompt)
[![dependency status](https://img.shields.io/david/derhuerst/mail-prompt.svg)](https://david-dm.org/derhuerst/mail-prompt)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/mail-prompt.svg)](https://david-dm.org/derhuerst/mail-prompt#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/mail-prompt.svg)

*mail-prompt* uses [*cli-styles*](https://github.com/derhuerst/cli-styles) and [*prompt-skeleton*](https://github.com/derhuerst/prompt-skeleton) to have a look & feel consistent with [other prompts](https://github.com/derhuerst/prompt-skeleton#prompts-using-prompt-skeleton).


## Installing

```shell
npm install mail-prompt
```


## Usage

```javascript
const mailPrompt = require('mail-prompt')
mailPrompt('Your email address?')
.on('data', (e) => console.log('Interim value', e.value))
.on('submit', (v) => console.log('Submitted with', v))
.on('abort', (v) => console.log('Aborted with', v))
```


## Related

- [`text-prompt`](https://github.com/derhuerst/text-prompt)
- [`date-prompt`](https://github.com/derhuerst/date-prompt)
- [`multiselect-prompt`](https://github.com/derhuerst/multiselect-prompt)
- [`number-prompt`](https://github.com/derhuerst/number-prompt)
- [`select-prompt`](https://github.com/derhuerst/select-prompt)
- [`cli-autocomplete`](https://github.com/derhuerst/cli-autocomplete)


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/mail-prompt/issues).
