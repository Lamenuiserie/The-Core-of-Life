/**
 * Under Creative Commons Licence
 * @author Simon Chauvin
 * @param width
 * @param height
 * @returns {___that0}
 */
function fmRectangle(x, y, width, height) {
    "use strict";
    var that = Object.create({});

    //Position
    that.x = x;
    that.y = y;

    //Size
    that.width = width;
    that.height = height;

    return that;
}