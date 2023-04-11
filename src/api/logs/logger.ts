import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({
            label: `💡`,
        }),
        format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        format.json()
    ),
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
        new transports.Console({
            level: 'warn',
            format: format.combine(
                format.label({
                    label: `⛔ `,
                }),
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss',
                }),
                format.printf(
                    warn =>
                        `${warn.level}: ${warn.label}: ${[warn.timestamp]}: ${warn.message}`,
                ),
            ),
        },),
        new DailyRotateFile({
            filename: './logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true, //Whether to compress the old log files.
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export default logger;
