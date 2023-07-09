import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSObjectContent } from 'microcms-js-sdk';

export type MicroCMSObjectData = MicroCMSObjectContent & Record<string, unknown>;
export type MicroCMSObjectFetch = MicroCMSObjectData;

export type MicroCMSListData = MicroCMSListContent;
export type MicroCMSListFetch = MicroCMSListResponse<unknown>;
