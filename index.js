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
    arrayOne: [1, 2, 3, 4, 5],
    innerObject: {
        firstInnerObjectKey: 1, 
        secondInnerOBjectKey: 2, 
        thirdInnerObjectArray: [1,2,3,4]
    }
};


// Returns if a value is an array
function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

const object = {
    iterator: 0
};

function treeBuilder( data, object, isArray, isObject, path ) {
    // - is object or array
    if( isArray(data) ) {
        console.log(data[0]);
        treeBuilder(data[0], object, isArray, isObject, path);
    } else if ( isObject(data) ) {
        Object.keys( data ).map((key)=>{
            treeBuilder(data[key], object, isArray, isObject, path);
            console.log(key);
            // if( isObject(data[key] ) ) {
            //     console.log(key);
            //     treeBuilder(data[key], object, isArray, isObject, path);
            // } else if ( isArray(data[key]) ) {
            //     console.log(key);
            //     treeBuilder(data[0], object, isArray, isObject, path);
            // } else {

            // }
        });
    }
}

treeBuilder( data, object, isArray, isObject );
