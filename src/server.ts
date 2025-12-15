

import mongoose from "mongoose";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import colors from 'colors';
import { Server } from "socket.io";
import seedSuperAdmin from "./DB";
import { config } from "./config";

//uncaught exception
process.on('uncaughtException', error => {
    console.error('❌ UNCAUGHT EXCEPTION:', error);
    errorLogger.error('uncaughtException Detected', error);
    process.exit(1);
});


let server: any;

async function main() {
    try {

        // Connect to database first
        console.log('🔌 Connecting to database...');
        await mongoose.connect(config.database_url as string);
        logger.info(colors.green('🚀 Database connected successfully'));

        // Then seed super admin after database is connected
        console.log('👤 Seeding super admin...');
        await seedSuperAdmin();


        const port = typeof config.port === 'number' ? config.port : Number(config.port);

      

        server = app.listen(port, config.IP as string, () => {
            logger.info(colors.yellow(`♻️  Application listening on port:${config.port}`));
        });
        //socket
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: '*'
            }
        });

    } catch (error) {
        console.error('❌ Error during startup:', error);
        errorLogger.error(colors.red('🤢 Failed to connect Database'), error);
        process.exit(1);
    }

    //handle unhandledRejection
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                errorLogger.error('UnhandledRejection Detected', error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();

//SIGTERM
process.on('SIGTERM', () => {
    logger.info('SIGTERM IS RECEIVE');
    if (server) {
        server.close();
    }
});  