import { AppError } from "../../../../../shared/core/AppError";
import { Either } from "../../../../../shared/core/Either";
import { Result } from "../../../../../shared/core/Result";
import { ActivateAccountErrors } from "./ActivateAccountErrors";

export type ActivateAccountResponse = Either<
    | ActivateAccountErrors.TokenExpired
    | ActivateAccountErrors.TokenNotFound
    | AppError.UnexpectedError,
    Result<void>
>;
