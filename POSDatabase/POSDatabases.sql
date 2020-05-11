CREATE DATABASE [CategoryDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'CategoryDB', FILENAME = N'C:\AzureT\POSSystem\POSDatabase\SqlData\CategoryDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'CategoryDB_log', FILENAME = N'C:\AzureT\POSSystem\POSDatabase\SqlData\CategoryDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
CREATE DATABASE [ProductDB]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'ProductDB', FILENAME = N'C:\AzureT\POSSystem\POSDatabase\SqlData\ProductDB.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'ProductDB_log', FILENAME = N'C:\AzureT\POSSystem\POSDatabase\SqlData\ProductDB_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO