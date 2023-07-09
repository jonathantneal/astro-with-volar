import config from './config.yml' assert { type: 'yaml' }

document.querySelector<HTMLDivElement>('main')!.innerHTML += (
	`<section>${Object.entries(config).map(
		([name, value]) => [
			`<h2>${name}</h2>`,
			`<p>${value}</p>`
		].join('')
	).join('')
	}</section><a href="">Do</a>`
)
