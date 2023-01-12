import { AppError } from "../../../../../shared/core/AppError";
import { Either } from "../../../../../shared/core/Either";
import { Result } from "../../../../../shared/core/Result";
import { CreateAccountErrors } from "./CreateAccountErrors";

export type CreateAccountResponse = Either<
    | CreateAccountErrors.AccountAlreadyExists
    | AppError.UnexpectedError
    | Result<any>,
    Result<void>
>;
