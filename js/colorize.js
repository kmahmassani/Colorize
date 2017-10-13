function colorize(strText, strColors) {

    var response = function (success, text) {
        this.success = success;
        this.text = text;
    }

    if (!strText || !strColors) {
        return new response(false, "Invalid Arguments");
    }

    var validateColor = function (color) {
        if (color === "") {
            return false;
        }

        if (color === "black") {
            return true;
        }

        var tmp = document.createElement("div");
        tmp.style.color = "black";
        tmp.style.color = color;
        if (tmp.style.color !== "black") {
            return true;
        }
    };

    var splitColorString = function (str) {
        //Check for null and empty strings
        if (!str) {
            return null;
        }

        //Remove whitespace and replace new lines with delimiter
        str = str.trim();
        str = str.replace(/\n+/g, ',');

        //Check for invalid characters
        if (!/^[/s]*[a-z]+[a-z,;\s]+[a-z]+[/s]*$/gi.test(str)) {
            return null;
        }

        //Split and verify colors
        colors = str.split(/[,;]+/);
        if (!colors || !colors.length) {
            return null;
        }
        else {
            for (var i = 0; i < colors.length; i++) {
                colors[i] = colors[i].trim();
                if (!validateColor(colors[i])){
                    return null;
                }
            }
        }

        return colors;
    };

    var getRandomColor = function (colors, lastColor) {
        if (!colors)
            return "";

        var tmpColors = colors.slice();

        // no choices
        if (tmpColors.length == 1)
            return tmpColors[0];

        // only two colors, just return the other one
        if (tmpColors.length == 2) {
            if (tmpColors[0] === lastColor)
                return tmpColors[1];
            else
                return tmpColors[0];
        }
        else {
            if (lastColor) {
                // remove the last color from our options
                var index = tmpColors.indexOf(lastColor);
                if (index > -1) {
                    tmpColors.splice(index, 1);
                }
            }

            // pick a random color from our options
            return tmpColors[Math.floor(Math.random() * tmpColors.length)];
        }
    };

    var colors = splitColorString(strColors);

    if (colors) {
        var coloredStr = "";
        var lastColor;

        // only one color
        if (colors.length == 1) {
            coloredStr = strText.fontcolor(colors[0]);
        }
        else {
            for (var i = 0; i < strText.length; i++) {
                if (strText.charAt(i).trim() != "" || !lastColor) //whitespace doesn't need colours
                {
                    lastColor = getRandomColor(colors, lastColor);
                }
                coloredStr += strText.charAt(i).fontcolor(lastColor);
            }
        }

        return new response(true, coloredStr);
    }
    else {
        return new response(false, "Invalid colors");
    }
};

function doColorize() {
    var testStr = "I’d like to color a paragraph of text into random colors (not ordered in a particular way). List of colors needs to be entered by the user with appropriate input validation and stored in array. Two neighboring letters should not have the same color.";
    var txtColors = document.getElementById('txtColors');
    var span = document.getElementById('pText');

    var result = colorize(testStr, txtColors.value);
    if (result.success) {
        span.innerHTML = result.text;
        txtColors.className = txtColors.className.replace('is-invalid', '');
    } else {
        span.innerHTML = "";
        txtColors.className += " is-invalid";
    }
};