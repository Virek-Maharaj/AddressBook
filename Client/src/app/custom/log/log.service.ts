import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';


const noop = (): any => undefined;
const fines = ['fine'];
const infos = fines.concat('info');
const warns = infos.concat('warn');
const errors = warns.concat('error');

@Injectable({providedIn: 'root'})
export class LogService {
  events: { type: 'info' | 'warn' | 'error', args: any[] }[] = [];

  // noinspection JSMethodCanBeStatic
  public get construct(): (...value: Array<any>) => any {
    if (environment.debug && fines.includes(environment.log)) {
      return console.count.bind(console);
    }
    return noop;
  }

  // noinspection JSMethodCanBeStatic
  public get info(): (...value: Array<any>) => any {
    if (environment.debug && infos.includes(environment.log)) {
      return console.log.bind(console);
    }
    return (...args): void => this.push('info', args);
  }

  // noinspection JSMethodCanBeStatic
  public get warn(): (...value: Array<any>) => any {
    if (environment.debug && warns.includes(environment.log)) {
      return console.warn.bind(console);
    }
    return (...args): void => this.push('warn', args);
  }

  // noinspection JSMethodCanBeStatic
  public get error(): (...value: Array<any>) => any {
    if (errors.includes(environment.log)) {
      return console.error.bind(console);
    }
    return (...args): void => this.push('error', args);
  }

  // noinspection JSMethodCanBeStatic
  public get always(): (...value: Array<any>) => any {
    return console.log.bind(console);
  }

  // noinspection JSMethodCanBeStatic
  public get group(): (group: string) => any {
    return console.group.bind(console);
  }

  // noinspection JSMethodCanBeStatic
  public get end(): () => any {
    return console.groupEnd.bind(console);
  }

  private push(type: 'info' | 'warn' | 'error', ...args: any[][]) {
    this.events.push({type, args});
    if (this.events.length > 20) {
      this.events.pop();
    }
  }
}
