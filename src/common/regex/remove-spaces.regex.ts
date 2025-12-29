import { RegexProtocol } from './regex.protocol';

export class RemoveSpacesRegex implements RegexProtocol {
  execute(value: string): string {
    return value.replace(/\s+/g, '');
  }
}
