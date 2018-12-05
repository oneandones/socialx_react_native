import * as React from 'react';
import {
	Animated,
	Clipboard,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from 'react-native';
import { connect } from 'react-redux';

import { CommentCard, HeartAnimation } from '../../';
import {
	CommentInput,
	Likes,
	PostText,
	TopComments,
	UserDetails,
	ViewAllComments,
	WallPostActions,
	WallPostMedia,
	WarnOffensiveContent,
} from './';

import {
	IWallPostEnhancedActions,
	IWallPostEnhancedData,
	WithWallPost,
} from '../../../enhancers/components/WithWallPost';
import {
	IWithDataShapeEnhancedProps,
	IWithLikingEnhancedActions,
	IWithLikingEnhancedData,
	IWithNavigationHandlersEnhancedActions,
	WithDataShape,
	WithLiking,
	WithNavigationHandlers,
} from '../../../enhancers/intermediary';

import { OS_TYPES } from '../../../environment/consts';
import { Sizes } from '../../../environment/theme';
import { IPost } from '../../../store/data/posts/Types';
import { IApplicationState, selectPost } from '../../../store/selectors';
import { IComment, INavigationProps } from '../../../types';
import { ReportProblemModal } from '../../modals/ReportProblemModal';

import styles, { SCREEN_WIDTH } from './WallPost.style';

interface IWallPostProps extends INavigationProps {
	postId: string;
	post: IPost;
	commentInput?: boolean;
	isCommentsScreen?: boolean;
	keyboardRaised?: boolean;
	onAddComment?: (cardHeight: number) => void;
}

type IProps = IWallPostProps &
	IWithDataShapeEnhancedProps &
	IWallPostEnhancedActions &
	IWallPostEnhancedData &
	IWithLikingEnhancedActions &
	IWithLikingEnhancedData &
	IWithNavigationHandlersEnhancedActions &
	INavigationProps;

interface IState {
	fullTextVisible: boolean;
	comment: string;
	commentInputFocused: boolean;
	commentInputWidth: Animated.Value;
	sendCommentIconPosition: Animated.Value;
	viewOffensiveContent: boolean;
	reportAProblem: boolean;
}

class Component extends React.Component<IProps, IState> {
	public state = {
		fullTextVisible: false,
		comment: '',
		commentInputFocused: false,
		commentInputWidth: new Animated.Value(SCREEN_WIDTH),
		sendCommentIconPosition: new Animated.Value(100),
		viewOffensiveContent: false,
		reportAProblem: false,
	};

	private keyboardDidHideListener: any;
	private containerViewRef: React.RefObject<View> = React.createRef();
	private scrollRef: React.RefObject<ScrollView> = React.createRef();

	public componentDidMount() {
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.state !== nextState ||
			this.props.postId !== nextProps.postId ||
			this.props.currentUser !== nextProps.currentUser ||
			this.props.shapedPost !== nextProps.shapedPost ||
			this.props.placeholderPost !== nextProps.placeholderPost ||
			this.props.heartAnimation !== nextProps.heartAnimation ||
			this.props.animationProgress !== nextProps.animationProgress
		);
	}

	public componentWillUnmount() {
		this.keyboardDidHideListener.remove();
	}

	public render() {
		const {
			shapedPost,
			placeholderPost,
			currentUser,
			commentInput,
			isCommentsScreen,
			keyboardRaised,
			animationProgress,
			heartAnimation,
			onLikePost,
			onDoubleTapLikePost,
			onViewLikes,
			onLikeComment,
			onViewComments,
			onViewImage,
			onViewUserProfile,
			onGoBack,
			getText,
			navigation,
		} = this.props;

		const isPlaceholderPost = placeholderPost && placeholderPost.postId === this.props.postId;

		const {
			postId,
			postText,
			location,
			taggedFriends,
			timestamp,
			owner,
			media,
			commentIds,
			likeIds,
			topCommentIds,
			likedByCurrentUser,
			numberOfSuperLikes,
			numberOfComments,
			numberOfWalletCoins,
			offensiveContent,
			creating,
		} = isPlaceholderPost ? placeholderPost! : shapedPost!;

		const {
			viewOffensiveContent,
			commentInputWidth,
			sendCommentIconPosition,
			fullTextVisible,
			comment,
			reportAProblem,
		} = this.state;

		const animationValues = {
			width: commentInputWidth,
			send: sendCommentIconPosition,
		};

		return (
			<View
				style={[styles.container, { opacity: creating ? 0.5 : 1 }]}
				ref={this.containerViewRef}
				// Measuring the element doesn't work on Android without this
				renderToHardwareTextureAndroid={true}
			>
				{isPlaceholderPost && <View style={styles.overlay} />}
				<UserDetails
					canBack={isCommentsScreen!}
					user={owner}
					timestamp={timestamp}
					taggedFriends={taggedFriends}
					location={location}
					onUserPress={onViewUserProfile}
					onShowOptions={this.onShowPostOptionsHandler}
					onGoBack={onGoBack}
					getText={getText}
				/>
				<ReportProblemModal
					visible={reportAProblem}
					confirmHandler={(subject, description) =>
						this.onReportAProblemHandler(true, subject, description)
					}
					declineHandler={() => this.onReportAProblemHandler(false)}
					getText={getText}
				/>
				{isCommentsScreen && (
					<React.Fragment>
						<ScrollView
							style={{ flex: 1 }}
							ref={this.scrollRef}
							onLayout={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
							onContentSizeChange={() =>
								this.scrollRef.current && this.scrollRef.current.scrollToEnd()
							}
						>
							<PostText
								text={postText}
								fullTextVisible={fullTextVisible}
								onShowFullText={this.onShowFullTextHandler}
								handleHashTag={() => undefined}
								handleUserTag={() => undefined}
								handleUrls={() => undefined}
								getText={getText}
							/>
							{media.length > 0 && (
								<View style={styles.media}>
									{heartAnimation && <HeartAnimation animationProgress={animationProgress} />}
									<WallPostMedia
										media={media}
										onMediaObjectView={(index: number) => onViewImage(media, index, postId)}
										onDoublePress={() => onDoubleTapLikePost(postId)}
										creating={creating}
										getText={getText}
									/>
								</View>
							)}
							<WallPostActions
								creating={creating}
								likedByCurrentUser={likedByCurrentUser}
								numberOfSuperLikes={numberOfSuperLikes}
								numberOfWalletCoins={numberOfWalletCoins}
								onLikePost={() => onLikePost(postId)}
								onCommentPress={() => onViewComments(postId, true)}
								onSuperLikePress={() => undefined}
								onWalletCoinsPress={() => undefined}
							/>
							{likeIds.length > 0 && (
								<Likes
									alias={likeIds[likeIds.length - 1]}
									total={likeIds.length}
									onUserPress={onViewUserProfile}
									onViewLikes={() => onViewLikes(likeIds)}
									getText={getText}
								/>
							)}
							{commentIds.length > 0 &&
								commentIds.map((id) => (
									<CommentCard
										key={id}
										commentId={id}
										alias={currentUser.userName}
										pub={currentUser.pub}
										onLikeComment={onLikeComment}
										onUserPress={onViewUserProfile}
										onShowOptionsMenu={this.onShowCommentOptionsHandler}
										navigation={navigation}
										getText={getText}
									/>
								))}
						</ScrollView>
						<KeyboardAvoidingView
							behavior="padding"
							keyboardVerticalOffset={50}
							enabled={Platform.OS === OS_TYPES.IOS}
						>
							<CommentInput
								comment={comment}
								autoFocus={keyboardRaised}
								onCommentInputChange={this.onCommentInputChangeHandler}
								onCommentInputPress={() => undefined}
								onSubmitComment={this.onSubmitCommentHandler}
								getText={getText}
							/>
						</KeyboardAvoidingView>
					</React.Fragment>
				)}
				{!isCommentsScreen && (
					<React.Fragment>
						<PostText
							text={postText}
							fullTextVisible={fullTextVisible}
							onShowFullText={this.onShowFullTextHandler}
							handleHashTag={() => undefined}
							handleUserTag={() => undefined}
							handleUrls={() => undefined}
							getText={getText}
						/>
						{media.length > 0 && (
							<View style={styles.media}>
								{heartAnimation && <HeartAnimation animationProgress={animationProgress} />}
								{(!offensiveContent || viewOffensiveContent) && (
									<WallPostMedia
										media={media}
										onMediaObjectView={(index: number) => onViewImage(media, index, postId)}
										onDoublePress={() => onDoubleTapLikePost(shapedPost!.postId)}
										creating={creating}
										getText={getText}
									/>
								)}
								<WarnOffensiveContent
									getText={getText}
									onShowOffensiveContent={this.onShowOffensiveContentHandler}
									visible={offensiveContent && !viewOffensiveContent}
								/>
							</View>
						)}
						<WallPostActions
							creating={creating}
							likedByCurrentUser={likedByCurrentUser}
							numberOfSuperLikes={numberOfSuperLikes}
							numberOfWalletCoins={numberOfWalletCoins}
							onLikePost={() => onLikePost(postId)}
							onCommentPress={() => onViewComments(postId, true)}
							onSuperLikePress={() => undefined}
							onWalletCoinsPress={() => undefined}
						/>
						{likeIds.length > 0 && (
							<Likes
								alias={likeIds[likeIds.length - 1]}
								total={likeIds.length}
								onUserPress={onViewUserProfile}
								onViewLikes={() => onViewLikes(likeIds)}
								getText={getText}
							/>
						)}
						<ViewAllComments
							numberOfComments={numberOfComments}
							onCommentPress={() => onViewComments(postId, false)}
							getText={getText}
						/>
						<TopComments
							commentIds={topCommentIds}
							onUserPress={onViewUserProfile}
							onCommentPress={() => onViewComments(postId, false)}
						/>
						{!!commentInput && !creating && (
							<CommentInput
								feed={true}
								comment={comment}
								avatar={currentUser.avatar}
								animationValues={animationValues}
								onCommentInputChange={this.onCommentInputChangeHandler}
								onCommentInputPress={this.onCommentInputPressHandler}
								onSubmitComment={this.onSubmitCommentHandler}
								getText={getText}
							/>
						)}
					</React.Fragment>
				)}
			</View>
		);
	}

	private keyboardDidHide = () => {
		const { commentInputFocused, commentInputWidth, sendCommentIconPosition } = this.state;

		if (commentInputFocused) {
			Animated.parallel([
				Animated.timing(commentInputWidth, {
					toValue: SCREEN_WIDTH,
					duration: 250,
				}),
				Animated.timing(sendCommentIconPosition, {
					toValue: 100,
					duration: 250,
				}),
			]).start();
			this.setState({ commentInputFocused: false });
		}
	};

	private onCommentInputPressHandler = () => {
		const { shapedPost, onAddComment } = this.props;
		const { commentInputFocused, commentInputWidth, sendCommentIconPosition } = this.state;

		if (shapedPost && !shapedPost.creating && this.containerViewRef.current) {
			this.containerViewRef.current.measure(
				(x: number, y: number, width: number, height: number) => {
					onAddComment!(height);
				},
			);

			if (!commentInputFocused) {
				Animated.parallel([
					Animated.timing(commentInputWidth, {
						toValue: SCREEN_WIDTH - Sizes.smartHorizontalScale(115),
						duration: 250,
					}),
					Animated.timing(sendCommentIconPosition, {
						toValue: 0,
						duration: 250,
					}),
				]).start();
				this.setState({ commentInputFocused: true });
			}
		}
	};

	private onCommentInputChangeHandler = (comment: string) => {
		if (this.props.shapedPost && !this.props.shapedPost.creating) {
			this.setState({ comment });
		}
	};

	private onShowOffensiveContentHandler = () => {
		this.setState({
			viewOffensiveContent: true,
		});
	};

	private onShowPostOptionsHandler = () => {
		const { getText, showOptionsMenu, shapedPost } = this.props;

		if (shapedPost) {
			const baseItems = [
				{
					label: getText('wall.post.menu.block.user'),
					icon: 'ios-close-circle',
					actionHandler: () => undefined,
				},
				{
					label: getText('wall.post.menu.report.problem'),
					icon: 'ios-warning',
					actionHandler: () => this.setState({ reportAProblem: true }),
				},
			];
			const deleteItem = {
				label: getText('wall.post.menu.delete.post'),
				icon: 'ios-trash',
				actionHandler: async () => {
					await this.props.onRemovePost(shapedPost.postId);
				},
			};

			const items = shapedPost.removable ? [...baseItems, deleteItem] : baseItems;
			showOptionsMenu(items);
		}
	};

	private onShowFullTextHandler = () => {
		this.setState({
			fullTextVisible: true,
		});
	};

	private onSubmitCommentHandler = () => {
		const { post, currentUser, onSubmitComment } = this.props;
		const escapedCommentText = this.state.comment.replace(/\n/g, '\\n');

		this.setState({ comment: '' }, Keyboard.dismiss);
		onSubmitComment(escapedCommentText, currentUser.userId, currentUser.pub, post.postId);
	};

	private onShowCommentOptionsHandler = (comment: IComment) => {
		const { post, showOptionsMenu, onRemoveComment, getText } = this.props;

		const menuItems = [
			{
				label: getText('comments.screen.advanced.menu.copy'),
				icon: 'ios-copy',
				actionHandler: () => Clipboard.setString(comment.text),
			},
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: () => onRemoveComment(comment.commentId, post.postId),
			},
		];

		showOptionsMenu(menuItems);
	};

	private onReportAProblemHandler = async (
		confirm: boolean,
		subject?: string,
		description?: string,
	) => {
		if (confirm && subject && description) {
			this.props.onReportProblem(subject, description);
		} else {
			this.setState({ reportAProblem: false });
		}
	};
}

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithWallPost>
		{(wallPost) => (
			<WithNavigationHandlers navigation={props.navigation}>
				{(nav) => (
					<WithDataShape post={props.post}>
						{({ shapedPost }) => (
							<WithLiking likedByCurrentUser={shapedPost ? shapedPost.likedByCurrentUser : false}>
								{(likes) => (
									<Component
										shapedPost={shapedPost}
										{...props}
										{...wallPost.data}
										{...wallPost.actions}
										{...likes.data}
										{...likes.actions}
										{...nav.actions}
									/>
								)}
							</WithLiking>
						)}
					</WithDataShape>
				)}
			</WithNavigationHandlers>
		)}
	</WithWallPost>
);

const mapStateToProps = (state: IApplicationState, props: IWallPostProps) => ({
	post: selectPost(state, props),
});

export const WallPost = connect(mapStateToProps)(EnhancedComponent as any) as any;
