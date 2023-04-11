"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.label({
        label: `💡`,
    }), winston_1.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), winston_1.format.json()),
    /**
     * filename: The filename of the log file. %DATE% is a
     * placeholder that will be replaced with the
     * current date in the format specified by datePattern.
     * -----------------------------------------------------
     * datePattern: The format of the date to use in the filename.
     * In this example, the format is YYYY-MM-DD,
     * which means that each log file will have a name
     * like logs/2022-04-12.log.
     * --------------------------------
     * maxSize: The maximum size of a log file before
     * it is rotated. In this example, the maximum size
     * is set to 20m, which means 20 megabytes.
     * --------------------------------
     * maxFiles: The maximum number of days to keep old
     * log files. In this example, the maximum number of
     * days is set to 14d, which means 14 days.
     */
    transports: [
        new winston_1.transports.Console({
            level: 'warn',
            format: winston_1.format.combine(winston_1.format.label({
                label: `⛔ `,
            }), winston_1.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss',
            }), winston_1.format.printf(warn => `${warn.level}: ${warn.label}: ${[warn.timestamp]}: ${warn.message}`)),
        }),
        new winston_daily_rotate_file_1.default({
            filename: './logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
exports.default = logger;
//# sourceMappingURL=logger.js.map