import * as bcrypt from "bcrypt-nodejs";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";

export interface Props {
    value: string;
    hashed?: boolean;
}

export class Password extends ValueObject<Props> {
    public static minLength: number = 6;

    get value(): string {
        return this.props.value;
    }

    private constructor(props: Props) {
        super(props);
    }

    private static isAppropriateLength(password: string): boolean {
        return password.length >= this.minLength;
    }

    /**
     * @method comparePassword
     * @desc Compares as plain-text and hashed password.
     */

    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        let hashed: string;
        if (this.isAlreadyHashed()) {
            hashed = this.props.value;
            return this.bcryptCompare(plainTextPassword, hashed);
        } else {
            return this.props.value === plainTextPassword;
        }
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err) return resolve(false);
                return resolve(compareResult);
            });
        });
    }

    public isAlreadyHashed(): boolean {
        return this.props.hashed!;
    }

    private hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, "", null, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    }

    public getHashedValue(): Promise<string> {
        return new Promise((resolve) => {
            if (this.isAlreadyHashed()) {
                return resolve(this.props.value);
            } else {
                return resolve(this.hashPassword(this.props.value));
            }
        });
    }

    public static create(props: Props): Result<Password> {
        const propsResult = Guard.againstNullOrUndefined(
            props.value,
            "password"
        );

        if (propsResult.isFailure) {
            return Result.fail<Password>(propsResult.getErrorValue());
        } else {
            if (!props.hashed) {
                if (!this.isAppropriateLength(props.value)) {
                    return Result.fail<Password>(
                        `Password doesnt meet criteria [${this.minLength} chars min].`
                    );
                }
            }

            return Result.ok<Password>(
                new Password({
                    value: props.value,
                    hashed: !!props.hashed === true,
                })
            );
        }
    }
}
