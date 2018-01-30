/// Remove every instance of `deleteValue` inside the array
Array.prototype.clean = function(deleteValue)
{
	deleteValue = Array.isArray(deleteValue) ? deleteValue : [deleteValue];
	for (var i = 0; i < this.length; i++)
	{
		if (deleteValue.indexOf(this[i]) !== -1)
		{
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};
module.exports.arrayClean = Array.prototype.clean;

/// String formatting using {0}, {1}, ... or {key} as placeholder strings
/// Accepts both an array or varargs
String.prototype.format = function()
{
    var replaceWithBlanks = false;

    var args = arguments;
    if (args[0] === true)
    {
        replaceWithBlanks = true;
        Array.prototype.shift.call(arguments);
    }

    if (typeof args[0] == "object")
        args = args[0];

    return this.replace(/{([\d\w\_\-]+)}/g, function(match, number)
    {
        return typeof args[number] != 'undefined'
        ? args[number]
        : (replaceWithBlanks ? "" : match)
        ;
    });
};
module.exports.stringFormat = String.prototype.format;

/// Upper-case the first character of a string
String.prototype.firstToUpper = function ()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};
module.exports.stringFirstToUpper = String.prototype.firstToUpper;

/// Converts a resolution to the smallest aspect ratio
/// @param  {[object|int]} widthOrArray Array of both parameter [width, height] OR width in pixels
/// @param  {[int]} height Height in pixels
/// @return {[object]} Array of the aspectration [width, height]
function resolutionToAspect(widthOrArray, height)
{
	if (typeof widthOrArray == "object")
	{
		height = widthOrArray[1];
		widthOrArray = widthOrArray[0];
	}

	var count = 0;
	var value = Math.max(widthOrArray, height) / Math.min(widthOrArray, height);

	do
	{
		count++;
	} while ( (count/value) != parseInt(count/value) );
	return Math.max(widthOrArray, height) == widthOrArray ? [count, count/value] : [count/value, count];
}
module.exports.resolutionToAspect = resolutionToAspect;
