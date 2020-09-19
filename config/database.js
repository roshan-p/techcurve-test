import mongoose from 'mongoose';

const DB_URI = 'mongodb+srv://apptest:apptest@cluster0.rwfzr.gcp.mongodb.net/Techcurve?retryWrites=true&w=majority';

const startDatabase = async () => {
    try {
      const success = await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('DB Connected');
    } catch (error) {
      console.log('DB Connection Error', error);
    }
  };
  export default startDatabase;