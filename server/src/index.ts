import { AppDataSource } from "./data-source"
import app from './app';

AppDataSource.initialize().then(async () => {
    const port = process.env.PORT;
    app.listen(port, function () {
        console.log("Application is running on port " + port);
    });

}).catch(error => console.log(error))

