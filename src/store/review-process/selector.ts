import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Review } from '../../types/review';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Review].isReviewsLoading;
export const getReviewSentStatus = (state: State): boolean | undefined => state[NameSpace.Review].isReviewSent;
export const getReviewSendingStatus = (state: State): boolean => state[NameSpace.Review].isReviewSending;
