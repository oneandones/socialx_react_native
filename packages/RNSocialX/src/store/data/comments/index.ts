import { ICommentIdArgument, ICreateCommentInput } from './Types';

export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	ICommentData,
	ICommentIdArgument,
	ICreateCommentInput,
	IPostIdArgument,
} from './Types';
export {
	createComment,
	getCommentLikes,
	getPostComments,
	likeComment,
} from './actions';