import { Router, type Request, type Response, type NextFunction } from "express";
import UserController from "./users.controller.js";

const userRoutes = Router()
// api/users/

const controller = new UserController();

// GET
// get user status
userRoutes.get('/status', (req: Request, res: Response, next: NextFunction) => {
	controller.LoginUserStatus(req, res, next);
})

// check username for user
userRoutes.get('/check', (req: Request, res: Response, next: NextFunction) => {
	let query = req.query
	console.log(query);
	controller.CheckForUserName(req, res, next);
})

// get user details
userRoutes.get('/id/:userId', (req: Request, res: Response, next: NextFunction) => {
	controller.getUserById(req, res, next);
});

// get user details by username
userRoutes.get('/username/:username', (req: Request, res: Response, next: NextFunction) => {
	controller.getUserByUsername(req, res, next);
});

// get user blogs
userRoutes.get('/:userId/blogs', (req: Request, res: Response, next: NextFunction) => {
	controller.getUserBlogs(req, res, next);
})

// POST
// signin user
userRoutes.post('/signin', (req: Request, res: Response, next: NextFunction) => {
	controller.signin(req, res, next);
});

// signout user
userRoutes.post('/signout', (req: Request, res: Response, next: NextFunction) => {
	controller.signout(req, res, next);
});

// signup user
userRoutes.post('/signup', (req: Request, res: Response, next: NextFunction) => {
	controller.signup(req, res, next);
})

// PUT
// update username
// userRoutes.put('/:userId', (req: Request, res: Response, next: NextFunction) => {
// 	controller.updateUsername(req, res, next);
// })
// update user details
userRoutes.put('/:userId/update', (req: Request, res: Response, next: NextFunction) => {
	if(req.body.newUsername){
		controller.updateUsername(req, res, next);
	}else{
		controller.updateUser(req, res, next);
	}
})
// update password
userRoutes.put('/:userId/password', (req: Request, res: Response, next: NextFunction) => {
	controller.updateUser(req, res, next);
})


// DELETE
// delete user
userRoutes.delete('/:username/', (req: Request, res: Response, next: NextFunction) => {
	controller.deleteUser(req, res, next);
})



export default userRoutes;