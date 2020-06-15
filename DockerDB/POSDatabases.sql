CREATE DATABASE [UserDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'[UserDB]', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\UserDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'[UserDB]_log', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\UserDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
CREATE DATABASE [BrandDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'BrandDB', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\BrandDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'BrandDB_log', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\BrandDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
CREATE DATABASE [CategoryDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'CategoryDB', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\CategoryDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'CategoryDB_log', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\CategoryDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
CREATE DATABASE [SubCategoryDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'SubCategoryDB', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\SubCategoryDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'SubCategoryDB_log', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\SubCategoryDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
CREATE DATABASE [ProductDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'ProductDB', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\ProductDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'ProductDB_log', FILENAME = N'C:\JavaAndDocker\POSDatabase\SqlData\ProductDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
