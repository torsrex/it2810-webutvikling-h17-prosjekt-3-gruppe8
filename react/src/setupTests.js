// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from './tempPolyfills'

//Setting up enzyme
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

//Needed for mocking localStorage
const localStorageMock = (() => {
    const store = {}

    return {
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        clear: function() {
            store = {}
        }
    }

})()

Object.defineProperty(window, 'localStorage', {
     value: localStorageMock
})
