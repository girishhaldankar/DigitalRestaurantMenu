export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  isVeg: boolean;

  price?: number;
  priceHalf?: number;
  priceFull?: number;

  offerTag?: string;
}

export const categories = [
  "All",
  "Mocktail",
  "Tea & Coffee",
  "Bread",
  "Small Bites",
  "Maggie",
  "Sandwich",
  "Burger",
  "Wrap",
  "Pasta",
  "Thai",
  "Starter",
  "Noodles",
  "Rice",
  "Soup",
  "Pizza",
  "Momos",
  "Frankie",
];

// ✅ AUTO CUISINE MAP (NO MANUAL WORK)
export const cuisineMap: Record<string, string> = {
  Mocktail: "Continental",
  "Tea & Coffee": "Continental",

  Bread: "Indian",
  Maggie: "Indian",
  Frankie: "Indian",

  "Small Bites": "Fast Food",
  Sandwich: "Fast Food",
  Burger: "Fast Food",
  Wrap: "Fast Food",
  Pizza: "Fast Food",

  Starter: "Chinese",
  Noodles: "Chinese",
  Rice: "Chinese",
  Soup: "Chinese",
  Momos: "Chinese",

  Pasta: "Continental",
  Thai: "Thai",
};

// ✅ CUISINE LIST
export const cuisines = [
  "All",
  "Indian",
  "Chinese",
  "Continental",
  "Fast Food",
  "Thai",
];

export const menuItems: MenuItem[] = [

/* ================= MOCKTAIL ================= */
{ id:"mocktail-1", name:"Lemon Mojito", description:"Refreshing mint lemon drink", price:75, image:"https://images.unsplash.com/photo-1551024709-8f23befc6c7a", category:"Mocktail", isVeg:true },
{ id:"mocktail-2", name:"Peach Ice Tea", description:"Chilled peach tea", price:75, image:"https://images.unsplash.com/photo-1497534446932-c925b458314e", category:"Mocktail", isVeg:true },
{ id:"mocktail-3", name:"Strawberry Margarita", description:"Sweet strawberry cooler", price:75, image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc", category:"Mocktail", isVeg:true },
{ id:"mocktail-4", name:"Cold Coffee", description:"Classic cold coffee", price:75, image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735", category:"Mocktail", isVeg:true },

/* ================= TEA & COFFEE ================= */
{ id:"tea-1", name:"Tea", description:"Regular tea", price:30, image:"https://images.unsplash.com/photo-1511920170033-f8396924c348", category:"Tea & Coffee", isVeg:true },
{ id:"tea-2", name:"Coffee", description:"Hot coffee", price:30, image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93", category:"Tea & Coffee", isVeg:true },
{ id:"tea-3", name:"Black Coffee", description:"Strong black coffee", price:40, image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", category:"Tea & Coffee", isVeg:true },
{ id:"tea-4", name:"Lemon Tea", description:"Light lemon tea", price:40, image:"https://images.unsplash.com/photo-1544787219-7f47ccb76574", category:"Tea & Coffee", isVeg:true },

/* ================= BREAD ================= */
{ id:"bread-1", name:"Bread Butter", description:"Classic bread butter", price:40, image:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec", category:"Bread", isVeg:true },
{ id:"bread-2", name:"Bread Omelette Plain", description:"Egg omelette with bread", price:75, image:"https://images.unsplash.com/photo-1604908176997-431d9b69b1c2", category:"Bread", isVeg:false },
{ id:"bread-3", name:"Bread Omelette Grilled", description:"Grilled omelette sandwich", price:90, image:"https://images.unsplash.com/photo-1550507992-eb63ffee0847", category:"Bread", isVeg:false },
{ id:"bread-4", name:"Cheese Bread Omelette", description:"Cheese omelette sandwich", price:95, image:"https://images.unsplash.com/photo-1550507992-eb63ffee0847", category:"Bread", isVeg:false },
{ id:"bread-5", name:"Egg Bhurji Pav", description:"2 egg bhurji with pav", price:75, image:"https://images.unsplash.com/photo-1601050690597-df0568f70950", category:"Bread", isVeg:false },

/* ================= SMALL BITES ================= */
{ id:"bite-1", name:"Garlic Bread", description:"5 pcs garlic bread", price:180, image:"https://images.unsplash.com/photo-1585238342028-4a9a3c3bcd2b", category:"Small Bites", isVeg:true },
{ id:"bite-2", name:"Cheese Garlic Bread", description:"Loaded cheesy garlic bread", price:200, image:"https://images.unsplash.com/photo-1604908176997-431d9b69b1c2", category:"Small Bites", isVeg:true },
{ id:"bite-3", name:"French Fries", description:"Crispy fries", priceHalf:100, priceFull:160, image:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5", category:"Small Bites", isVeg:true },
{ id:"bite-4", name:"French Fries with Cheese", description:"Cheesy fries", priceHalf:140, priceFull:240, image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add", category:"Small Bites", isVeg:true },
{ id:"bite-5", name:"Peri Peri Fries", description:"Spicy fries", priceHalf:120, priceFull:200, image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086", category:"Small Bites", isVeg:true },
{ id:"bite-6", name:"Nachos", description:"Crunchy nachos", priceHalf:120, priceFull:200, image:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092", category:"Small Bites", isVeg:true },
{ id:"bite-7", name:"Potato Wedges", description:"Crispy wedges", priceHalf:120, priceFull:200, image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086", category:"Small Bites", isVeg:true },
{ id:"bite-8", name:"Veg Aloo Tikki", description:"4/8 pcs aloo tikki", priceHalf:110, priceFull:180, image:"https://images.unsplash.com/photo-1606756790138-261d2b21cd6d", category:"Small Bites", isVeg:true },
{ id:"bite-9", name:"Chicken Nuggets", description:"6 pcs nuggets", price:190, image:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092", category:"Small Bites", isVeg:false },
{ id:"bite-10", name:"Chicken Lollipop", description:"4 pcs lollipop", price:200, image:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092", category:"Small Bites", isVeg:false },

/* ================= MAGGI ================= */
{ id:"maggi-1", name:"Classic Maggi", description:"Simple maggi", price:60, image:"https://images.unsplash.com/photo-1604908177522-040d7dca5c5c", category:"Maggie", isVeg:true },
{ id:"maggi-2", name:"Soupy Maggi", description:"Soup style maggi", price:70, image:"https://images.unsplash.com/photo-1604908177522-040d7dca5c5c", category:"Maggie", isVeg:true },
{ id:"maggi-3", name:"Masala Maggi", description:"Onion tomato masala", price:80, image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841", category:"Maggie", isVeg:true },
{ id:"maggi-4", name:"Cheese Maggi", description:"Cheesy maggi", price:90, image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0", category:"Maggie", isVeg:true },
{ id:"maggi-5", name:"Veg Maggi", description:"Loaded veg maggi", price:110, image:"https://images.unsplash.com/photo-1606756790138-261d2b21cd6d", category:"Maggie", isVeg:true },
{ id:"maggi-6", name:"Schezwan Maggi", description:"Spicy schezwan maggi", price:120, image:"https://images.unsplash.com/photo-1606756790138-261d2b21cd6d", category:"Maggie", isVeg:true },
{ id:"maggi-7", name:"Peri Peri Maggi", description:"Peri peri maggi", price:120, image:"https://images.unsplash.com/photo-1606756790138-261d2b21cd6d", category:"Maggie", isVeg:true },
{ id:"maggi-8", name:"Cheese Corn Maggi", description:"Corn cheese maggi", price:130, image:"https://images.unsplash.com/photo-1606756790138-261d2b21cd6d", category:"Maggie", isVeg:true },


// ================= SANDWICH =================
{
  id: "sandwich-1",
  name: "Aloo Sandwich",
  description: "Simple potato sandwich",
  price: 50,
  image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  category: "Sandwich",
  isVeg: true,
},
{
  id: "sandwich-2",
  name: "Jam Sandwich",
  description: "Sweet jam bread sandwich",
  price: 50,
  image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304",
  category: "Sandwich",
  isVeg: true,
},
{
  id: "sandwich-3",
  name: "Veg Cheese Sandwich",
  description: "Loaded veg cheese sandwich",
  priceHalf: 50,
  priceFull: 65,
  image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847",
  category: "Sandwich",
  isVeg: true,
},
{
  id: "sandwich-4",
  name: "Veg Cheese Schezwan Sandwich",
  description: "Spicy schezwan sandwich",
  priceHalf: 50,
  priceFull: 65,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Sandwich",
  isVeg: true,
},
{
  id: "sandwich-5",
  name: "Chocolate Sandwich",
  description: "Sweet chocolate sandwich",
  priceHalf: 60,
  priceFull: 80,
  image: "https://images.unsplash.com/photo-1589307004395-7b7a66d52c7b",
  category: "Sandwich",
  isVeg: true,
},

// ================= BURGER =================
{
  id: "burger-1",
  name: "Veggie Cheesy Burger",
  description: "Veg patty with cheese",
  priceHalf: 110,
  priceFull: 140,
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  category: "Burger",
  isVeg: true,
},
{
  id: "burger-2",
  name: "Fried Chicken Burger",
  description: "Crispy fried chicken burger",
  priceHalf: 120,
  priceFull: 150,
  image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd6d",
  category: "Burger",
  isVeg: false,
},

// ================= WRAP =================
{
  id: "wrap-1",
  name: "Veg Wrap",
  description: "Healthy veg wrap",
  price: 100,
  image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  category: "Wrap",
  isVeg: true,
},
{
  id: "wrap-2",
  name: "Paneer Tikka Roll",
  description: "Paneer tikka stuffed roll",
  price: 150,
  image: "https://images.unsplash.com/photo-1604908177522-040d7dca5c5c",
  category: "Wrap",
  isVeg: true,
},
{
  id: "wrap-3",
  name: "Chicken Bhuna Wrap",
  description: "Spicy chicken wrap",
  price: 150,
  image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd6d",
  category: "Wrap",
  isVeg: false,
},
{
  id: "wrap-4",
  name: "Chicken Kebab Roll",
  description: "Tandoori kebab roll",
  price: 160,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Wrap",
  isVeg: false,
},

// ================= PASTA =================
{
  id: "pasta-1",
  name: "Penne Alfredo Pasta",
  description: "Creamy white sauce pasta",
  price: 200,
  image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8d98",
  category: "Pasta",
  isVeg: true,
},
{
  id: "pasta-2",
  name: "Arrabbiata Pasta",
  description: "Spicy red sauce pasta",
  price: 200,
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
  category: "Pasta",
  isVeg: true,
},
{
  id: "pasta-3",
  name: "Pink Sauce Pasta",
  description: "Mix of white & red sauce",
  price: 200,
  image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9",
  category: "Pasta",
  isVeg: true,
},
{
  id: "pasta-4",
  name: "Chicken Alfredo Pasta",
  description: "Creamy chicken pasta",
  price: 250,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Pasta",
  isVeg: false,
},

// ================= THAI =================
{
  id: "thai-1",
  name: "Veg Thai Curry with Rice",
  description: "Authentic veg Thai curry",
  price: 200,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Thai",
  isVeg: true,
},
{
  id: "thai-2",
  name: "Chicken Thai Curry with Rice",
  description: "Chicken Thai curry combo",
  price: 240,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Thai",
  isVeg: false,
},

// ================= STARTER =================
{
  id: "starter-1",
  name: "Paneer Chilly",
  description: "Spicy paneer starter",
  price: 190,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Starter",
  isVeg: true,
},
{
  id: "starter-2",
  name: "Veg Manchurian Dry",
  description: "Crispy veg balls in sauce",
  price: 180,
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
  category: "Starter",
  isVeg: true,
},
{
  id: "starter-3",
  name: "Chicken Lollipop",
  description: "Crispy chicken lollipop",
  price: 200,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Starter",
  isVeg: false,
},
{
  id: "starter-4",
  name: "Chicken Chilly Dry",
  description: "Spicy dry chicken",
  price: 220,
  image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  category: "Starter",
  isVeg: false,
},
// ================= NOODLES =================
{
  id: "noodles-1",
  name: "Hakka Noodles",
  description: "Classic hakka noodles",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  category: "Noodles",
  isVeg: true,
},
{
  id: "noodles-2",
  name: "Schezwan Noodles",
  description: "Spicy schezwan noodles",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Noodles",
  isVeg: true,
},
{
  id: "noodles-3",
  name: "Burnt Garlic Noodles",
  description: "Garlic flavored noodles",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9",
  category: "Noodles",
  isVeg: true,
},
{
  id: "noodles-4",
  name: "Hong Kong Noodles",
  description: "Street style noodles",
  priceHalf: 140,
  priceFull: 250,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Noodles",
  isVeg: true,
},
{
  id: "noodles-5",
  name: "Chicken Hakka Noodles",
  description: "Chicken hakka noodles",
  priceHalf: 130,
  priceFull: 250,
  image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd6d",
  category: "Noodles",
  isVeg: false,
},

// ================= RICE =================
{
  id: "rice-1",
  name: "Fried Rice",
  description: "Veg fried rice",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Rice",
  isVeg: true,
},
{
  id: "rice-2",
  name: "Schezwan Rice",
  description: "Spicy rice",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Rice",
  isVeg: true,
},
{
  id: "rice-3",
  name: "Burnt Garlic Rice",
  description: "Garlic rice",
  priceHalf: 130,
  priceFull: 240,
  image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  category: "Rice",
  isVeg: true,
},
{
  id: "rice-4",
  name: "Chicken Fried Rice",
  description: "Chicken rice",
  priceHalf: 130,
  priceFull: 250,
  image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  category: "Rice",
  isVeg: false,
},

// ================= SOUP =================
{
  id: "soup-1",
  name: "Manchow Soup",
  description: "Hot & spicy soup",
  priceHalf: 80,
  priceFull: 140,
  image: "https://images.unsplash.com/photo-1547592180-85f173990554",
  category: "Soup",
  isVeg: true,
},
{
  id: "soup-2",
  name: "Sweet Corn Soup",
  description: "Creamy corn soup",
  priceHalf: 80,
  priceFull: 140,
  image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d",
  category: "Soup",
  isVeg: true,
},
{
  id: "soup-3",
  name: "Chicken Manchow Soup",
  description: "Chicken spicy soup",
  priceHalf: 90,
  priceFull: 150,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Soup",
  isVeg: false,
},

// ================= PIZZA =================
{
  id: "pizza-1",
  name: "Margherita Pizza",
  description: "Classic cheese pizza",
  priceHalf: 140,
  priceFull: 210,
  image: "https://images.unsplash.com/photo-1548365328-9f547fb0953d",
  category: "Pizza",
  isVeg: true,
},
{
  id: "pizza-2",
  name: "Cheese & Corn Pizza",
  description: "Sweet corn pizza",
  priceHalf: 150,
  priceFull: 230,
  image: "https://images.unsplash.com/photo-1601924638867-3ec2a6c6c1c4",
  category: "Pizza",
  isVeg: true,
},
{
  id: "pizza-3",
  name: "Paneer Tikka Pizza",
  description: "Paneer loaded pizza",
  priceHalf: 190,
  priceFull: 260,
  image: "https://images.unsplash.com/photo-1601924582975-7e2b0e91b82b",
  category: "Pizza",
  isVeg: true,
},
{
  id: "pizza-4",
  name: "Chicken Tikka Pizza",
  description: "Chicken tikka pizza",
  priceHalf: 190,
  priceFull: 270,
  image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  category: "Pizza",
  isVeg: false,
},

// ================= MOMOS =================
{
  id: "momos-1",
  name: "Veg Momos",
  description: "Steamed veg momos",
  priceHalf: 100,
  priceFull: 140,
  image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  category: "Momos",
  isVeg: true,
},
{
  id: "momos-2",
  name: "Veg Cheese Momos",
  description: "Cheesy veg momos",
  priceHalf: 120,
  priceFull: 160,
  image: "https://images.unsplash.com/photo-1604908176997-431d9b69b1c2",
  category: "Momos",
  isVeg: true,
},
{
  id: "momos-3",
  name: "Chicken Momos",
  description: "Chicken steamed momos",
  priceHalf: 120,
  priceFull: 160,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Momos",
  isVeg: false,
},

// ================= FRANKIE =================
{
  id: "frankie-1",
  name: "Veg Frankie",
  description: "Classic veg roll",
  price: 100,
  image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd6d",
  category: "Frankie",
  isVeg: true,
},
{
  id: "frankie-2",
  name: "Paneer Tikka Frankie",
  description: "Paneer roll",
  price: 150,
  image: "https://images.unsplash.com/photo-1604908177522-040d7dca5c5c",
  category: "Frankie",
  isVeg: true,
},
{
  id: "frankie-3",
  name: "Chicken Frankie",
  description: "Chicken roll",
  price: 150,
  image: "https://images.unsplash.com/photo-1617196034736-26c5f7c977ce",
  category: "Frankie",
  isVeg: false,
},

/* ================= CONTINUE ================= */
// (Remaining sections continue same pattern)

];