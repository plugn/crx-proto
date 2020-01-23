
var qsa = (q, c) => Array.from((c || document).querySelectorAll(q))
var qs = (q, c) => (c || document).querySelector(q)

var swgr = {
	injected: false,
	rules: `
.opblock .checked:after {
  content: '✓';
  font-size: 24px;
  color: firebrick;
  font-weight: bold;
  padding: 0.5rem;
}
`,
	injectStyle: function (style) {
		if (swgr.injected) { return }
		let sheet = document.createElement('style')
		sheet.innerHTML = style || swgr.rules
		document.head.appendChild(sheet)
		swgr.injected = true
	}
}

var hlOne = ({ method, path }) => {
	// var opblock = qs('.opblock-summary-get > [data-path="/system/prototype/{id}"]').parentElement
	var opblock = qs(`.opblock-summary-${method} > [data-path="${path}"]`).parentElement
	if (opblock.matches('.opblock-summary')) {
		opblock.classList.add('checked')
	}
}

var confDefault = [
	{ method: 'PATCH', path: '/v1/file/{id}', text: '5' },
	{ method: 'GET', path: '/system/memory', text: '2' }
]

function extIncapsulator () {
	var sConf = prompt('Search for HTML element (jQuery notation): ', 'a');
	var conf

	try {
		conf = JSON.parse(String(sConf))
	} catch (e) {
		console.log('(!) sConf: ', sConf)
		console.log('(!) conf: ', conf)
		console.warn(e)
	}

	conf = conf || confDefault
	if (!Array.isArray(conf) || !(conf && conf.length)) {
		console.log('conf must look like: ', confDefault)
		return
	}
	swgr.injectStyle(swgr.rules)
	conf.forEach(item => hlOne({ ...item, method: String(item.method || '').toLowerCase() }))
}

// https://tie.hypergraph.dev.k8s.id-network.ru/tie/api/swagger
// function extIncapsulator(toFind){
// 	hl()
// 	// $(toFind).css('background-color', 'red');

// }

