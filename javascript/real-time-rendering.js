const kaTeXTextarea = document.querySelector('.katex-textarea');
const kaTeXOutput = document.querySelector('.katex-output');
const copyTeXButton = document.querySelector('.copy-tex-code');

const makeTeXCode = (texCode, delimiters = ['\\[', '\\]']) => {
	const value = texCode
		.trim()
		.replaceAll('\n', ' \\\\\n')
		.replaceAll('$', ' \\$ ')
		.replaceAll(/(?<!\\)\(/g, ' \\left( ')
		.replaceAll(/(?<!\\)\)/g, ' \\right) ')
		.replaceAll(/(\\[A-z]\{)?(.*)(\})?\s*(\+|-|\*|=)\s*(\\[A-z]\{)?(.*)(\})?/g, ' $1 $2 $3 \\mathop{$4} $5 $6 $7 ')
		.replaceAll(/(\\[A-z]\{)?(.*)(\})?\s*(\\times|\\div|\\to|\\ne|\\neq)(?![A-Za-z])\s*(\\[A-z]\{)?(.*)(\})?/g, ' $1 $2 $3 \\mathop{$4} $5 $6 $7 ')
		.replaceAll('\\[', ' [ ')
		.replaceAll('\\]', ' ] ')
		.replaceAll(/(?<!\\[A-z]+)\[([^[\]]*)\]/g, ' \\left[ $1 \\right] ')
		.replaceAll('\\{', ' \\left\\{ ')
		.replaceAll('\\}', ' \\right\\} ');
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
		`\\newcommand{\\card}[1]{\\operatorname{Card}\\left(\\mathbb{#1}\\right)}\n` +
		`\\newcommand{\\anglename}[1]{\\widehat{#1}}\n` +
		`\\newcommand{\\defaultcolor}[1]{\\color{${defaultColorHex}}{#1}}\n` +
		`\\newcommand{\\KaTeXRendr}{\\KaTeX\\text{Rendr}}\n` +
		`\\newcommand{\\undefined}{\\text{Undefined}}\n` +
		`\\newcommand{\\nullchar}{\u00AD}\n` +
		`\\newcommand{\\comment}[1]{\\quad\\gray{\\left(\\text{#1}\\right)}}\n` +
		`\\newcommand{\\title}[1]{\\vphantom{\\frac{1}{2}}\\large\\text{\\quad\\quad #1}}\n` +
		`\\newcommand{\\conclude}{\\quad\\blacksquare}\n` +
		`\\renewcommand{\\sin}[1]{\\operatorname{sin}\\left(#1\\right)}\n` +
		`\\renewcommand{\\cos}[1]{\\operatorname{cos}\\left(#1\\right)}\n` +
		`\\renewcommand{\\tan}[1]{\\operatorname{tan}\\left(#1\\right)}\n` +
		`\\renewcommand{\\csc}[1]{\\operatorname{csc}\\left(#1\\right)}\n` +
		`\\renewcommand{\\sec}[1]{\\operatorname{sec}\\left(#1\\right)}\n` +
		`\\renewcommand{\\cot}[1]{\\operatorname{cot}\\left(#1\\right)}\n` +
		`\\renewcommand{\\sinh}[1]{\\operatorname{sinh}\\left(#1\\right)}\n` +
		`\\renewcommand{\\cosh}[1]{\\operatorname{cosh}\\left(#1\\right)}\n` +
		`\\renewcommand{\\tanh}[1]{\\operatorname{tanh}\\left(#1\\right)}\n` +
		`\\newcommand{\\csch}[1]{\\operatorname{csch}\\left(#1\\right)}\n` +
		`\\newcommand{\\sech}[1]{\\operatorname{sech}\\left(#1\\right)}\n` +
		`\\renewcommand{\\coth}[1]{\\operatorname{coth}\\left(#1\\right)}\n` +
		`\\renewcommand{\\arcsin}[1]{\\operatorname{Arcsin}\\left(#1\\right)}\n` +
		`\\renewcommand{\\arccos}[1]{\\operatorname{Arccos}\\left(#1\\right)}\n` +
		`\\renewcommand{\\arctan}[1]{\\operatorname{Arctan}\\left(#1\\right)}\n` +
		`\\newcommand{\\arccsc}[1]{\\operatorname{Arccsc}\\left(#1\\right)}\n` +
		`\\newcommand{\\arcsec}[1]{\\operatorname{Arcsec}\\left(#1\\right)}\n` +
		`\\newcommand{\\arccot}[1]{\\operatorname{Arccot}\\left(#1\\right)}\n` +
		`\\renewcommand{\\Re}[1]{\u211c\\mathfrak{e}\\left(#1\\right)}\n` +
		`\\renewcommand{\\Im}[1]{\u2111\\mathfrak{m}\\left(#1\\right)}\n` +
		"\\renewcommand{\\log}{\\@ifnextchar_{\\log@sub}{\\log@nosub}}\n" +
		"\\newcommand{\\log@nosub}[1]{\\operatorname{log}\\left(#1\\right)}\n" +
		"\\newcommand{\\log@sub}[3]{\\operatorname{log}_{#2}\\left(#3\\right)}\n" +
		"\\renewcommand{\\lim}{\\@ifnextchar_{\\lim@sub}{\\lim@nosub}}\n" +
		"\\newcommand{\\lim@nosub}{\\operatorname{lim}}\n" +
		"\\newcommand{\\lim@sub}[3]{\\underset{{#2}}{\\operatorname{lim}}\\left(#3\\right)}\n" +
		`\\renewcommand{\\ln}[1]{\\operatorname{ln}\\left(#1\\right)}\n` +
		"\\newcommand{\\lcm}[2]{\\operatorname{lcm}\\left(#1;#2\\right)}\n" +
		"\\newcommand{\\gcf}[2]{\\operatorname{gcf}\\left(#1;#2\\right)}\n" +
		"\\renewcommand{\\max}[2]{\\operatorname{max}\\left(#1;#2\\right)}\n" +
		"\\renewcommand{\\min}[2]{\\operatorname{min}\\left(#1;#2\\right)}\n" +
		"\\newcommand{\\mean}[2]{\\operatorname{mean}\\left(#1;#2\\right)}\n" +
		"\\newcommand{\\mode}[1]{\\operatorname{mode}\\left(\\mathbb{#1}\\right)}\n" +
		"\\newcommand{\\e}{\\mathrm{e}}\n" +
		"\\newcommand{\\iu}{\\mathrm{i}}\n" +
		"\\newcommand{\\ju}{\\mathrm{j}}\n" +
		"\\newcommand{\\k}{\\mathrm{k}}\n" +
		"\\newcommand{\\l}{\\mathrm{l}}\n" +
		"\\newcommand{\\m}{\\mathrm{m}}\n" +
		"\\newcommand{\\il}{\\mathrm{il}}\n" +
		"\\newcommand{\\jl}{\\mathrm{jl}}\n" +
		"\\newcommand{\\kl}{\\mathrm{kl}}\n" +
		"\\newcommand{\\im}{\\mathrm{im}}\n" +
		"\\newcommand{\\jm}{\\mathrm{jm}}\n" +
		"\\newcommand{\\km}{\\mathrm{km}}\n" +
		"\\newcommand{\\lm}{\\mathrm{lm}}\n" +
		"\\newcommand{\\ilm}{\\mathrm{ilm}}\n" +
		"\\newcommand{\\jlm}{\\mathrm{jlm}}\n" +
		"\\newcommand{\\klm}{\\mathrm{klm}}\n" +
		"\\newcommand{\\dspace}{~~}\n" +
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

kaTeXTextarea.addEventListener('copy', (e) => {
	if (kaTeXTextarea.selectionStart === 0 && kaTeXTextarea.selectionEnd === kaTeXTextarea.value.length) {
		e.preventDefault();

		let texValue;

		if (selectedDelimiter) {
			texValue = makeTeXCode(kaTeXTextarea.value, selectedDelimiter.dataset.delimiters.split(' '));
		} else {
			texValue = makeTeXCode(kaTeXTextarea.value);
		}

		navigator.clipboard.writeText(texValue);
	}
});

document.addEventListener('loaded', (e) => { render(); });