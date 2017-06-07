'use strict';


const getOffset = ($el) => {
    let rect = $el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
}

const isInView = ($el, overflow) => {
    let WIN_H = window.innerHeight || document.documentElement.clientHeight;
    let offset = getOffset($el).top;
    let parentOffset = document.body.scrollTop + WIN_H + overflow || 0;

    if (offset < parentOffset) {
        return true;
    } else {
        return false;
    }
}

const debounce = (fn, timeout) => {
    let timer = null;
    return function() {
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const throttle = (fn, threshhold = 250) => {
    let last,
        deferTimer;

    return function() {
        let now = Date.now();
        let args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(this, args);
        }
    };
}

const getType = obj => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

const clone = obj => {
    let type = getType(obj);
    let res = type === 'array' ? [] : {};

    if (type === 'array') {
        res = obj.slice(0);
    }
    for (let key in obj) {
        let type = getType(obj[key]);
        res[key] = type === 'object' || type === 'array' ? clone(obj[key]) : obj[key];
    }
    return res;
}

export default {
    isInView,
    debounce,
    throttle,
    clone
}
