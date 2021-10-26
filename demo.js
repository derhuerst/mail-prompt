'use strict'

const mailPrompt = require('./index')

mailPrompt('Your eMail address?')
.catch((v) => console.log(`Aborted with ${v}.`))
.then((v) => console.log(`Submitted with ${v}.`))
