const shortenWrapper = document.getElementById('shorten-wrapper');
const linkShorts = document.getElementById('link-shorts');
const inputLink = document.getElementById('input-link');
const btnShort = document.getElementById('btn-link');
const warning = document.getElementById('warning');
let count = 0


btnShort.addEventListener('click', () => {
	count++
	if(inputLink.value === '') {
		warning.style.visibility = 'visible';
		inputLink.classList.add('no-link');
		count = 0;
		const linkBoxs = document.querySelectorAll('.link');
		linkBoxs.forEach(i => {
			i.classList.add('hide-link')
		})
	} else {
		warning.style.visibility = 'hidden';
		inputLink.classList.remove('no-link');
	}
	if (count >= 4) {
		const linkBoxs = document.querySelectorAll('.link');
	    linkBoxs.forEach(i => {
			i.classList.add('hide-link')
		})
		count = 1;
	} 
	makeItShort(inputLink.value);
	console.log(count)
})

async function makeItShort(link) {
	try {
	const fetchApi = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
	const data = await fetchApi.json();
	const linkBox = document.getElementById(`link-${count}`);
	linkBox.classList.remove('hide-link');
	const originalLink = document.querySelector(`.original-link-${count}`);
	originalLink.textContent = inputLink.value;
	const newLink = document.querySelector(`.new-link-${count}`);
	newLink.textContent = data.result.short_link;
// 	const linkBox = `<div class="link d-flex flex-column flex-lg-row justify-content-between">
// 	<div class="original-link align-self-center">
// 		<p id="original-link">${inputLink.value}</p>
// 	</div>
// 	<div class="new-short-link d-lg-flex ">
// 		<p id="new-link" class="new-link align-self-center">${data.result.short_link}</p>
// 		<button class="new-user align-self-center" id="copy-clipboard">copy</button>
// 	</div>
// </div>`

// linkShorts.insertAdjacentHTML('beforeend', linkBox);
inputLink.value = '';
	} catch(e) {
		console.log(e)
	}

}

linkShorts.addEventListener('click', (e) => {
	console.log(e)
	// e.target.previousElementSibling.textContent.select();
	// e.target.previousElementSibling.textContent.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
	e.target.textContent = 'copied!';
	setTimeout(() => {
		e.target.textContent = 'Copie';
	}, 3000)

})