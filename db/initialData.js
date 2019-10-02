const dummyIngredients = [['soymilk', '2 cups'], ['bananas', 2], ['flaxseed', '1 tbs']];

const dummyRecipe = {
  title: 'Pad Thai',
  images: ['https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1885&q=80'],
  ingredients: [
    { 
      name: 'pad Thai rice noodles',
      quantity: 5,
      unit: 'ounces',
      aisle: 'pasta and rice'
    },
    { 
      name: 'vegetable oil',
      quantity: 3,
      unit: 'tablespoons',
      aisle: 'baking'
    },
    { 
      name: 'egg, room temperature',
      quantity: 1,
      unit: 'large',
      aisle: 'dairy and eggs'
    },
    { 
      name: 'shrimp, peeled, deveined (optional)',
      quantity: 6,
      unit: 'medium',
      aisle: 'meat and seafood'
    },
    { 
      name: 'pressed tofu (bean curd)',
      quantity: 2,
      unit: 'tablespoons',
      aisle: 'produce'
    },
    { 
      name: 'sweet preserved shredded radish',
      quantity: 1,
      unit: 'tablespoon',
      aisle: 'canned items'
    },
    { 
      name: 'bean sprouts',
      quantity: 1,
      unit: 'cup',
      aisle: 'produce'
    },
    { 
      name: 'tamarind water',
      quantity: 5,
      unit: 'tablespoons',
      aisle: 'condiments'
    },
    { 
      name: 'Thai fish sauce (nam pla)',
      quantity: 1.5,
      unit: 'tablespoons',
      aisle: 'condiments'
    },
    { 
      name: 'simple syrup, preferably made with palm sugar',
      quantity: 1.5,
      unit: 'tablespoons',
      aisle: 'baking'
    },
    { 
      name: 'garlic chives',
      quantity: 2,
      unit: 'cut into 1-inch pieces',
      aisle: 'produce'
    },
    { 
      name: 'ground dried Thai chiles, divided',
      quantity: 0.5,
      unit: 'teaspoon',
      aisle: 'baking'
    },
    { 
      name: 'crushed roasted, unsalted peanuts, divided',
      quantity: 2,
      unit: 'tablespoons',
      aisle: 'snacks'
    },
    { 
      name: 'lime wedges',
      quantity: 2,
      unit: 'units',
      aisle: 'produce'
    }
  ],
  directions: [
    'Place noodles in a large bowl; pour hot water over to cover. Let soak until tender but not mushy, 5–10 minutes. Drain; set aside.',
    'Heat vegetable oil in a wok or large skillet over medium-high heat. Add egg; stir until barely set, about 30 seconds. Add shrimp, if using. Cook, stirring, until shrimp and egg are almost cooked through, 2–3 minutes. Add tofu and radish; cook for 30 seconds. Add noodles and cook for 1 minute. Stir in sprouts. Add tamarind water, fish sauce, and simple syrup and stir-fry until sauce is absorbed by noodles and noodles are well coated, about 1 minute. Stir in chopped garlic chives. Add 1/4 tsp. ground chiles and 1 Tbsp. peanuts and toss well. Transfer to serving plates.',
    'Garnish with remaining 1/4 tsp. ground chiles, 1 Tbsp. peanuts, and lime wedges.',
  ],
  nutrition_info: {
    calories: 500,
    carbs: '37g',
    sugar: '16g',
    fat: '39g',
    sodium: '1073mg',
    fiber: '9g',
    net_carbs: '28g',
    added_sugar: '0g',
    saturated_fat: '26g',
    protein: '20g'
  },
  servings: '4 servings'
}

const dummySearchRecipeArray = [dummyRecipe, dummyRecipe]

export { dummyIngredients, dummySearchRecipeArray }