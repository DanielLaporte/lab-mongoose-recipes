const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
 
 
  // Create a new recipe
  let newRecipe = {
    title: 'Apple Pie',
    level: 'Easy Peasy',
    ingredients: ['apples', 'sugar', 'flour', 'butter', 'cinnamon'],
    cuisine: 'Homemade',
    dishType: 'dessert',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 60,
    creator: 'Chef John',
  };

  // Insert the new recipe into the database
  return Recipe.create(newRecipe)
  .then((createdRecipe) => {
    console.log(`Created recipe: ${createdRecipe.title}`);
    return Recipe.insertMany(data)
  })
.then((insertedRecipes) => {
  insertedRecipes.forEach((recipes) => {
    console.log(`Inserted recipe: ${recipes.title}`);
  
})

  // Update the duration of "Rigatoni alla Genovese" recipe
return Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 },
  { new: true } 
)
  .then((updatedRecipe) => {
    if (updatedRecipe) {
      console.log(`Updated recipe: ${updatedRecipe.title}`);
    } else {
      console.log("The recipe was not updated");
    }
  
    // Delete the "Carrot Cake" recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Deleted recipe: Carrot Cake');

    // Close the database connection
    mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
});
