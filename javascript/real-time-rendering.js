const kaTeXTextarea = document.querySelector('.katex-textarea');
const kaTeXOutput = document.querySelector('.katex-output');
const copyTeXButton = document.querySelector('.copy-tex-code');

const makeTeXCode = (texCode, delimiters = ['\\[', '\\]']) => {
	const value = texCode
		.trim()
		.replaceAll('\n', ' \\\\\n ')
		.replaceAll('$', ' \\$ ')
		.replaceAll('(', ' \\left( ')
		.replaceAll(')', ' \\right) ')
		.replaceAll('\\[', ' [ ')
		.replaceAll('\\]', ' ] ');
	let defaultColorHex = '';
	const defaultColor = window.getComputedStyle(kaTeXOutput)
		.color
	defaultColor
		.substring(4, defaultColor.length - 1)
		.split(', ')
		.forEach(n => {
			defaultColorHex += ("0" + parseInt(n).toString(16)).slice(-2);
		});
	const condition = (delimiters[0] == '$' && delimiters[1] == '$') || (delimiters[0] == '\\(' && delimiters[1] == '\\)');
	const texValue =
		`${delimiters[0]}\n` +
		`% Made using KaTeXRendr, a real-time browser-based MathTeX renderer using KaTeX. https://katexrendr.poisonfox.cf\n` +
		`\\newcommand{\\card}[1]{\\mathrm{Card}(\\mathbb{#1})}\n` +
		`\\newcommand{\\anglename}[1]{\\mathrm{\\widehat{#1}}}\n` +
		`\\newcommand{\\defaultcolor}[1]{\\color{${defaultColorHex}}{#1}}\n` +
		`\\newcommand{\\KaTeXRendr}{\\KaTeX\\text{Rendr}}\n` +
		`\\newcommand{\\undefined}{\\text{Undefined}}\n` +
		`\\newcommand{\\nullchar}{\u00AD}\n` +
		`\\newcommand{\\comment}[1]{\\quad\\gray{(\\text{#1})}}\n` +
		`\\newcommand{\\conclude}{\\quad\\blacksquare}\n` +
		`\\renewcommand{\\sin}[1]{\\mathrm{ sin}(#1)}\n` +
		`\\renewcommand{\\cos}[1]{\\mathrm{ cos}(#1)}\n` +
		`\\renewcommand{\\tan}[1]{\\mathrm{ tan}(#1)}\n` +
		`\\renewcommand{\\csc}[1]{\\mathrm{ csc}(#1)}\n` +
		(condition ? '' : `\\begin{align*}\n`) +
		`${value}\n` +
		(condition ? '' : `\\end{align*}\n`) +
		`${delimiters[1]}`;

	return texValue
}

const render = () => {
	let texValue;

	if (selectedDelimiter) {
		texValue = makeTeXCode(kaTeXTextarea.value, selectedDelimiter.dataset.delimiters.split(' '));
	} else {
		texValue = makeTeXCode(kaTeXTextarea.value);
	}

	kaTeXOutput.textContent = texValue;
	const options = {
		delimiters: [
			{left: '$$', right: '$$', display: true},
			{left: '$', right: '$', display: false},
			{left: '\\[', right: '\\]', display: true},
			{left: '\\(', right: '\\)', display: false}
		],
		throwOnError: true,
		errorCallback: (msg, err) => {
			const output = 
				"$$\\textcolor{red}{\\text{" + 
				err.name
					.replaceAll('\\', ' \\textbackslash ')
					.replaceAll(/([{}$#%&_])/g, ' \\$1 ') +
					": " + 
				err.rawMessage
					.replaceAll('\\', ' \\textbackslash ')
					.replaceAll(/([{}$#%&_])/g, ' \\$1 ') +
				"}}$$";

			kaTeXOutput.textContent = output;
			renderMathInElement(kaTeXOutput, options);
			console.log(err);
		}
	}
	renderMathInElement(kaTeXOutput, options);
}

kaTeXTextarea.addEventListener('input', (e) => {
	render();
});

copyTeXButton.addEventListener('click', (e) => {
	let texValue;

	if (selectedDelimiter) {
		texValue = makeTeXCode(kaTeXTextarea.value, selectedDelimiter.dataset.delimiters.split(' '));
	} else {
		texValue = makeTeXCode(kaTeXTextarea.value);
	}

	navigator.clipboard.writeText(texValue);
});