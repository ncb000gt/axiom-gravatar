/*
 * @author: Nick Campbell
 *
 */

if (!global.axiom) {
    global.axiom = {};
}

/**
 * A library to give you the Gravatar of the associated email address.
 *
 * email - {String} Required. Email address of the user.
 * size - {Number|String} Optional. The size from 1-255 that you want the image returned as.
 * rating - {String} Optional. The rating on the image that you'd like to pull. [g|pg|r|x]
 */
axiom.Gravatar = function(email, size, rating) {
    if (!email) {
	throw "No email address provided. Cannot generate Gravatar URL.";
    }

    importPackage(java.lang);
    importPackage(java.util);
    importPackage(java.io);
    importPackage(java.security);

    function hex(byte_array) {
	var sb = new StringBuffer();
	var len = byte_array.length;

	for (var i = 0; i < len; ++i) {
	    sb.append(Integer.toHexString((byte_array[i] & 0xFF) | 0x100).substring(1,3));
	}
	return sb.toString();
    }

    function md5Hex (message) {
	var md = MessageDigest.getInstance("MD5");
	return hex(md.digest(message.getBytes("CP1252")));
    }

    var url = "http://www.gravatar.com/avatar/"+md5Hex(Packages.java.lang.String(email));

    if (size) {
	url += "?s="+size;
    }

    if (rating) {
	var prefix = "&";
	if (!size) {
	    prefix = "?";
	}
	url += prefix+"r="+rating;
    }

    return url;
}

axiom.Gravatar.toString = function() {
    return "[axiom.Gravatar]";
}

axiom.Gravatar.prototype.toString = function() {
    return "[axiom.Gravatar Object]";
}

axiom.lib = "Gravatar";
axiom.dontEnum(axiom.lib);
/*for (var i in axiom[axiom.lib])
    axiom[axiom.lib].dontEnum(i);*/
for (var i in axiom[axiom.lib].prototype)
    axiom[axiom.lib].prototype.dontEnum(i);
delete axiom.lib;
