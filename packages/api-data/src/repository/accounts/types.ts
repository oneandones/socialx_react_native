import { IProfileCallbackData, IProfileData } from '../profiles';

export interface IAccountData {
	alias: string;
	auth: {
		ek: string;
		s: string;
	};
	epub: string;
	pub: string;
	trust?: {
		[key: string]: {
			[key: string]: string;
		};
	};
	recover?: {
		encryptedReminder: string;
		question1: number;
		question2: number;
	};
	profile: {
		[alias: string]: IProfileData;
	};
}

export interface IGetAccountByPubInput {
	publicKey: string;
}

export interface ICredentials {
	username: string;
	password: string;
}

export interface IRecoverData<T> {
	recover: {
		question1: T;
		question2: T;
		reminder: string;
		encryptedReminder?: string;
	};
}

export interface IRecoverAccountInput {
	username: string;
	question1: string;
	question2: string;
}

export interface IChangePasswordInput {
	oldPassword: string;
	newPassword: string;
}

export interface ICreateAccountInput extends IRecoverData<string>, ICredentials {
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
}
