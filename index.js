'use strict'

const {TextPrompt} = require('text-prompt')
const ui = require('cli-styles')
const esc = require('ansi-escapes')
const chalk = require('chalk')
const wrap = require('prompt-skeleton')



const MailPrompt = Object.assign(Object.create(TextPrompt), {

	  _: function (c) {
		this.setValue(this.value + c)
		this.cursor = this.rendered.length
		this.render()
	}
	, delete: function () {
		if (this.value.length === 0) return this.bell()
		this.setValue(this.value.slice(0, -1))
		this.render()
	}



	, render: function () {
		this.out.write(esc.eraseLine + esc.cursorTo(0) + [
			  ui.symbol(this.done, this.aborted)
			, chalk.bold(this.msg)
			, ui.delimiter(this.done)
			, this.rendered
		].join(' '))
		this.out.write(esc.cursorMove(-this.rendered.length + this.cursor))
	}
})



const defaults = {
	  value:     ''
	, rendered:  ''
	, transform: ui.render()

	, msg:       ''
	, cursor:    0

	, done:      false
	, aborted:   false
}

const mailPrompt = (msg, opt) => {
	if ('string' !== typeof msg) throw new Error('Message must be string.')
	if (Array.isArray(opt) || 'object' !== typeof opt) opt = {}

	const p = Object.assign(Object.create(MailPrompt), defaults, opt)
	p.msg = msg
	p.initialValue = p.value

	return wrap(p)
}



module.exports = Object.assign(mailPrompt, {MailPrompt})
