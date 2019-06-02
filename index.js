var tree = document.querySelectorAll('ul.tree a:not(:last-child)');
for (var i = 0; i < tree.length; i++) {
    tree[i].addEventListener('click', function (e) {
        var parent = e.target.parentElement;
        var classList = parent.classList;
        if (classList.contains("open")) {
            classList.remove('open');
            var opensubs = parent.querySelectorAll(':scope .open');
            for (var i = 0; i < opensubs.length; i++) {
                opensubs[i].classList.remove('open');
            }
        } else {
            classList.add('open');
        }
    });
}

const data = {
    one: "one",
    two: "two",
    three: [1, 2, 3]
};


// Returns if a value is an array
function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

const object = {

};

function treeBuilder( data, object, isArray, isObject, path ) {
    // - is object or array
    if( isArray(data) ) {
        alert('array')
    } else if ( isObject(data) ) {
        alert('object');
    }
}

treeBuilder( data, object, isArray, isObject );
