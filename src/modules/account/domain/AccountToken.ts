import * as bcrypt from "bcrypt-nodejs";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface Props {
    value?: string;
}

export class AccountToken extends ValueObject<Props> {
    private constructor(props: Props) {
        super(props);
    }

    get value(): string {
        return this.props.value!;
    }

    public static create(value?: string): Result<AccountToken> {
        let token: string;
        if (value) {
            token = value;
        } else {
            const timestamp = Date.now().toString();
            token = bcrypt.hashSync(timestamp);
        }

        const guardResult = Guard.againstAtLeast(5, token);
        if (guardResult.isFailure) {
            return Result.fail<AccountToken>(guardResult.getErrorValue());
        }

        return Result.ok<AccountToken>(new AccountToken({ value: token }));
    }
}
