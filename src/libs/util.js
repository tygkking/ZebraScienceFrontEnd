let util = {

};
util.title = function (title) {
    title = title ? title : 'Zebra Science';
    window.document.title = title;
};

export default util;