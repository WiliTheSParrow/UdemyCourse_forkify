// WAYS OF DOING IMPORTS
//1st
import str from './models/Search'
//2nd
// import {
//     add as a,
//     multiply as m,
//     ID
// } from './views/searchView';
//3rd
import * as searchView from './views/searchView';

console.log(`Using imported functions ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);