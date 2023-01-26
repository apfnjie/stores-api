import * as bcrypt from "bcrypt-nodejs";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface Props {
    token?: string;
    expiry?: Date;
}

export class EmailVerificationToken extends ValueObject<Props> {
    private static tokenLifeSpan = 6;

    private constructor(props: Props) {
        super(props);
    }

    get token(): string | undefined {
        return this.props.token;
    }

    get expiryDate(): Date | undefined {
        return this.props.expiry;
    }

    get tokenIsExpired(): boolean {
        const now = new Date();
        return now > this.props.expiry!;
    }

    public static create(props: Props): Result<EmailVerificationToken> {
        if (props.token) {
            try {
                const properties: Props = JSON.parse(props.token);
                return Result.ok<EmailVerificationToken>(
                    new EmailVerificationToken(props)
                );
            } catch (error) {
                return Result.fail<EmailVerificationToken>(
                    "Invalid email verification token"
                );
            }
        } else {
            const token = bcrypt.hashSync(Date.now().toString());
            const expires = new Date();
            expires.setHours(expires.getHours() + this.tokenLifeSpan);

            return Result.ok<EmailVerificationToken>(
                new EmailVerificationToken({ token, expiry: expires })
            );
        }
    }
}
