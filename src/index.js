const QNeo4jHelper = require("./helper");

QNeo4jHelper.injectDateFunctions();
QNeo4jHelper.setGlobalOptions({ dateLocale: 'pt-br' });

module.exports = QNeo4jHelper;