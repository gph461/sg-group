import { DartBuilder } from './builder';

export class EnumValueBuilder implements DartBuilder {
  private _name: string;
  private _value: string;

  public name(name: string): this {
    this._name = name;
    return this;
  }

  public value(value: string): this {
    this._value = value;
    return this;
  }

  public build(): string {
    if (!this._name) {
      throw new Error('Enum value does not have a name!');
    }

    return `${this._value ? `@JsonValue(r"${this._value}")\n` : ''}${
      this._name
    }`;
  }
}

export class EnumBuilder implements DartBuilder {
  private _name: string;
  private _values: EnumValueBuilder[] = [];

  public name(name: string): this {
    this._name = name;
    return this;
  }

  public value(value: EnumValueBuilder): this {
    this._values.push(value);
    return this;
  }

  public values(values: EnumValueBuilder[]): this {
    this._values = [...this._values, ...values];
    return this;
  }

  build(): string {
    if (!this._name) {
      throw new Error('Enum does not have a name!');
    }

    return `enum ${this._name} {
        ${this._values.map((v) => v.build()).join(',\n')}
      }`;
  }
}
