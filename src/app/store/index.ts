import { StorageKey } from '@ngxs/storage-plugin/internals';
import { UserState } from './user.state';
import {
  LOCAL_STORAGE_ENGINE,
  SESSION_STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { EmployeeState } from './employee.state';

export enum enStateNames {
  AppUserState = 'userState',
  AppEmployeeState = 'employeeState',
}

export const appStates = [UserState, EmployeeState];

export const storageSettings: StorageKey[] = [
  {
    key: enStateNames.AppUserState,
    engine: SESSION_STORAGE_ENGINE,
  },
  {
    key: enStateNames.AppEmployeeState,
    engine: LOCAL_STORAGE_ENGINE,
  },
];
