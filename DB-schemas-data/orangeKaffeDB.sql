--
-- File generated with SQLiteStudio v3.4.17 on mar. oct. 21 21:46:58 2025
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: categories
DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
    category_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT    NOT NULL
);

INSERT INTO categories (
                           category_id,
                           category_name
                       )
                       VALUES (
                           1,
                           'Cakes/Pastries'
                       );

INSERT INTO categories (
                           category_id,
                           category_name
                       )
                       VALUES (
                           2,
                           'Hot Drinks'
                       );

INSERT INTO categories (
                           category_id,
                           category_name
                       )
                       VALUES (
                           3,
                           'Cold Drinks'
                       );

INSERT INTO categories (
                           category_id,
                           category_name
                       )
                       VALUES (
                           4,
                           'Desserts/Sweets'
                       );

INSERT INTO categories (
                           category_id,
                           category_name
                       )
                       VALUES (
                           5,
                           'Specialty Items'
                       );


-- Table: coffeeshops
DROP TABLE IF EXISTS coffeeshops;

CREATE TABLE IF NOT EXISTS coffeeshops (
    coffeshop_id  INTEGER PRIMARY KEY AUTOINCREMENT
                          NOT NULL,
    shop_name     TEXT,
    shop_location TEXT,
    page_url      TEXT
);

INSERT INTO coffeeshops (
                            coffeshop_id,
                            shop_name,
                            shop_location,
                            page_url
                        )
                        VALUES (
                            1,
                            'Café Rio',
                            'Gjuterigatan 3C, 553 18 Jönköping',
                            'https://www.jonkopingsstudentkar.se/studentinfo/rio.html'
                        );

INSERT INTO coffeeshops (
                            coffeshop_id,
                            shop_name,
                            shop_location,
                            page_url
                        )
                        VALUES (
                            2,
                            'Espresso House',
                            'Järnvägsgatan 12, 553 15 Jönköping',
                            'https://espressohouse.com/'
                        );

INSERT INTO coffeeshops (
                            coffeshop_id,
                            shop_name,
                            shop_location,
                            page_url
                        )
                        VALUES (
                            3,
                            'FinduZz Catcafe',
                            'Nygatan 15, 553 16 Jönköping',
                            'https://www.finduzzcatcafe.se/'
                        );

INSERT INTO coffeeshops (
                            coffeshop_id,
                            shop_name,
                            shop_location,
                            page_url
                        )
                        VALUES (
                            4,
                            'Café Dallucci',
                            'Gjuterigatan 5, 553 18 Jönköping',
                            'https://maps.app.goo.gl/DtCsKgwT6qwYNQnN6'
                        );

INSERT INTO coffeeshops (
                            coffeshop_id,
                            shop_name,
                            shop_location,
                            page_url
                        )
                        VALUES (
                            5,
                            'STUK - Cafe Jönköping',
                            'Lantmätargränd 3, 553 20 Jönköping',
                            'https://www.stukjonkoping.se/'
                        );


-- Table: recipes
DROP TABLE IF EXISTS recipes;

CREATE TABLE IF NOT EXISTS recipes (
    recipe_id    INTEGER PRIMARY KEY AUTOINCREMENT
                         UNIQUE
                         NOT NULL,
    title        TEXT,
    description  TEXT,
    ingredients  TEXT,
    instructions TEXT,
    credits      TEXT,
    img_url      TEXT,
    category_id  INTEGER REFERENCES categories (category_id),
    FOREIGN KEY (
        category_id
    )
    REFERENCES categories (category_id) 
);

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        1,
                        'Iced Caramel Latte',
                        'Description: A smooth, refreshing espresso-based drink blended with creamy milk and sweet caramel syrup. Perfect for warm days when customers want a cool caffeine boost.',
                        'Ingredients/Recipe: 1 shot of espresso (or 1/4 cup strong brewed coffee); 1 cup cold milk; 2 tbsp caramel syrup (plus extra for drizzle); Ice cubes.',
                        'Instructions: Brew espresso and let it cool slightly. Fill a glass with ice. Pour in the milk, espresso, and caramel syrup. Stir gently and drizzle extra caramel on top.',
                        'Adam Murdok',
                        'https://images.unsplash.com/photo-1566656117208-c23e67f4ce8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1233',
                        3
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        2,
                        'Chocolate Mousse Cup',
                        'Description: A rich, velvety chocolate dessert that’s light yet indulgent — ideal for pairing with coffee or tea. Served in small glass cups for a café-style presentation.',
                        'Ingredients/Recipe: 200 g dark chocolate (70%); 3 large eggs (separated); 2 tbsp sugar; 1 cup heavy cream; A pinch of salt.',
                        'Instructions: Melt the chocolate and let it cool slightly. Whip the cream until soft peaks form. Beat the egg whites with sugar and salt until fluffy. Mix the yolks into the chocolate, then fold in the whipped cream and egg whites gently. Chill for at least 2 hours before serving.',
                        'Peter Parker',
                        '',
                        4
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        3,
                        'Strawberry Cheesecake Smoothie',
                        'Description: A creamy, sweet, and tangy smoothie that tastes just like a slice of strawberry cheesecake. A great non-caffeinated option for customers craving dessert in a glass.',
                        'Ingredients/Recipe: 1 cup fresh or frozen strawberries; 1/2 cup cream cheese; 1/2 cup milk; 1/2 cup vanilla yogurt; 1 tbsp honey or sugar; Ice cubes (optional).',
                        'Instructions: Melt the chocolate and let it cool slightly. Whip the cream until soft peaks form. Beat the egg whites with sugar and salt until fluffy. Mix the yolks into the chocolate, then fold in the whipped cream and egg whites gently. Chill for at least 2 hours before serving.',
                        'Nia Tepelin',
                        'https://images.unsplash.com/photo-1662130187270-a4d52c700eb6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1102',
                        3
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        6,
                        'Matcha Affogato',
                        'A modern twist on the classic Italian dessert — creamy vanilla ice cream “drowned” in warm matcha for a beautiful balance between bitter and sweet.',
                        'Matcha powder – 1 tsp. Hot water – 1/4 cup. Vanilla ice cream – 1 scoop. Honey or condensed milk – optional',
                        'Whisk matcha powder with hot water until fully dissolved and frothy. Place a scoop of vanilla ice cream in a glass.  Pour the hot matcha over it. Drizzle with honey or condensed milk if desired.',
                        'Joseph Joestar',
                        'https://media.istockphoto.com/id/1898099406/sv/foto/homemade-affogato.jpg?s=2048x2048&w=is&k=20&c=D-6bPGTvja5uIXjH0yAt2KWigqoEak_5UxzZ_ho1qmQ=',
                        2
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        7,
                        'Mocha Brownie Bites',
                        'Bite-sized brownies infused with espresso and chocolate — dense, fudgy, and perfect for pairing with any hot drink.',
                        'Butter – 100 g (melted). Sugar – 3/4 cup. Eggs – 2. All-purpose flour – 1/2 cup. Cocoa powder – 1/4 cup. Instant espresso powder – 1 tbsp. Dark chocolate chips – 1/2 cup',
                        'Preheat oven to 180°C (350°F). Mix melted butter, sugar, and eggs in a bowl. Add flour, cocoa powder, and espresso powder. Stir in chocolate chips. Pour into a greased baking tray and bake for 15–20 minutes. Cool, then cut into bite-sized pieces.',
                        'Haru Urara',
                        NULL,
                        1
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        8,
                        'Vanilla Chai Latte',
                        'A cozy and aromatic blend of black tea, milk, and warming spices like cinnamon and cardamom. Perfect for cold mornings.',
                        'Black tea – 1 bag or 1 tsp loose leaf; Milk – 1 cup; Water – 1/2 cup; Honey – 1 tbsp; Ground cinnamon – 1/4 tsp; Ground cardamom – 1/4 tsp; Ground ginger – a pinch.',
                        'Boil the water and steep the black tea for 3–5 minutes. In a small pot, heat the milk with cinnamon, cardamom, and ginger until warm. Remove the tea bag, combine the spiced milk with tea, and sweeten with honey before serving hot.',
                        'Tony Stark',
                        '',
                        2
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        9,
                        'Blueberry Muffins',
                        'Soft, moist muffins filled with juicy blueberries — a classic café treat to enjoy with coffee or tea.',
                        'All-purpose flour – 2 cups; Sugar – 3/4 cup; Baking powder – 2 tsp; Salt – 1/4 tsp; Milk – 1/2 cup; Eggs – 2; Butter – 1/2 cup (melted); Fresh or frozen blueberries – 1 cup.',
                        'Preheat oven to 190°C (375°F). In a bowl, mix flour, sugar, baking powder, and salt. In another bowl, whisk milk, eggs, and melted butter. Combine both mixtures and gently fold in blueberries. Pour batter into muffin cups and bake for 20–25 minutes until golden.',
                        'Gold Ship',
                        '',
                        1
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        10,
                        'Lemon Tart',
                        'A buttery crust filled with tangy and smooth lemon cream, offering the perfect balance of sweet and sour flavors.',
                        'Pre-baked tart shell – 1; Sugar – 1 cup; Eggs – 3; Lemon juice – 1/2 cup; Lemon zest – 1 tbsp; Butter – 1/4 cup (softened).',
                        'Preheat oven to 180°C (350°F). Whisk together sugar, eggs, lemon juice, and zest. Add softened butter and mix until smooth. Pour mixture into the tart shell and bake for 25 minutes or until set. Cool completely before serving.',
                        'Tv Nauta',
                        '',
                        4
                    );

INSERT INTO recipes (
                        recipe_id,
                        title,
                        description,
                        ingredients,
                        instructions,
                        credits,
                        img_url,
                        category_id
                    )
                    VALUES (
                        11,
                        'Iced Matcha Latte',
                        'A refreshing Japanese-inspired drink made with matcha green tea, milk, and a touch of sweetness. Perfect for a light afternoon refreshment.',
                        'Matcha powder – 1 tsp; Hot water – 1/4 cup; Cold milk – 3/4 cup; Ice cubes – 1/2 cup; Honey or syrup – 1 tbsp.
',
                        'Whisk matcha powder with hot water until dissolved and frothy. Fill a glass with ice, pour in cold milk, and then the matcha mixture. Sweeten with honey or syrup and stir before serving.',
                        'MF DOOM',
                        '',
                        1
                    );


-- Table: users
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id  INTEGER PRIMARY KEY AUTOINCREMENT
                     UNIQUE
                     NOT NULL,
    username TEXT    NOT NULL,
    password TEXT    NOT NULL
);

INSERT INTO users (
                      user_id,
                      username,
                      password
                  )
                  VALUES (
                      1,
                      'admin',
                      'wdf#2025'
                  );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
