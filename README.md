# Lottery App

A simple lottery application that allows users to configure the number of participants and prizes, draw winners, and reset the lottery pool.

## Features
- Configure total participants and prize distribution.
- Draw winners randomly.
- Display remaining prizes dynamically.
- Persist lottery state using `localStorage`.
- Reset the lottery pool to default settings.
- Deployable via Docker and Vercel.

## Deployment

### Docker Deployment
1. Build the Docker image:
   ```sh
   docker build -t lottery-app .
   ```
2. Run the container:
   ```sh
   docker run -p 8080:80 lottery-app
   ```
3. Access the application at `http://localhost:8080`.

### Docker Compose Deployment
1. Run the application using Docker Compose:
   ```sh
   docker-compose up -d
   ```
2. Access the application at `http://localhost:8080`.

### Vercel Deployment
Click the button below to deploy to Vercel:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/A1exMinatoooo/lottery-app)

## TODO List
- [ ] Improve UI/UX for better user experience.
- [ ] Add sound effects for drawing results.
- [ ] Implement user authentication for managing multiple lotteries.
- [ ] Support exporting and importing lottery configurations.
