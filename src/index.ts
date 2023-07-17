import express from 'express';
import image from './routes/image';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('combined'));

app.get('/', function (req: express.Request, res: express.Response): void {
    res.send(
        '<p>Please, enter url follow template:<p><p style="color: blue;">http://localhost:3000/api/image?imageFileName={imageName.imageExtension}&width={width}&height={height}</p>',
    );
});

app.use('/api', image);

//server configuration
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);

export default app;
