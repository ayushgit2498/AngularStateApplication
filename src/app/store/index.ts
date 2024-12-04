import { StorageKey } from '@ngxs/storage-plugin/internals';
import { UserState } from './user.state';
import {
  LOCAL_STORAGE_ENGINE,
  SESSION_STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { EmployeeState } from './employee.state';
import { AuthenticateUserState } from './authenticate-user.state';

export enum enStateNames {
  AppUserState = 'userState',
  AppEmployeeState = 'employeeState',
  AuthenticateUserState = 'authenticateUserState',
}

export const appStates = [UserState, EmployeeState, AuthenticateUserState];

export const storageSettings: StorageKey[] = [
  {
    key: enStateNames.AuthenticateUserState,
    engine: LOCAL_STORAGE_ENGINE,
  },
  {
    key: enStateNames.AppUserState,
    engine: SESSION_STORAGE_ENGINE,
  },
  {
    key: enStateNames.AppEmployeeState,
    engine: SESSION_STORAGE_ENGINE,
  },
];
