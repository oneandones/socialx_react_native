import { ICreatePostInput, IPostData } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export type IState = DeepReadonly<{
	posts: IPostData[];
	postMetaById: {
		[postId: string]: IPostData;
	};
	postMetasByUser: {
		[username: string]: IPostData;
	};
}>;

export interface IUsernameInput {
	username: string;
}

export interface IPostPathInput {
	postPath: string;
}

export interface IDateInput {
	date: Date;
}

export interface IPostIdInput {
	postId: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export const enum ActionTypes {
	GET_POST_PATHS_BY_USER = 'data/posts/GET_POST_PATHS_BY_USER',
	GET_POST_BY_PATH = 'data/posts/GET_POST_BY_PATH',
	GET_PUBLIC_POSTS_BY_DATE = 'data/posts/GET_PUBLIC_POSTS_BY_DATE',
	GET_POST_LIKES = 'data/posts/GET_POST_LIKES',
	CREATE_POST = 'data/posts/CREATE_POST',
	LIKE_POST = 'data/posts/LIKE_POST',
}

export interface IGetPostPathsByUserAction extends Action {
	type: ActionTypes.GET_POST_PATHS_BY_USER;
	payload: IUsernameInput;
}

export interface IGetPostByPathAction extends Action {
	type: ActionTypes.GET_POST_BY_PATH;
	payload: IPostPathInput;
}

export interface IGetPublicPostsByDateAction extends Action {
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE;
	payload: IDateInput;
}

export interface IGetPostLikesAction extends Action {
	type: ActionTypes.GET_POST_LIKES;
	payload: IPostIdInput;
}

export interface ICreatePostAction extends Action {
	type: ActionTypes.CREATE_POST;
	payload: ICreatePostInput;
}

export interface ILikePostAction extends Action {
	type: ActionTypes.LIKE_POST;
	payload: IPostIdInput;
}

export type IAction =
	| IGetPostPathsByUserAction
	| IGetPublicPostsByDateAction
	| IGetPostLikesAction
	| ICreatePostAction
	| ILikePostAction
	| IGetPostByPathAction;
