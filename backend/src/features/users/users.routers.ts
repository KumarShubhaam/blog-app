import { Router, type Request, type Response, type NextFunction } from "express";
import UserController from "./users.controller.js";

const userRoutes = Router()

const controller = new UserController();

// GET
// signin user
userRoutes.get('/signin', (req: Request, res: Response, next: NextFunction) => {
	controller.signin(req, res, next);
});

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