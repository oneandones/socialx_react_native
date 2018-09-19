import {Image as PickerImage} from 'react-native-image-crop-picker';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {AccountCurrencyData} from './components';

export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL: string;
}

export enum SearchResultKind {
	Friend = 'FRIEND',
	NotFriend = 'NOT_FRIEND',
	FriendRequestSent = 'FRIEND_REQUEST_SENT',
	Group = 'group',
}

export type getTextSignature = (value: string, ...args: any[]) => string;

export interface ITranslatedProps {
	getText: getTextSignature;
}

export interface IResizeProps {
	marginBottom: number;
	// safeRunAfterKeyboardHide: (handler: () => void) => void;
}

export interface IConfirmationModalProps {
	title?: string;
	message?: string;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler?: () => void;
	declineHandler?: () => void;
}

export interface IConfirmActions {
	showConfirm: (confirmationOptions: IConfirmationModalProps) => void;
	hideConfirm: () => void;
}

// Media types

export interface MediaTypes {
	key: string;
	name: string;
	category: string;
}

export const MediaTypeImage: MediaTypes = {
	key: 'image',
	name: 'Photo',
	category: 'Photography',
};

export const MediaTypeVideo: MediaTypes = {
	key: 'video',
	name: 'Video',
	category: 'Videos',
};

export interface GridMediaObject {
	url: string;
	type: MediaTypes;
	index: number;
}

// END Media types

export interface IMediaProps {
	url: string;
	hash: string;
	type: MediaTypes;
	extension: string;
	size: number;
	numberOfLikes: number;
	numberOfComments: number;
}

export interface ISimpleComment {
	id: string;
	text: string;
	likes: ILike[];
	owner: {
		userId: string;
		userName: string;
	};
}

export interface IPostOwner {
	userId: string;
	fullName: string;
	avatarURL: string;
}

export interface IWallPostComment {
	id: string;
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
		id: string;
	};
	timestamp: Date;
	numberOfLikes: number;
	likes: ILike[];
	likedByMe: boolean;
	replies: IWallPostComment[];
}

export enum CommentsSortingOptions {
	Likes = 'Likes',
	Recent = 'Recent',
}

export interface WallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath?: string;
	type: string;
	pathx: string;
}

export interface ILike {
	userId: string;
	userName: string;
}

export interface ISuggestionCardItem {
	userId: string;
	name: string;
	userName: string;
	avatarURL: string;
	friend: boolean;
}

interface ISimpleWallPostCardProps {
	id: string;
	postText: false | string;
	location: false | string;
	taggedFriends: Array<{fullName: string}>;
	timestamp: Date;
	owner: IPostOwner;
	currentUser: ICurrentUser;
}

export interface IWallPostCardProps extends ISimpleWallPostCardProps, ITranslatedProps, IResizeProps {
	governanceVersion: boolean;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	onImagePress: (index: number) => void;
	onLikeButtonPress: () => void;
	onDeletePress: (postId: string) => void;
	onUserPress: (userId: string) => void;
	onCommentPress: (startComment: boolean) => void;
	onAddComment: (height: number) => void;
	likedByMe: boolean;
	canDelete: boolean;
	media: IMediaProps[];
	likes: ILike[];
	bestComments: ISimpleComment[];
	listLoading: boolean;
	suggested: undefined | ISuggestionCardItem[];
	noInput: boolean;
}

// =====================================================
// ENHANCER DATA TYPES
// =====================================================

export interface ICurrentUser {
	userId: string;
	avatarURL: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfViews: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostCardProps[];
}

export interface IVisitedUser {
	userId: string;
	avatarURL: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfViews: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostCardProps[];
	relationship: SearchResultKind;
}

export interface ICryptoStats {
	coins: number;
	contribution: number;
	returnPercentage: number;
	digitalCoins: AccountCurrencyData[];
}

export interface INavigationProps<SP, SC> {
	navigation: NavigationScreenProp<SP>;
	navigationOptions?: NavigationScreenConfig<SC>;
}

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 * 2. safeRunAfterKeyboardHide should be handled different way!
 */
