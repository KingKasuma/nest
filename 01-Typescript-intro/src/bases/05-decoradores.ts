class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    screarn() {
        console.log(`NO QUIERO!!`)
    }

    speak() {
        console.log(`NO QUIERO HABLAR!!`)
    }
}

const MyDecorator = () => {
    return (target: Function) => {
        // console.log(target)
        return NewPokemon;
    }
}

@MyDecorator()
export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string
    ) {}

    screarn() {
        console.log(`${this.name.toUpperCase()}!!`)
    }

    speak() {
        console.log(`${this.name}, ${this.name}!`)
    }
}

export const charmander = new Pokemon(4, 'Charmander');

charmander.screarn();
charmander.speak();