const { DB_USER, DB_PASSWORD } = process.env;
// const username = encodeURIComponent(DB_USER);
// const password = encodeURIComponent(DB_PASSWORD);

export const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6ex8uxb.mongodb.net/nextProductsDB?retryWrites=true&w=majority`;
