#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM microsoft/dotnet:sdk AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:sdk AS build
WORKDIR /src
COPY ["subcategoryapi.csproj", ""]
RUN dotnet restore "./subcategoryapi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "subcategoryapi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "subcategoryapi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "subcategoryapi.dll"]