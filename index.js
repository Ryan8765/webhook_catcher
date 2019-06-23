$(document).ready(function(){

    /**
     * 
     * @param {Array of Objects} treeSelector - select all tree elements and initialize onclick handlers
     */
    function initializeTree ( treeSelector ) {
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
    }

    const data = {
        glossary: {
            title: [1, 2, 3, 4],
            title2: [
                {
                    first: {
                        subfirst: 1,
                        subSecond: 2
                    }
                },
                {
                    first: {
                        subfirst: 1,
                        subSecond: 2
                    }
                }],
            GlossDiv: {
                title: "S",
                GlossList: {
                    GlossEntry: {
                        ID: "SGML",
                        SortAs: "SGML",
                        GlossTerm: "Standard Generalized Markup Language",
                        Acronym: "SGML",
                        Abbrev: "ISO 8879:1986",
                        GlossDef: {
                            para: "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        GlossSee: "markup"
                    }
                }
            }
        }
    };


    // Returns if a value is an array
    function isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    function isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }   

    

    var view = {
        //not an array of ojects, but an array of primitives.
        pureArrayNode: function( array, path ) {
            var length = array.length; 
            return `<li data-tree-path="${path}"><button class='btn btn-primary btn-sm'>Select</button>  ${array[0]} (Array - Len: ${length})</li>`;
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
            return `<li data-tree-path="${path}"><button class='btn btn-primary btn-sm'>Select</button>  ${value}</li>`;
        },

        initalizedTreeNode: function() {
            return $('<ul class="tree"><li data-tree-path="data"></li></ul>');
        }
    }

    

    /**
     * 
     * @param {Object/Array} data - data from post request 
     * @param {Object} object - iterator object 
     * @param {function} isArray - function to determine if value is array 
     * @param {function} isObject - function to determine if value is object
     * @param {string} path - path to object of interest 
     */
    function treeBuilder(data, isArray, isObject, path = 'data', $treeInstance) {
        var $selector = $treeInstance.find(`[data-tree-path='${path}']`);
        // - is object or array
        if (isArray(data)) {
            if( isObject(data[0]) ) {
                Object.keys(data[0]).map((key) => {
                    newPath = path + '[0]' + `.${key}`;
                    var $element = view.objectNode(key, newPath);
                    $selector.append($element);
                    // $tree.find('.ryan').append(`<li><a href="#">${key}</a><span></span></li>`);
                    treeBuilder(data[0][key], isArray, isObject, newPath, $treeInstance);
                });
                // treeBuilder(data[0], object, isArray, isObject, newPath);
            } else {
                path += "[0]";
                const length = data.length;
                var $element = view.pureArrayNode(data, path);
                $selector.append($element);
            }
            // treeBuilder(data[0], object, isArray, isObject, path);
        } else if (isObject(data)) {
            Object.keys(data).map((key) => {
                    newPath = path + `.${key}`;
                    var $element = view.objectNode(key, newPath);
                    $selector.append($element);
                    // $tree.find('.ryan').append(`<li><a href="#">${key}</a><span></span></li>`);
                    treeBuilder(data[key], isArray, isObject, newPath, $treeInstance);
            });
        } else {
            var $element = view.primitiveNode( data, path );
            $selector.append($element);
        }
    }

    




    /**
     * 
     * @param {Array of Objects} treeSelector - select all tree elements
     */
    function initializeTree(treeElements) {
        for (var i = 0; i < treeElements.length; i++) {
            treeElements[i].addEventListener('click', function (e) {
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
    }

    /**
     * Runs main page load content.
     */
    function main() {
        //iniitalize new tree instance.
        var $treeInstance = view.initalizedTreeNode();
        treeBuilder(data, isArray, isObject, 'data', $treeInstance);

        //append treeinstance to dom
        $("body").append($treeInstance);

        //initialize all click events for tree nodes
        var $treeElements = document.querySelectorAll('ul.tree a:not(:last-child)');
        initializeTree($treeElements);
    }


    main();

    






    // var tree = document.querySelectorAll('ul.tree a:not(:last-child)');
    // for (var i = 0; i < tree.length; i++) {
    //     tree[i].addEventListener('click', function (e) {
    //         var parent = e.target.parentElement;
    //         var classList = parent.classList;
    //         if (classList.contains("open")) {
    //             classList.remove('open');
    //             var opensubs = parent.querySelectorAll(':scope .open');
    //             for (var i = 0; i < opensubs.length; i++) {
    //                 opensubs[i].classList.remove('open');
    //             }
    //         } else {
    //             classList.add('open');
    //         }
    //     });
    // }


});


