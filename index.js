// @flow

import {type Base} from './export';

let dog: Base = {str: "a string"};

// $FlowExpectedError
let cat: Base = {};
