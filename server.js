const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { instrument } = require("@socket.io/admin-ui");

const mainRouter = express.Router();
const port = process.env.PORT || 3000;
const StateManagerUser = require("./statemanagement/stateUser");

const firebaseConfig = require("./config/firebase.config.js");
const { initializeApp } = require("firebase/app");

initializeApp(firebaseConfig);

/* Connect To Database */
const database = require("./database/database");
database();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://admin.socket.io",
    ],
    credentials: true,
  })
);

/* Routers */
const authRouter = require("./routes/auth.router.js");
const userRouter = require("./routes/user.router.js");

/* Repositories */
const AuthRepository = require("./repositories/auth.repository.js");
const UserRepository = require("./repositories/user.repository.js");

/* Controllers */
const AuthController = require("./controller/auth.controller.js");
const UserController = require("./controller/user.controller.js");

/* Middlewares */
const AuthMiddleware = require("./middlewares/auth.middleware.js");
// const PaginationMiddleware = require("./middlewares/pagination.middleware");
// const MulterMiddleware = require("./middlewares/multer.middleware");
// const errorMiddleware = require("./middlewares/error.middleware.js");

/* Repositories Instances */
const authRepository = new AuthRepository();
const userRepository = new UserRepository();

/* Controllers Instances */
const authController = new AuthController(authRepository);
const stateManager = new StateManagerUser();
const userController = new UserController(
  userRepository,
  authRepository,
  stateManager
);
/** */
/* Middlewares Instances */
const authMiddleware = new AuthMiddleware(authRepository);
// const paginationMiddleware = new PaginationMiddleware();
// const multerMiddleware = new MulterMiddleware();

/* --------------------- */
mainRouter.use("/user", userRouter(userController, authMiddleware));
mainRouter.use("/authentication", authRouter(authController, authMiddleware));

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
