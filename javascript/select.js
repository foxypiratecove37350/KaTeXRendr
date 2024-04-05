const selects = document.querySelectorAll('.select');
var selectedDelimiter = document.querySelector('.button-bar > .select.delimiters .selected');

selects.forEach(select => {
	let selected = select.querySelector('.selected');
	let options = select.querySelectorAll('.option:not(.selected)');

	select.style.width = window.getComputedStyle(select.querySelector('div')).width;

	options.forEach(option => {
		option.addEventListener('click', (e) => {
			if (select.classList.contains('active')) {
				select.querySelector('div').insertBefore(option, select.querySelector('div').firstChild);
				select.style.width = window.getComputedStyle(option).width;
				if (selected) {
					selected.classList.remove('selected');
				}
				option.classList.add('selected');

				selected = select.querySelector('.selected');
				options = select.querySelectorAll('.option:not(.selected)');
			}

			if (select == document.querySelector('.button-bar > .select.delimiters')) {
				selectedDelimiter = select.querySelector('.selected');
			}

			if (render) {
				render();
			}
		});
	});

	select.addEventListener('click', (e) => {
		select.classList.toggle('active');
	});
});