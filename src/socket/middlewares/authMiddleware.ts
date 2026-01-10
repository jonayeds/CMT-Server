import { ExtendedError, Socket } from "socket.io";
import { verifyJwt } from "../../app/utils/verifyJwt";
import config from "../../app/config";
import { User } from "../../app/modules/user/user.model";

export const socketAuth = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    let token = socket.handshake.auth.token;
    if (!token) {
      const err = new Error("You are not authorized!");
      return next(err);
    }
    const user = verifyJwt(token, config.jwt_access_secret as string);
    const isUserExist = await User.findById(user._id);
    if (!isUserExist) {
      new Error("User not found!");
    }
    socket.data.user = user;
    next();
  } catch (error) {
    next(error as ExtendedError);
  }
};
