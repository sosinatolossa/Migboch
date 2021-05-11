USE [master]
GO
IF db_id('YeMigbeKeeper') IS NULL
  CREATE DATABASE [YeMigbeKeeper]
GO
USE [YeMigbeKeeper]
GO

DROP TABLE IF EXISTS [Recipe];
DROP TABLE IF EXISTS [FavoriteFood];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [HabeshaFood];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FireBaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [HabeshaFood] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [TypeId] integer NOT NULL,
  [Picture] nvarchar(255) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Rating] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Ingredient] nvarchar(255) NOT NULL,
  [TotalCalorie] integer,
  [TotalFat] integer,
  [Cholesterol] integer,
  [Sodium] integer,
  [TotalCarbohydrate] integer,
  [Protein] integer,
  [Calcium] integer,
  [Iron] integer,
  [Potassium] integer,
  [UserId] integer NOT NULL
)
GO

CREATE TABLE [FavoriteFood] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [UserId] integer NOT NULL,
  [HabeshaFoodId] integer NOT NULL
)
GO

CREATE TABLE [Type] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [HabeshaFoodId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [Subject] nvarchar(255) NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [CreateDateTime] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Recipe] (
  [Id] integer Identity PRIMARY KEY NOT NULL,
  [HabeshaFoodId] integer NOT NULL,
  [TheRecipe] nvarchar(255) NOT NULL,
  [HelpfulLink] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [FavoriteFood] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [FavoriteFood] ADD FOREIGN KEY ([HabeshaFoodId]) REFERENCES [HabeshaFood] ([Id])
GO

ALTER TABLE [HabeshaFood] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [HabeshaFood] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([HabeshaFoodId]) REFERENCES [HabeshaFood] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Recipe] ADD FOREIGN KEY ([HabeshaFoodId]) REFERENCES [HabeshaFood] ([Id])
GO

SET IdENTITY_INSERT [User] ON
INSERT INTO  [User]
  ([Id], [FirstName], [LastName], [DisplayName], [Email], [FireBaseUserId])
VALUES 
  (1, 'Sosina', 'Tolossa', 'sosi_meets_foodie', 'sosina@yahoo.com','EKeVTf2zmDRtUD7E2yQA7v6643k2');
INSERT INTO  [User]
  ([Id], [FirstName], [LastName], [DisplayName], [Email], [FireBaseUserId])
VALUES
  (2, 'Isaiah', 'Kebede', 'zay_came_4zFood', 'isaiah@isaiah.com','OS46cNQisETUYcu2L6thD4kWKBm1');
INSERT INTO  [User]
  ([Id], [FirstName], [LastName], [DisplayName], [Email], [FireBaseUserId])
VALUES
  (3, 'Saron', 'Challa', 'sari_w_kitfo', 'saron@saron.com','ejmyJcqhTIgDQMLGQN971qVafZo1');
SET IdENTITY_INSERT [User] OFF

SET IdENTITY_INSERT [Type] ON
INSERT INTO  [Type]
  ([Id], [Name])
VALUES 
  (1, 'Breakfast');

INSERT INTO  [Type]
  ([Id], [Name])
VALUES 
  (2, 'Lunch');
INSERT INTO  [Type]
  ([Id], [Name])
VALUES 
  (3, 'Dinner');
INSERT INTO  [Type]
  ([Id], [Name])
VALUES 
  (4, 'Snack');
INSERT INTO  [Type]
  ([Id], [Name])
VALUES 
  (5, 'Dessert');
SET IdENTITY_INSERT [Type] OFF

SET IdENTITY_INSERT [HabeshaFood] ON
INSERT INTO  [HabeshaFood]
  ([Id], [TypeId], [Picture], [Name], [Rating], [Description], [Ingredient], [TotalCalorie], [TotalFat], [Cholesterol], [Sodium], [TotalCarbohydrate], [Protein], [Calcium], [Iron], [Potassium], [UserId])
VALUES 
  (1, 2, 'https://images.app.goo.gl/5DmzVQ74Dbp4PrK29', 'Kitfo', 4, 'Kitfo (Amharic: ክትፎ, IPA: [kɨtfo]), sometimes spelled ketfo, is a traditional dish found in Eritrean and Ethiopian cuisine.', 'minced raw beef, marinated in mitmita (a chili powder-based spice blend) and niter kibbeh (a clarified butter infused with herbs and spices', 271, 21, 78, 346, 1, 24, null, null, null, 3);

INSERT INTO  [HabeshaFood]
  ([Id], [TypeId], [Picture], [Name], [Rating], [Description], [Ingredient], [TotalCalorie], [TotalFat], [Cholesterol], [Sodium], [TotalCarbohydrate], [Protein], [Calcium], [Iron], [Potassium], [UserId])
VALUES 
  (2, 3, 'https://images.app.goo.gl/5DmzVQ74Dbp4PrK29', 'Kitfo', 3, 'Kitfo (Amharic: ክትፎ, IPA: [kɨtfo]), sometimes spelled ketfo, is a traditional dish found in Eritrean and Ethiopian cuisine.', 'minced raw beef, marinated in mitmita (a chili powder-based spice blend) and niter kibbeh (a clarified butter infused with herbs and spices', 271, 21, 78, 346, 1, 24, null, null, null, 1);
  
SET IdENTITY_INSERT [HabeshaFood] OFF

SET IdENTITY_INSERT [Comment] ON
INSERT INTO  [Comment]
  ([Id], [HabeshaFoodId], [UserId], [Subject], [Content], [CreateDateTime])
VALUES 
  (1, 2, 2, 'spicy', 'This food was delicious but it was very spicy', '5/19/2020 12:00:00 AM');

INSERT INTO  [Comment]
  ([Id], [HabeshaFoodId], [UserId], [Subject], [Content], [CreateDateTime])
VALUES 
  (2, 1, 1, 'soft', 'The injera was very soft', '6/2/2020 12:00:00 AM');

SET IdENTITY_INSERT [Comment] OFF


SET IdENTITY_INSERT [FavoriteFood] ON
INSERT INTO  [FavoriteFood]
  ([Id], [UserId], [HabeshaFoodId])
VALUES 
  (1, 1, 1);

INSERT INTO  [FavoriteFood]
  ([Id], [UserId], [HabeshaFoodId])
VALUES 
  (2, 2, 2);

SET IdENTITY_INSERT [FavoriteFood] OFF


SET IdENTITY_INSERT [Recipe] ON
INSERT INTO  [Recipe]
  ([Id], [HabeshaFoodId], [TheRecipe], [HelpfulLink])
VALUES 
  (1, 2, 'Add this and add this..', 'https://youtu.be/-8ne697R3oI');

INSERT INTO  [Recipe]
  ([Id], [HabeshaFoodId], [TheRecipe], [HelpfulLink])
VALUES 
  (2, 1, 'Add this and add this..', 'https://youtu.be/-8ne697R3oI');

SET IdENTITY_INSERT [Recipe] OFF

