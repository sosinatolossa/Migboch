USE [master]
GO
IF db_id('01_Db_Create.sql') IS NULL
  CREATE DATABASE [01_Db_Create.sql]
GO
USE [01_Db_Create.sql]
GO

DROP TABLE IF EXISTS [HabeshaFood];
DROP TABLE IF EXISTS [FavoriteFood];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Type];

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

ALTER TABLE [FavoriteFood] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [FavoriteFood] ADD FOREIGN KEY ([HabeshaFoodId]) REFERENCES [HabeshaFood] ([Id])
GO

ALTER TABLE [HabeshaFood] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [HabeshaFood] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
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
  ([Id], [TypeId], [Picture], [Name], [Description], [Ingredient], [TotalCalorie], [TotalFat], [Cholesterol], [Sodium], [TotalCarbohydrate], [Protein], [Calcium], [Iron], [Potassium], [UserId])
VALUES 
  (1, 2, 'https://images.app.goo.gl/5DmzVQ74Dbp4PrK29', 'Kitfo', 'Kitfo (Amharic: ክትፎ, IPA: [kɨtfo]), sometimes spelled ketfo, is a traditional dish found in Eritrean and Ethiopian cuisine.', 'minced raw beef, marinated in mitmita (a chili powder-based spice blend) and niter kibbeh (a clarified butter infused with herbs and spices', 271, 21, 78, 346, 1, 24, null, null, null, 3);

INSERT INTO  [HabeshaFood]
  ([Id], [TypeId], [Picture], [Name], [Description], [Ingredient], [TotalCalorie], [TotalFat], [Cholesterol], [Sodium], [TotalCarbohydrate], [Protein], [Calcium], [Iron], [Potassium], [UserId])
VALUES 
  (2, 3, 'https://images.app.goo.gl/5DmzVQ74Dbp4PrK29', 'Kitfo', 'Kitfo (Amharic: ክትፎ, IPA: [kɨtfo]), sometimes spelled ketfo, is a traditional dish found in Eritrean and Ethiopian cuisine.', 'minced raw beef, marinated in mitmita (a chili powder-based spice blend) and niter kibbeh (a clarified butter infused with herbs and spices', 271, 21, 78, 346, 1, 24, null, null, null, 1);
  
SET IdENTITY_INSERT [HabeshaFood] OFF


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


