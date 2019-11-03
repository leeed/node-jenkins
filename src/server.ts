import App from './app';
const app = App.app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API REST runnig on port:", PORT);
});