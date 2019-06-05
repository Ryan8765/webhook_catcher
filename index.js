$(document).ready(function(){


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
            thirdInnerObjectArray: [1, 2, 3, 4]
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

    var $tree = $('<ul class="tree"><li data-tree-path="data"></li></ul>');

    var path = [
        {
            name: "something",
            path: "somePath",

        }
    ];

    var view = {
        //not an array of ojects, but an array of primitives.
        pureArrayNode: function( array, path ) {
            var length = array.length; 
            return `<li data-tree-path="${path}"><button>Select</button>Array (Len: ${length}, First Value: ${array[0]})</li>`;
        }, 
        objectNode: function(key, path) {
            return `
                <li><a href="#">${ key }</a>
                    <ul data-tree-path="${path}">
                    </ul>
                </li>
            `;
        },
        primitiveNode: function( value, path ) {
            return `<li data-tree-path="${path}"><button>Select</button>${value}</li>`;
        }
    }


    function treeBuilder(data, object, isArray, isObject, path = 'data') {
        var $selector = $tree.find(`[data-tree-path='${path}']`);
        // - is object or array
        if (isArray(data)) {
            const length = data.length;
            path += ".data[0]";
            var $element = view.pureArrayNode( data, path );
            $selector.append($element);
            
            // treeBuilder(data[0], object, isArray, isObject, path);
        } else if (isObject(data)) {
            Object.keys(data).map((key) => {
                    newPath = path + `.${key}`;
                    var $element = view.objectNode(key, newPath);
                    $selector.append($element);
                    // $tree.find('.ryan').append(`<li><a href="#">${key}</a><span></span></li>`);
                    treeBuilder(data[key], object, isArray, isObject, newPath);
            });
        } else {
            var $element = view.primitiveNode( data, path );
            $selector.append($element);
        }
    }

    treeBuilder(data, object, isArray, isObject);

    $("body").append($tree);









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


});


