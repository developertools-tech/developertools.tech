[![Netlify Status](https://api.netlify.com/api/v1/badges/450fcc5c-7c10-4648-9b8e-e2a780345c66/deploy-status)](https://app.netlify.com/sites/developertools-tech/deploys)

# DeveloperTools.Tech

A collection of tools for developers.

## Want to Get Involved?

Take a look at the [Contributors' Guide](https://github.com/developertools-tech/developertools.tech/blob/main/CONTRIBUTING.md) to get started!

If you have any questions about contributing after reading the guide, please create an issue so it can be improved.

I'm also looking for co-maintainers, if you are interested please contact me via the contact form on [dlford.io](https://www.dlford.io).

## 🚀 Getting Started

### 💻 Setting up local environment
- Fork and checkout the repository locally
- Go to `developertools.tech` folder
- run `yarn install` to install the dependencies
- run `yarn dev` to start the application in development mode and visit `http://localhost:3000/` to see your application.

### 🐳 Docker
- You can easily build your application in a docker container and run it.
  ```sh
  docker build . -t developertoolstech
  docker run -p 3000:3000 developertoolstech
  ```
- Simply go to your favorite browser and visit `http://localhost:3000/` to see your application.

### 🐙 Docker compose
- In case you have docker installed, you can *single-click* deploy and test your changes by running the following and going to `http://localhost:3000/` on your browser.
  ```sh
  docker-compose up
  ```

## Contributors

<a href = "https://github.com/developertools-tech/developertools.tech/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=developertools-tech/developertools.tech&columns=6&anon=1"/>
</a>
