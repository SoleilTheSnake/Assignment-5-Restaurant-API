const express = require('express');
const app = express();

app.use(express.json());

//Logging middleware for all HTTP methods, URL, and timestamp requests.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

//Validation middleware for POST and PUT requests to ensure required fields are present
app.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.url.startsWith('/menu')) {
    const { name, description, price, category, ingredients, available } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !Array.isArray(ingredients) ||
      available === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
  }
  next();
});

// Data for the server
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese on a sesame seed bun",
    price: 12.99,
    category: "entree",
    ingredients: ["beef", "lettuce", "tomato", "cheese", "bun"],
    available: true
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Grilled chicken breast over romaine lettuce with parmesan and croutons",
    price: 11.50,
    category: "entree",
    ingredients: ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    available: true
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella served with marinara sauce",
    price: 8.99,
    category: "appetizer",
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    ingredients: ["chocolate", "flour", "eggs", "butter", "vanilla ice cream"],
    available: true
  },
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons and mint",
    price: 3.99,
    category: "beverage",
    ingredients: ["lemons", "sugar", "water", "mint"],
    available: true
  },
  {
    id: 6,
    name: "Fish and Chips",
    description: "Beer-battered cod with seasoned fries and coleslaw",
    price: 14.99,
    category: "entree",
    ingredients: ["cod", "beer batter", "potatoes", "coleslaw", "tartar sauce"],
    available: false
  }
];

// Define routes and implement middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//GET requests for menu items
app.get('/menu', (req, res) => {
  res.status(200).json(menuItems);
});
app.get('/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === itemId);
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).json({ error: "Menu item not found" });
  }
  res.status(200).json(menuItems);
});

//POST request to add new menu item
app.post('/menu', (req, res) => {
  const newItem = req.body;
  newItem.id = menuItems.length + 1;
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

//PUT request to update existing menu item
app.put('/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === itemId);
  if (menuItem) {
    Object.assign(menuItem, req.body);
    res.status(200).json(menuItem);
  } else {
    res.status(404).json({ error: "Menu item not found" });
  }
});

//DELETE request to remove menu item
app.delete('/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = menuItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    menuItems.splice(index, 1);
    res.status(200).send();
  } else {
    res.status(404).json({ error: "Menu item not found" });
  }
});



//Validation middleware for POST and PUT requests to ensure required fields are present
app.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.url.startsWith('/menu')) {
    const { name, description, price, category, ingredients, available } = req.body;  
    if (!name || !description || !price || !category || !ingredients || !available) {
      return res.status(400).json({ error: "All fields are required" });
    }
  }
  next();
});
