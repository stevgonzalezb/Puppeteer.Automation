const winston = require("winston");
require('winston-daily-rotate-file');
const moment = require('moment');
const fs = require('fs-extra');
const fileControl = require('fs');
const _ = require('lodash');

let transports = [
	new (winston.transports.Console)({
		timestamp: function () {
			return '[' + moment().format('h:mm:ss a') + ']'
		},
		colorize: true
	})
];

const logger = new (winston.Logger)({});
const path = require('path');

function Logger(Config) {
	const LOG_FOLDER = path.join(appRoot, 'Logs');
	this.Config = Config;
	let DF = 'YYYY-MM-DD h:mm:ss a';
	Config.Logs.DateFormat !== "" ? DF = Config.Logs.DateFormat : null;

	if (appRoot !== undefined) {

		try {
			fs.ensureDir(LOG_FOLDER);

			let transport = new (winston.transports.DailyRotateFile)({
				filename: LOG_FOLDER + '\\' + Config.Logs.FileName.Name + '-%DATE%.log',
				datePattern: Config.Logs.FileName.DatePattern,
				zippedArchive: Config.Logs.ZippedLogFile,
				maxSize: Config.Logs.MaxSize.Value + Config.Logs.MaxSize.Unit,
				maxFiles: Config.Logs.MaxFiles.Value + Config.Logs.MaxFiles.Type,
				timestamp: function () {
					return '[' + moment().format(DF) + ']'
				}
			});

			transport.on('rotate', function (oldFileName, newFileName) {
				logger.info('Archivo anterior ---> ' + oldFileName);
				if (Config.Logs.Backup.RequireBackup) {
					let src = oldFileName;
					let fileNameToCopy = path.basename(src);
					let mainFolder = path.dirname(require.main.filename);
					let destinationFolder = mainFolder + '\\' + Config.Logs.Backup.BackupFolderName;
					fileControl.access(destinationFolder, (err) => {
						if (err)
							fileControl.mkdirSync(destinationFolder);
						copyFile(src, destinationFolder + '\\' + fileNameToCopy);
					});
				}
			});

			transports.push(transport);

			logger.configure({
				transports: transports,
				level: 'debug'
			});

			let levelsMap = [{name: 'ERROR', level: 0}, {name: 'INFO', level: 1}, {name: 'DEBUG', level: 2}];
			this.CurrentLevel = _.find(levelsMap, {name: this.Config.Logs.Level.toUpperCase()});

			logger.info('Logger utilizando el transporte de archivos creado con éxito.');

		} catch (e) {
			throw e;
		}
	}
	else {
		logger.warn('No AppRoot defined in main class. Logger won\'t log to file.');
	}

}

function copyFile(src, dest) {

	let readStream = fileControl.createReadStream(src);

	readStream.once('error', (err) => {
		console.log(err);
	});

	readStream.once('end', () => {
		console.log(' --> Archivo ' + src + ' respaldado');
	});

	readStream.pipe(fileControl.createWriteStream(dest));
}

Logger.prototype.Debug = function (message) {
	if (this.CurrentLevel.level === 2) {
		logger.log('debug', message);
	}
};

Logger.prototype.Info = function (message) {
	if (this.CurrentLevel.level >= 1) {
		logger.info(message);
	}
};

Logger.prototype.Error = function (message) {
	if (this.CurrentLevel.level >= 0) {
		logger.error(message);
	}
};


module.exports = Logger;