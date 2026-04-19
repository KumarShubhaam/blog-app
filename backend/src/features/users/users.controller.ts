import type { Request, Response, NextFunction, RequestParamHandler } from "express";
import UserRepository from "./users.repository.js";
import Log from "../../middlewares/logger.middleware.js";
import { AppError } from "../../middlewares/customError.middleware.js";
import { Decrypt, Encrypt, isStrongPassword } from "../../utils.js";
// import type { UserInput } from "./user.model.js";
import { GenerateJWT, ValidateJWT } from "../../middlewares/auth.middleware.js";
import type { User, UserInput } from "@blog-app/shared";

class UserController {
  private repository: UserRepository;
  private logger: Log;

  constructor() {
    this.repository = new UserRepository();
    this.logger = new Log('UserController');
  }

  private capitalizeFirstLetter(str: string): string{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private async sanitizeUserInputObject(userObject: Partial<UserInput>) {
    
    const { name, username, password, email, gender } = userObject;
    let sanitizedUserInputObject: sanitizedUser = {}

    if (gender) {
      if(gender !== 'Male' && gender !== 'Female' && gender !== 'Other'){
        throw new AppError(403, 'Only genders allowed are Male, Female and Other');
      }else{
        sanitizedUserInputObject.gender = gender
      }
    }

    if (name) {
      if(!name?.firstName || !name?.lastName){
        throw new AppError(403, 'FirstName and LastName is required');
      }else{
        name.firstName = this.capitalizeFirstLetter(name.firstName);
        name.lastName = this.capitalizeFirstLetter(name.lastName);
        sanitizedUserInputObject.name = name
      }
    }

    if (email) {
      if(!email.includes('@')){
        throw new AppError(403, 'Valid email is required');
      }else{
        sanitizedUserInputObject.email = email
      }
    }

    if(username){
      sanitizedUserInputObject.username = username.toLowerCase();
    }

    if (password ) {
      if(isStrongPassword(password) == false){
        throw new AppError(403, 'Weak Password')
      }
      sanitizedUserInputObject.password = await Encrypt(password);
    }

    return sanitizedUserInputObject;
  }

  async CheckForUserName(req: Request, res: Response, next: NextFunction):Promise<Response<{available: boolean}> | void> {
    const { username } = req.query;
    try {
      const user = await this.repository.DocumentExist({username});
      if (user){
        return res.status(200).send({avaiable: false});
      }else{
        return res.status(200).send({available:true});
      }
    } catch (error) {
      next(error);
    }
  }

  async LoginUserStatus(req: Request, res: Response, next: NextFunction): Promise<Response<{authenticated: boolean, payload: object}>>{
    const token = req.cookies.token;
    try {
      const payload = ValidateJWT(token);
      if (payload){
        this.logger.info(`User status verified ${payload}`);
        return res.status(200).send({authenticated: true, payload})
      }else{
        this.logger.info(`User status not verified for token ${token}`);
        return res.status(200).send({authenticated:false, payload:null})
      }
    } catch (error) {
      throw new AppError(403, `Error occured due in verifying user status: ${error}`)
    }
  }

  // AUTHENTICATE USER OR SIGNIN
  async signin(req: Request, res: Response, next: NextFunction) {
    let { username, password } = req.body;
    try {
      let user = await this.repository.ReadUserByUsername(username, true);
      console.log('user', user);
      if (user) {
        if (await Decrypt(password, user.password)) {
          // generate token
          let payload = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            gender: user.gender,

          }
          const token = GenerateJWT(payload);
          this.logger.info(`Login Successful for user ${{id: user._id ,username: user.username, name: user.name, token: token}}`);
          res.cookie('token', token, { maxAge: 1000*60*60, httpOnly: true });
          return res.status(200).send({ msg: 'Login successful', user: {id: user._id ,username: user.username, name: user.name}});
        } else {
          throw new AppError(401, `Username and Password combination did not match`)
        }
      } else {
        throw new AppError(404, `User not found with username: ${username}.`);
      }
    } catch (error) {
      next(error);
    }
  }

  // Logout user
  async signout(req: Request, res: Response, next: NextFunction){
    try {
      res.clearCookie('token');
      return res.status(200).send({msg: 'Logout successful'});
    } catch (error) {
      let err = new AppError(403, `Unable to logout due to error ${error}`);
      next(err);
    }
  }

  // SIGN UP OR ADD USER
  async signup(req: Request, res: Response, next: NextFunction): Promise<Response<User> | void> {
    let { name, username, password, email, gender } = req.body;
    try {
      let userObject = await this.sanitizeUserInputObject({ name, username, password, email, gender })
      
      let newUser = await this.repository.CreateUser(userObject);
      if (newUser) {
        this.logger.info(`User signup: ${newUser}`);
        return res.status(201).send({id: newUser._id, name: newUser.name, username: newUser.username, email: newUser.email, gender: newUser.gender, createdAt: newUser.createdAt, updatedAt: newUser.updatedAt });
      }
    } catch (error) {
      console.log('Could not create user');
      next(error);
    }
  }

  // GET SINGLE USER
  async getUserById(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.userId
    try {
      if(typeof userId !== 'string'){
        this.logger.info(`Wrong userId type provided for user ${userId}`)
        throw new AppError(403, 'Userid is needed as string');
      }
      let user = await this.repository.ReadUserById(userId);
      if (!user){
        throw new AppError(404, `No user found with ID: ${userId}`)
      }
      return res.status(200).send({msg: `User found`, user: user});
    } catch (error) {
      next(error);
    }
  }

  // get user details by username
  async getUserByUsername(req: Request, res: Response, next: NextFunction) {
    let username = req.params.username
    try {
      if(typeof username !== 'string'){
        this.logger.info(`Wrong username type provided for user ${username}`)
        throw new AppError(403, 'username is needed as string');
      }
      let userDetails = await this.repository.ReadUserByUsername(username);
      if(!userDetails){
        throw new AppError(404, `No user found with the username: ${username}`);
      }
      return res.status(200).send({msg:'successful', user: userDetails});
    } catch (error) {
      next(error);
    }
  }

  // get user blogs
  async getUserBlogs(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.userId;
    try {
      // verify user id
      let isUser = await this.repository.DocumentExist({ _id: userId });
      if(!isUser){
        throw new AppError(404, `No user found while looking for blogs for userId: ${userId}`)
      }
      if(typeof userId != 'string'){
        throw new AppError(403, `Wrong type of userId, expected string got ${typeof userId}`);
      }
      let blogs = await this.repository.ReadAllBlogsOfUser(userId);
      // console.log('blogs', blogs);
      return res.status(200).send({id: userId, blogs: blogs})
    } catch (error) {
      next(error);
    }
  }

  // update username
  async updateUsername(req: Request, res: Response, next: NextFunction) {
    let { newUsername:username } = req.body;
    let userId = req.params.userId;
    try {
      let isUser = await this.repository.DocumentExist({ username: username });
      if(isUser){
        throw new AppError(403, `Username already exists`);
      }
      let user = await this.repository.ReadUserById(String(userId));
      if(!user){
        throw new AppError(404, `No user exists with the userId: ${userId}`)
      }
      user.username = username;
      console.log(typeof user, user);
      let updatedUser = await this.repository.UpdateUserDetailsById(String(user._id), user);
      return res.status(201).send({msg:`Updated username`, user: updatedUser});
    } catch (error) {
      next(error);
    }
  }


  // UPDATE USER DETAILS
  async updateUser(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.userId;
    let { name, password, email, gender } = req.body;
    try {
      if (typeof userId !== 'string'){
        throw new AppError(403, `UserId of type string is required`);
      }
      let userObject = await this.sanitizeUserInputObject({name, password, email, gender});

      let user = await this.repository.UpdateUserDetailsById(userId, userObject);
      return res.status(201).send({msg:`Updated user details`, user: user});
    } catch (error) {
      next(error);
    }
  }

  // DELETE USER
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    // let userId = req.params.userId;
    let username = req.params.username;
    try {
      if(typeof username !== 'string'){
        this.logger.info(`Wrong username type provided for user ${username}`)
        throw new AppError(403, 'Userid is needed as string');
      }

      // let deletedUser = await this.repository.DeleteUserById(username);
      let deletedUser = await this.repository.DeleteUserByUsername(username);
      if(!deletedUser){
        this.logger.info(`Could not find user for deletion/Error occured while deleting user: ${username}`)
        throw new AppError(404, `Could not delete user ${username}`);
      }
      this.logger.info(`Successfully deleted user: ${deletedUser}`)
      return res.status(201).send({msg: `User deleted for username: ${username}`, deltedUser: deletedUser});
    } catch (error) {
      this.logger.info(`Error occured while deleting user: ${username}, error: ${error}`)
      next(error);
    }
  }

}



export default UserController;