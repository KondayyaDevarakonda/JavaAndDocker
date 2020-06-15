#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat 

FROM microsoft/dotnet:sdk AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:sdk AS build
WORKDIR /src
COPY ["subcategory-api.csproj", ""]
RUN dotnet restore "./subcategory-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "subcategory-api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "subcategory-api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "subcategory-api.dll"]