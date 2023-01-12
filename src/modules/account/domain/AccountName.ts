import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface Props {
    value: string;
}

export class AccountName extends ValueObject<Props> {
    public static readonly minLength: number = 3;
    private constructor(props: Props) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<AccountName> {
        const atLeast = Guard.againstAtLeast(2, value);
        const notNullOrUndefined = Guard.againstNullOrUndefined(value, "name");
        const combine = Guard.combine([atLeast, notNullOrUndefined]);
        if (combine.isFailure) {
            return Result.fail<AccountName>(combine.getErrorValue());
        }

        return Result.ok<AccountName>(new AccountName({ value }));
    }
}
