/*Task: You have two arrays that need to be combined into one. In the new array, 
add four items under the 'meals' key: breakfast, lunch, snacks, and dinner. Then, group all items from the second array by their corresponding meal type.*/
const meal = {
    "M_Id": 1740636327888,
    "IMO": 1234567,
    "Title": 'Test Captain',
    "CreatedBy": 'Test Captain',
    "UpdatedBy": 'Test Captain',
    "CreatedAt": '2025-02-27 06:05:27.887',
    "UpdatedAt": '2025-02-27 06:05:27.887',
}

const MealItems = [
    {
        "MI_Id": 1740636327888100,
        "IMO": 1234567,
        "MealID": 1740636327888,
        "Mealtype": 'breakfast',
        "RecipeID": 1739792919423,
        'RecipeName': 'Breakfast Scramble with Eggs',
        'CreatedBy': 'Test Captain',
        'UpdatedBy': 'Test Captain',
        'CreatedAt': '2025-02 - 27 06:05: 27.887',
        'UpdatedAt': '2025-02 - 27 06:05: 27.887',
    },
    {
        MI_Id: 1740636327888101,
        IMO: 1234567,
        MealID: 1740636327889,
        Mealtype: 'lunch',
        RecipeID: 1740636327889,
        RecipeName: 'Grilled Chicken Salad',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02-27 06:10:27.887',
        UpdatedAt: '2025-02-27 06:10:27.887',
    },
    {
        MI_Id: 1740636327888103,
        IMO: 1234567,
        MealID: 1740636327891,
        Mealtype: 'dinner',
        RecipeID: 1740636327891,
        RecipeName: 'Grilled Salmon with Veggies',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: ' 2025-02 - 27 06: 20: 27.887',
        UpdatedAt: '2025-02 - 27 06: 20: 27.887',
    },
    {
        MI_Id: 1740636327888104,
        IMO: 1234567,
        MealID: 1740636327892,
        Mealtype: 'breakfast',
        RecipeID: 1740636327892,
        RecipeName: 'Oatmeal with Berries',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 25: 27.887',
        UpdatedAt: '2025-02 - 27 06: 25: 27.887',
    },
    {
        MI_Id: 1740636327888105,
        IMO: 1234567,
        MealID: 1740636327893,
        Mealtype: 'lunch',
        RecipeID: 1740636327893,
        RecipeName: 'Veggie Wrap',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 30: 27.887',
        UpdatedAt: '2025-02 - 27 06: 30: 27.887',
    },
    {
        MI_Id: 1740636327888106,
        IMO: 1234567,
        MealID: 1740636327894,
        Mealtype: 'snacks',
        RecipeID: 1740636327894,
        RecipeName: 'Trail Mix',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 35: 27.887',
        UpdatedAt: '2025-02 - 27 06: 35: 27.887',
    },
    {
        MI_Id: 1740636327888107,
        IMO: 1234567,
        MealID: 1740636327895,
        Mealtype: 'dinner',
        RecipeID: 1740636327895,
        RecipeName: 'Spaghetti with Marinara',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 40: 27.887',
        UpdatedAt: '2025-02 - 27 06: 40: 27.887',
    },
    {
        MI_Id: 1740636327888108,
        IMO: 1234567,
        MealID: 1740636327896,
        Mealtype: 'breakfast',
        RecipeID: 1740636327896,
        RecipeName: 'Pancakes with Syrup',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 45: 27.887',
        UpdatedAt: '2025-02 - 27 06: 45: 27.887',
    },
    {
        MI_Id: 1740636327888109,
        IMO: 1234567,
        MealID: 1740636327897,
        Mealtype: 'lunch',
        RecipeID: 1740636327897,
        RecipeName: 'Chicken Caesar Salad',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 50: 27.887',
        UpdatedAt: '2025-02 - 27 06: 50: 27.887',
    },
    {
        MI_Id: 1740636327888110,
        IMO: 1234567,
        MealID: 1740636327898,
        Mealtype: 'snacks',
        RecipeID: 1740636327898,
        RecipeName: 'Granola Bar',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 06: 55: 27.887',
        UpdatedAt: '2025-02 - 27 06: 55: 27.887',
    },
    {
        MI_Id: 1740636327888111,
        IMO: 1234567,
        MealID: 1740636327899,
        Mealtype: 'dinner',
        RecipeID: 1740636327899,
        RecipeName: 'Stir - fry Veggies with Tofu',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 07:00: 27.887',
        UpdatedAt: '2025-02 - 27 07:00: 27.887',
    },
    {
        MI_Id: 1740636327888112,
        IMO: 1234567,
        MealID: 1740636327900,
        Mealtype: 'breakfast',
        RecipeID: 1740636327900,
        RecipeName: 'Avocado Toast',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 07:05: 27.887',
        UpdatedAt: '2025-02 - 27 07:05: 27.887',
    },
    {
        MI_Id: 1740636327888113,
        IMO: 1234567,
        MealID: 1740636327901,
        Mealtype: 'lunch',
        RecipeID: 1740636327901,
        RecipeName: 'Veggie Burger',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 07: 10: 27.887',
        UpdatedAt: '2025-02 - 27 07: 10: 27.887',
    },
    {
        MI_Id: 1740636327888114,
        IMO: 1234567,
        MealID: 1740636327902,
        Mealtype: 'dinner',
        RecipeID: 1740636327902,
        RecipeName: 'Beef Stir Fry',
        CreatedBy: 'Test Captain',
        UpdatedBy: 'Test Captain',
        CreatedAt: '2025-02 - 27 07: 15: 27.887',
        UpdatedAt: '2025-02 - 27 07: 15: 27.887',
    }
]

const result = Object.assign({},meal);
result.breakfast = [];
result.lunch = [];
result.dinner = [];
result.snacks = [];

const obj = MealItems.filter((item) => {
    if(item.Mealtype == 'breakfast')
        result.breakfast.push(item)
    else if(item.Mealtype == 'lunch')
        result.lunch.push(item)
    else if(item.Mealtype == 'dinner')
        result.dinner.push(item)
    else if(item.Mealtype == 'snacks')
        result.snacks.push(item)
})

console.log(obj);