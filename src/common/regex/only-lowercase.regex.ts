import { RegexProtocol } from './regex.protocol';

export class OnlyLowerCaseRegex implements RegexProtocol {
  execute(value: string): string {
    return value.toLowerCase();
  }
}
