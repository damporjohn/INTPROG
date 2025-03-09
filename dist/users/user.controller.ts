import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import validateRequest from "../../src/_middleware/validate-request";
import Role from "../_helpers/role";
import Joi from "joi";

const router = Router();
const userService = new UserService();

// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

export default router;

// Controller functions
async function getAll(req: Request, res: Response, next: NextFunction) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

async function getById(req: Request, res: Response, next: NextFunction) {
  userService
    .getById(Number(req.params.id))
    .then((user) => (user ? res.json(user) : res.status(404).json({ message: "User not found" })))
    .catch(next);
}

async function create(req: Request, res: Response, next: NextFunction) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "User created" }))
    .catch(next);
}

async function update(req: Request, res: Response, next: NextFunction) {
  userService
    .update(Number(req.params.id), req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(next);
}

async function _delete(req: Request, res: Response, next: NextFunction) {
  userService
    .delete(Number(req.params.id))
    .then(() => res.json({ message: "User deleted" }))
    .catch(next);
}

// Validation schemas
function createSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    role: Joi.string().valid(Role.Admin, Role.User).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).optional(),
  }).with("password", "confirmPassword");

  validateRequest(req, next, schema);
}
