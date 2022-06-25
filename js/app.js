const x = async () => {
	const fet = await fetch('https://api.shrtco.de/v2/shorten?url=www.frontendmentor.io');
	const data = await fet.json();

	console.log(data);
};

x();
