CREATE TABLE Category (
    CategoryId int IDENTITY(1,1) NOT NULL,
    CategoryCode varchar(10) NOT NULL,
    CategoryName varchar(255) NOT NULL,
	IsActive bit NOT NULL DEFAULT 1,
    CreatedBy int NOT NULL,
	CreatedDate datetime NOT NULL
    CONSTRAINT PK_Category PRIMARY KEY (CategoryCode)
);

INSERT INTO Category(CategoryCode,CategoryName,CreatedBy,CreatedDate) VALUES('TECH','Technology',1,GETDATE())
INSERT INTO Category(CategoryCode,CategoryName,CreatedBy,CreatedDate) VALUES('HOFR','Home & Furniture',1,GETDATE())
select * from Category
CREATE TABLE SubCategory (
    SubCategoryId int IDENTITY(1,1) NOT NULL,
    SubCategoryCode varchar(10) NOT NULL,
    SubCategoryName varchar(255) NOT NULL,
	CategoryId int NOT NULL,
	IsActive bit NOT NULL DEFAULT 1,
    CreatedBy int NOT NULL,
	CreatedDate datetime NOT NULL
    CONSTRAINT PK_SubCategory PRIMARY KEY (SubCategoryCode)
);

INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId,CreatedBy,CreatedDate) VALUES('PHON','Phones',1,1,GETDATE())
INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId, CreatedBy,CreatedDate) VALUES('TV','Televisions',1,1,GETDATE())
INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId,CreatedBy,CreatedDate) VALUES('PRIN','Printers & Home Office',1,1,GETDATE())
INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId, CreatedBy,CreatedDate) VALUES('LAPC','Laptops & PCs',1,1,GETDATE())

INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId, CreatedBy,CreatedDate) VALUES('FURN','Furniture',2,1,GETDATE())
INSERT INTO SubCategory(SubCategoryCode,SubCategoryName,CategoryId, CreatedBy,CreatedDate) VALUES('COOK','Cookware',2,1,GETDATE())

select * from SubCategory order by SubCategoryId
drop table Brands
CREATE TABLE Brands (
	BrandId INT IDENTITY (1, 1) NOT NULL,
	BrandName VARCHAR (255) NOT NULL,
	IsActive bit NOT NULL DEFAULT 1,
    CreatedBy int NOT NULL,
	CreatedDate datetime NOT NULL
    CONSTRAINT PK_Brand PRIMARY KEY (BrandId)
);

INSERT INTO Brands(BrandName,CreatedBy,CreatedDate) VALUES('Samsung',1,GETDATE())
INSERT INTO Brands(BrandName,CreatedBy,CreatedDate) VALUES('Apple',1,GETDATE())
INSERT INTO Brands(BrandName,CreatedBy,CreatedDate) VALUES('HP',1,GETDATE())
INSERT INTO Brands(BrandName,CreatedBy,CreatedDate) VALUES('Argos',1,GETDATE())
INSERT INTO Brands(BrandName,CreatedBy,CreatedDate) VALUES('Ikea',1,GETDATE())

drop table Products
CREATE TABLE Products (
	ProductId INT IDENTITY (1, 1) NOT NULL,
	ProductName VARCHAR (255) NOT NULL,
	CategoryId INT NOT NULL,
	SubCategoryId INT NOT NULL,
	BrandId INT NOT NULL,
	ModleYear SMALLINT NOT NULL,
	ListPrice DECIMAL (10, 2) NOT NULL,
	IsActive bit NOT NULL DEFAULT 1,
    CreatedBy int NOT NULL,
	CreatedDate datetime NOT NULL
    CONSTRAINT PK_Product PRIMARY KEY (ProductId)
);

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Samsung A20',1,1,1,2016,379.99,1,GETDATE())
INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Samsung A30',1,1,1,2017,479.99,1,GETDATE())
INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('IPhone X',1,1,2,2017,479.99,1,GETDATE())

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Samsung Curve',1,2,1,2017,479.99,1,GETDATE())

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('HP Printer',1,3,3,2017,479.99,1,GETDATE())

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('HP Laptop',1,4,3,2017,479.99,1,GETDATE())

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Chairs',2,5,4,2017,479.99,1,GETDATE())
INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Chairs',2,5,5,2017,479.99,1,GETDATE())

INSERT INTO Products(ProductName, CategoryId, SubCategoryId, BrandId, ModleYear, ListPrice, CreatedBy, CreatedDate) 
VALUES('Cooker',2,6,4,2017,479.99,1,GETDATE())