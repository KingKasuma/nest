import './style.css'
import { setupCounter } from './counter'

import {name, age} from './bases/01-types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello ${name} ${age}!!!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
