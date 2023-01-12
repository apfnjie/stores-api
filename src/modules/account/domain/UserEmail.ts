import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { TextUtil } from "../../../shared/util/TextUtil";

interface UserEmailProps {
    value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
    private constructor(props: UserEmailProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<UserEmail> {
        const isValidEmail = TextUtil.isValidEmail(value);
        if (!isValidEmail) {
            return Result.fail<UserEmail>("Invalid email address.");
        }

        return Result.ok<UserEmail>(new UserEmail({ value }));
    }
}
