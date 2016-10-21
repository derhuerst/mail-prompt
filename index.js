'use strict'

const {TextPrompt} = require('text-prompt')
const ui = require('cli-styles')
const esc = require('ansi-escapes')
const chalk = require('chalk')
const wrap = require('prompt-skeleton')
const _parse = require('email-addresses').parseOneAddress
const providers = require('email-providers/common.json')
const validDomain = require('domain-regex')()



const completeDomain = (d) => {
	if (d === '') return false
	for (let provider of providers)
		if (provider.substring(0, d.length) === d)
			return provider.substring(d.length)
	return false
}

const parse = (s) => {
	try {
		const p = _parse(s)
		if (!p) return {_: s, local: s, domain: ''}
		return {_: p.address, local: p.local, domain: p.domain}
	} catch (err) {return false}
}

const isValid = (s) => {
	try {
		const p = _parse(s)
		return !!p && validDomain.test(p.domain)
	} catch (err) {return false}
}

const MailPrompt = Object.assign(Object.create(TextPrompt), {

	  setValue: function (v) {
		const parsed = parse(v)
		if (!parsed) return this.bell()
		this.value = v
		this.rendered = this.transform(v)
		this.completion = completeDomain(parsed.domain)
		this.cursor = Math.min(this.rendered.length, this.cursor)
		this.emit()
	}

	, right: function () {
		if (this.completion) this.setValue(this.value + this.completion)
		this.cursor = this.rendered.length
		this.render()
	}
	, next: function () {
		if (this.completion) this.setValue(this.value + this.completion)
		this.cursor = this.rendered.length
		this.render()
	}

	, submit: function () {
		if (!isValid(this.value)) return this.bell()
		TextPrompt.submit.call(this)
	}



	, render: function () {
		this.out.write(esc.eraseLine + esc.cursorTo(0) + [
			  ui.symbol(this.done, this.aborted)
			, chalk.bold(this.msg)
			, ui.delimiter(this.done)
			, this.rendered
			+ (this.completion ? chalk.gray(this.completion) : '')
		].join(' '))
		this.out.write(esc.cursorMove(-this.rendered.length + this.cursor))
	}
})



const defaults = {
	  value:      ''
	, rendered:   ''
	, transform:  ui.render()
	, completion: ''

	, msg:        ''
	, cursor:     0

	, done:       false
	, aborted:    false
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
