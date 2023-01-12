import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { TextUtil } from "../../../shared/util/TextUtil";

interface Props {
    value: string;
}

export class Email extends ValueObject<Props> {
    private constructor(props: Props) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<Email> {
        const isValidEmail = TextUtil.isValidEmail(value);
        if (!isValidEmail) {
            return Result.fail<Email>("Invalid email address.");
        }

        return Result.ok<Email>(new Email({ value }));
    }
}
