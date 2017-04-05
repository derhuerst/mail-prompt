'use strict'

const mailPrompt = require('./index')

mailPrompt('Your eMail address?')
.on('abort', (v) => console.log(`Aborted with ${v}.`))
.on('submit', (v) => console.log(`Submitted with ${v}.`))
