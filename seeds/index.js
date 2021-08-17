const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '610badb7832b1c1a2022781a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem Description',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/sentinel007cloudinary/image/upload/v1628248654/YelpCamp/n55o60z0l7x8vykx96rj.jpg',
                filename: 'YelpCamp/n55o60z0l7x8vykx96rj'
              },
              {
                url: 'https://res.cloudinary.com/sentinel007cloudinary/image/upload/v1628248656/YelpCamp/an2xulimb5lbfnfjumft.jpg',
                filename: 'YelpCamp/an2xulimb5lbfnfjumft'
              }
            ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})