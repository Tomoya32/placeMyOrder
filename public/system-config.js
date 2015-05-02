"format cjs";

var MySystem = require('@loader');

if(MySystem.env === "development" && typeof window === "undefined") {
	exports.systemConfig = {
		meta: {
			'jquery': {
				"format": "global",
				"exports": "jQuery",
				"deps": ["can/util/vdom/vdom"]
			}
		}
	};
}


