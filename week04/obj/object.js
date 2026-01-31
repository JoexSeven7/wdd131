let person = {
	name: 'Antonia Francesca',
	age: 30,
	profession: 'Software Engineer',
	hobbies: ['reading', 'playing guitar', 'hiking'],
	address: {
		street: '123 Camino Real',
		city: 'Santa Rosa',
		country: 'Honduras',
	},
	isEmployed: true,
	greet: function () {
		console.log(`Hello, my name is ${this.name}.`);
	},
};
