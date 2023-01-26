import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/BaseController";
import { TextUtil } from "../../../../../shared/util/TextUtil";
import { ActivateAccountErrors } from "./ActivateAccountErrors";
import { ActivateAccountRequest } from "./ActivateAccountRequest";
import { ActivateAccountUseCase } from "./ActivateAccountUseCase";

export class ActivateAccountController extends BaseController {
    private _useCase: ActivateAccountUseCase;

    constructor(useCase: ActivateAccountUseCase) {
        super();
        this._useCase = useCase;
    }

    protected async executeImpl(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Promise<any> {
        let dto: ActivateAccountRequest;

        if (!req.query.token) {
            return this.fail(res, "Token is required");
        }

        dto = {
            token: TextUtil.sanitize(req.query.token.toString()),
        };

        try {
            const result = await this._useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case ActivateAccountErrors.TokenNotFound:
                        return this.fail(res, "Token is invalid");
                    case ActivateAccountErrors.AccountAlreadyVerified:
                        return this.fail(res, "Account is already verified");
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res);
            }
        } catch (error: any) {
            return this.fail(res, error);
        }
    }
}
