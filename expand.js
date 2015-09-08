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

Array.prototype.combine = function (arr, invert)
{
	var arr1 = invert ? arr		: this;
	var arr2 = invert ? this	: arr;
	
	var l = Math.min(arr1.length,arr2.length);
	var ret = {};
	var i;
	for(i = 0; i < l; i++)
	{
		ret[arr1[i]+""] = arr2[i];
	}
	
	return ret;
};

if (typeof String.prototype.format != 'function')
{
	String.prototype.format = function()
	{
		var args = arguments;
		if (typeof args[0] == "object")
			args = args[0];

		return this.replace(/{([\d\w\_\-]+)}/g, function(match, number)
		{
			return typeof args[number] != 'undefined'
				? args[number]
				: match
			;
		});
	};
}

if (typeof String.prototype.trim != 'function')
{
	String.prototype.trim = function ()
	{
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	};
}

if (typeof String.prototype.firstToUpper != 'function')
{
	String.prototype.firstToUpper = function ()
	{
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

function getRotationDegrees(obj)
{
	var matrix = obj.css("-webkit-transform")	||
	obj.css("-moz-transform")					||
	obj.css("-ms-transform")					||
	obj.css("-o-transform")						||
	obj.css("transform");

	if(typeof matrix != "undefined")
	{
		if(matrix !== 'none')
		{
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		}
		else
		{
			var angle = 0;
		}
	}
	return (angle < 0) ? angle +=360 : angle;
}

function counter(values, show)
{
	if (typeof values[show] == "undefined")
		return values["default"];
	else
		return values[show];
}

if (!window.requestAnimationFrame)
{
	window.requestAnimationFrame = (function()
	{
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element)
		{
			window.setTimeout(callback, 1000 / 60);
		};
	})();
}