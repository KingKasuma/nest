import { charmander } from './bases/04-injection'
import './style.css'
//import { pokemons } from './bases/02-objects'
// import {name, age} from './bases/01-types';
// import { charmander } from './bases/03-clases'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello ${ charmander.name }!!!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
