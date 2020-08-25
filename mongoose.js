const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://dror:<wmuCGZXoi88Mg5BR>@cluster0.tokwo.azure.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(()=>console.log('connected to MongoDb...'))
.catch(err=>console.error('could not connect',err));

