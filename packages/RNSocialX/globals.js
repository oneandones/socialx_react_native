// oh po'r soul, wherefore art thee wand'ring this f'rbidden landeth
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''

if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// Needed so that 'stream-http' and gun chooses the right default protocol.
global.location = {
  protocol: 'file:',
  host: '',
};

// const rande = require('react-native-randombytes');
const { TextEncoder, TextDecoder } = require('text-encoding');

// global.crypto = {
//   loaded: false,
//   subtle: {},
// };

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
//console.log('test', {data: {test: true}, strings: '123', number: 123}, {another: {test: true}, what: undefined, or: null}, true);