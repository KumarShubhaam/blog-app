
import { error } from 'node:console';
import { AppError } from '../../middlewares/customError.middleware.js';
import UserModel, { type UserType, type UserInput } from './user.model.js';
import Log from '../../middlewares/logger.middleware.js';

const logger = new Log('UserRepository')

// CRUD OPERATIONS
class UserRepository {
  private default_fields_to_be_fetched: string
  constructor(){
    this.default_fields_to_be_fetched = 'name username email gender';
  }

  // CREATE
  async CreateUser(userObject: sanitizedUser) {
    console.log(userObject);
    let user = new UserModel(userObject);
    try {
      logger.info(`New user added to database: ${user}`);
      return await user.save();
    } catch (error) {
      // throw new AppError()
      console.log('Creation of user failed with error:', error)
      throw error;
    }
  }

  async CreateManyUser(arr: UserInput[]) {
    try {
      await UserModel.create(arr);
      logger.info('Added bulk users');
    } catch (error) {
      console.log('Error in adding bulk users array:', error);
      throw error;
    }
  }

  // READ
  async ReadUserById(id: string) {
    try {
      let user = await UserModel.findById(id, this.default_fields_to_be_fetched);
      if (user) {
        console.log('User found with id:', id);
        logger.info(`User found with id: ${id}`);
      } else {
        console.log('No user found with username:', id)
      }
      return user;
    } catch (error) {
      console.log('Error occured while searching for the user with ID:', id)
      throw error;
    }
  }

  async ReadUserByUsername(username: string, authPurpose: boolean = false) {
    let fieldToBeFetched = this.default_fields_to_be_fetched;
    try {
      if(authPurpose){
        fieldToBeFetched = 'username password'
      }
      let user;
      user = await UserModel.findOne({ username: username }, fieldToBeFetched)
      // if(password != ''){
      //   user = await UserModel.findOne({username: username, password: password})
      // }else{
      //   user = await UserModel.findOne({username: username})
      // }
      // if (user){
      //   console.log('User found with username:', username)
      // }else{
      //   console.log('No user found with username:', username)
      // }
      return user;
    } catch (error) {
      console.log('Error occured while searching for the user with username:', username);
      throw error;
    }
  }

  async ReadUserByCustomProperty(query: object) {
    if (query === null || typeof query !== 'object' || Array.isArray(query)) {
      throw new Error('Expecting a non-null plain object');
    }
    try {
      let users = await UserModel.find(query, this.default_fields_to_be_fetched);
      return users;
    } catch (error) {
      console.log(`Error while reading users using the query ${query}`);
      throw error;
    }
  }

  async ReadAllBlogsOfUser(id: string) {
    try {
      let blogs = await UserModel.findById(id, 'blogs').populate('blogs');
      // let blogs = await UserModel.findById(id, 'blogs');
      // console.log('blogs', blogs);
      return blogs;
    } catch (error) {
      throw error;
    }
  }

  async DocumentExist(query: object) {
    if (query === null || typeof query !== 'object' || Array.isArray(query)) {
      throw new Error('Expecting a non-null plain object');
    }
    try {
      return await UserModel.exists(query);
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  async UpdateUserDetailsById(id:string, userObject: sanitizedUser){
    try {
      let user = await UserModel.findById(id, this.default_fields_to_be_fetched);
      if(!user){
        throw new AppError(400, `User not found with id: ${id}`);
      }
      if(userObject.name){
        user.name.firstName = userObject.name.firstName;
        user.name.lastName = userObject.name.lastName;
      }
      if(userObject.email){
        user.email = userObject.email;
      }
      if(userObject.gender){
        user.gender = userObject.gender;
      }
      if(userObject.username){
        user.username = userObject.username;
      }
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  async DeleteUserById(id: String) {
    try {
      let deletedUser = await UserModel.findByIdAndDelete(id);
      if (deletedUser) {
        console.log("User deleted", deletedUser);
        return deletedUser;
      } else {
        console.log('No user found to delete with ID:', id)
        return null;
      }
    } catch (error) {
      console.log('Error occured while deleting user by id:', id);
      throw error;
    }
  }

  async DeleteUserByUsername(username: string) {
    try {
      let deletedUser = await UserModel.findOneAndDelete({ username: username });
      if (deletedUser) {
        console.log("User deleted", deletedUser);
        return deletedUser;
      } else {
        console.log('No user found to delete with username:', username);
        return null;
      }
    } catch (error) {
      console.log('Error occurred while deleting user by username:', username);
      throw error;
    }
  }


}


export default UserRepository;