import {
	IAccountData,
	IChangePasswordInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { clearGunAuth, setGunAuth } from '../../auth/gun';
import { removeUploadedFiles, setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { setGlobal } from '../../ui/globals';
import { hookNotifications } from '../notifications';
import { loadMorePosts } from '../posts';
import { getCurrentFriends, getCurrentProfile } from '../profiles';
import {
	ActionTypes,
	IChangePasswordAction,
	ICreateAccountAction,
	ICreateAccountInput,
	IGetAccountByPubAction,
	IGetCurrentAccountAction,
	ILoginAction,
	ILogoutAction,
	IRecoverAccountAction,
	ISyncGetAccountByPubAction,
	ISyncGetCurrentAccountAction,
} from './Types';

const getCurrentAccountAction: ActionCreator<IGetCurrentAccountAction> = () => ({
	type: ActionTypes.GET_CURRENT_ACCOUNT,
});

const syncGetCurrentAccountAction: ActionCreator<ISyncGetCurrentAccountAction> = (
	account: IAccountData,
) => ({
	type: ActionTypes.SYNC_GET_CURRENT_ACCOUNT,
	payload: account,
});

export const getCurrentAccount = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getCurrentAccountAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi, bugsnag } = context;
		const account = await dataApi.accounts.getCurrentAccount();

		dispatch(syncGetCurrentAccountAction(account));
		await dispatch(setGunAuth({ alias: account.alias, pub: account.pub }));
		await dispatch(getCurrentProfile(true));

		// if (bugsnag) {
		// 	bugsnag.setUser(account.pub, account.alias, account.profile[account.alias].email);
		// 	const accounts: any = { ...getState().data.accounts.accounts };
		// 	bugsnag.notify(new Error('this is a test error from this user'), (notify) => {
		// 		notify.metadata = {
		// 			testError: {
		// 				id: activityId,
		// 				where: 'store.data.accounts.actions.getCurrentAccount()',
		// 				what: 'account is not persent',
		// 				context: 'something went wrong while doing stuff',
		// 				line: 1337,
		// 			},
		// 			reduxStore: {
		// 				accounts,
		// 			},
		// 		};
		// 	});
		// }
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const createAccountAction: ActionCreator<ICreateAccountAction> = (
	createAccountInput: ICreateAccountInput,
) => ({
	type: ActionTypes.CREATE_ACCOUNT,
	payload: createAccountInput,
});

export const createAccount = (createAccountInput: ICreateAccountInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();

	try {
		dispatch(createAccountAction(createAccountInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.CREATE_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi, storageApi } = context;

		const { avatar, ...createAccountRest } = createAccountInput;
		if (avatar.uri.length > 0) {
			const bootstrapStatus = async (uploadIdStarted: string) => {
				await dispatch(
					setUploadStatus({
						path: avatar.uri,
						uploadId: uploadIdStarted,
						progress: 0,
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const updateStatus = async ({
				uploadId: uploadIdUpdated,
				progress,
			}: any & { uploadId: string }) => {
				await dispatch(
					setUploadStatus({
						uploadId: uploadIdUpdated,
						progress,
						path: avatar.uri,
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const { Hash: hash } = await storageApi.uploadFile(
				avatar.uri,
				// ? TODO: should we also pass in the extension here? (jpeg/png)
				'image/jpeg',
				bootstrapStatus,
				updateStatus,
			);

			await dispatch(
				setUploadStatus({
					uploadId: '',
					progress: 100,
					path: avatar.uri,
					aborting: false,
					done: true,
					hash,
				}),
			);

			const createAccountFinal = {
				...createAccountRest,
				avatar: hash,
			};
			await dataApi.accounts.createAccount(createAccountFinal);
		} else {
			const createAccountFinal = {
				...createAccountRest,
				avatar: '',
			};

			await dataApi.accounts.createAccount(createAccountFinal);
		}
		await dispatch(setGunAuth({ password: createAccountInput.password }));
		await dispatch(getCurrentAccount());
		dispatch(hookNotifications());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.CREATE_ACCOUNT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
		await dispatch(removeUploadedFiles());
	}
};

const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountActionInput: IRecoverAccountInput,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountActionInput,
});

export const recoverAccount = (recoverAccountInput: IRecoverAccountInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	try {
		dispatch(recoverAccountAction(recoverAccountInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.RECOVER_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const recoveryData = await dataApi.accounts.recoverAccount(recoverAccountInput);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.RECOVER_ACCOUNT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const loginAction: ActionCreator<ILoginAction> = (credentials: ICredentials) => ({
	type: ActionTypes.LOGIN,
	payload: credentials,
});

export const login = (credentials: ICredentials): IThunk => async (dispatch, getState, context) => {
	const store = getState();
	const auth = store.auth.database.gun;
	const activityId = uuid();

	try {
		dispatch(loginAction(credentials));
		await dispatch(
			beginActivity({
				type: ActionTypes.LOGIN,
				uuid: activityId,
			}),
		);
		await context.dataApi.accounts.login(credentials);
		await dispatch(
			setGunAuth({
				password: credentials.password,
				alias: credentials.username,
			}),
		);
		dispatch(setGlobal({ accountLoaded: true }));
		dispatch(getCurrentAccount());
		dispatch(getCurrentFriends(true));
		dispatch(loadMorePosts(true));
		await dispatch(endActivity({ uuid: activityId }));
		// debounce hook
		dispatch(hookNotifications());
	} catch (e) {
		if (auth && auth.alias && auth.password) {
			console.log('login failed with', e);
			if (auth.alias.length > 0 && auth.password.length > 0) {
				console.log('retrying');
				await dispatch(login(credentials));
				return;
			} else {
				await dispatch(
					setError({
						type: ActionTypes.LOGIN,
						error: e.message,
						uuid: uuid(),
					}),
				);
			}
		} else {
			await dispatch(
				setError({
					type: ActionTypes.LOGIN,
					error: e.message,
					uuid: uuid(),
				}),
			);
		}
	}
};

const logoutAction: ActionCreator<ILogoutAction> = () => ({
	type: ActionTypes.LOGOUT,
});

export const logout = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const storeState = getState();
	const auth = storeState.auth.database.gun;

	if (auth && auth.alias) {
		try {
			dispatch(logoutAction());
			await dispatch(
				beginActivity({
					type: ActionTypes.LOGOUT,
					uuid: activityId,
				}),
			);
			context.dataApi.accounts.logout();
			await dispatch(clearGunAuth());
			context.dataApi.hooks.unhookNotifications();
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.LOGOUT,
					error: e.message,
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const changePasswordAction: ActionCreator<IChangePasswordAction> = (
	changePasswordInput: IChangePasswordInput,
) => ({
	type: ActionTypes.CHANGE_PASSWORD,
	payload: changePasswordInput,
});

export const changePassword = (changePasswordInput: IChangePasswordInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(changePasswordAction(changePasswordInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CHANGE_PASSWORD,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.accounts.changePassword(changePasswordInput);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.CHANGE_PASSWORD,
					error: e.message,
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const getAccountByPubAction: ActionCreator<IGetAccountByPubAction> = (
	getAccountByPubInput: IGetAccountByPubInput,
) => ({
	type: ActionTypes.GET_ACCOUNT_BY_PUB,
	payload: getAccountByPubInput,
});

const syncGetAccountByPubAction: ActionCreator<ISyncGetAccountByPubAction> = (
	account: IAccountData,
) => ({
	type: ActionTypes.SYNC_GET_ACCOUNT_BY_PUB,
	payload: account,
});

export const getAccountByPub = (getAccountByPubInput: IGetAccountByPubInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	try {
		dispatch(getAccountByPubAction(getAccountByPubInput));
		await dispatch(beginActivity({ type: ActionTypes.GET_ACCOUNT_BY_PUB, uuid: activityId }));
		const { dataApi } = context;
		const account = await dataApi.accounts.getAccountByPub(getAccountByPubInput);
		dispatch(syncGetAccountByPubAction(account));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_ACCOUNT_BY_PUB,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
