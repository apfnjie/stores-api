import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface UserNameProps {
    value: string;
}

export class UserName extends ValueObject<UserNameProps> {
    public static readonly minLength: number = 3;
    private constructor(props: UserNameProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<UserName> {
        const atLeast = Guard.againstAtLeast(2, value);
        const notNullOrUndefined = Guard.againstNullOrUndefined(value, "name");
        const combine = Guard.combine([atLeast, notNullOrUndefined]);
        if (combine.isFailure) {
            return Result.fail<UserName>(combine.getErrorValue());
        }

        return Result.ok<UserName>(new UserName({ value }));
    }
}
