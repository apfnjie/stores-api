import * as bcrypt from "bcrypt-nodejs";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface UserTokenProps {
    value?: string;
}

export class UserToken extends ValueObject<UserTokenProps> {
    private constructor(props: UserTokenProps) {
        super(props);
    }

    get value(): string {
        return this.props.value!;
    }

    public static create(value?: string): Result<UserToken> {
        let token: string;
        if (value) {
            token = value;
        } else {
            const timestamp = Date.now().toString();
            token = bcrypt.hashSync(timestamp);
        }

        const guardResult = Guard.againstAtLeast(5, token);
        if (guardResult.isFailure) {
            return Result.fail<UserToken>(guardResult.getErrorValue());
        }

        return Result.ok<UserToken>(new UserToken({ value: token }));
    }
}
