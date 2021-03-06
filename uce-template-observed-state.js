import {reactive} from "@uce";

const appModel = {}

const defaultOptions = {
    observe: false,
    source: false
}

function observedReactive(el, init, options = defaultOptions) {
    // Naive error handling
    if (!el.model  || typeof el.model !== 'string' || el.model === '') {
        console.log("*** ERROR: no proper 'model' prop")
        return
    }

    // Check first if this is the first time this 'model' is used and initialize it
    if (!appModel[el.model]) {
        appModel[el.model] = {observers: [], initializer: null};
    }

    // Create the reactive state that also updates all observers
    const initialValue =
        !options.source && appModel[el.model].initializer
        ? appModel[el.model].initializer()
        : init;
    const state = reactive({[el.model]: initialValue}, (x) => {
        appModel[el.model].observers.forEach(f => f(x));
        el.render()
    })

    // Add an observer for this element only if "observe" is true.
    if (options.observe) {
        const observer = [(v) => state[el.model] = v];
        appModel[el.model].observers = appModel[el.model].observers.concat(observer)
    }

    // Setup an initializer that will be used from observers
    if (options.source) {
        if (appModel[el.model].initializer) {
            console.log("*** WARNING: more than an alement used as source for the same model. Ignored.");
        } else {
            appModel[el.model].initializer = () => {
                return state[el.model]
            }
        }
    }

    return state;
}

export default observedReactive;