const WF412 = require('./workflow412');

module.exports = {
	create: function (Common) {
		return new WF412(Common);
	}
}