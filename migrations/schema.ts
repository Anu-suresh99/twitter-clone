import { pgTable, foreignKey, unique, pgEnum, uuid, timestamp, text, uniqueIndex, boolean, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const bookmark = pgTable("bookmark", {
	id: uuid("id").primaryKey().notNull(),
	userid: uuid("userid").references(() => profiles.id, { onDelete: "cascade" } ),
	tweetid: uuid("tweetid").references(() => tweet.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		bookmarkUnique: unique("bookmark_unique").on(table.userid, table.tweetid),
	}
});

export const hashtag = pgTable("hashtag", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
});

export const like = pgTable("like", {
	id: uuid("id").primaryKey().notNull(),
	userid: uuid("userid").references(() => profiles.id, { onDelete: "cascade" } ),
	tweetid: uuid("tweetid").references(() => tweet.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
},
(table) => {
	return {
		likeUnique: unique("like_unique").on(table.userid, table.tweetid),
	}
});

export const reply = pgTable("reply", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text"),
	userid: uuid("userid").references(() => profiles.id, { onDelete: "cascade" } ),
	tweetid: uuid("tweetid").references(() => tweet.id, { onDelete: "cascade" } ),
	replyid: uuid("replyid"),
});

export const tweet = pgTable("tweet", {
	id: uuid("id").primaryKey().notNull(),
	text: text("text"),
	authorid: uuid("authorid"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
});

export const profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	username: text("username").notNull(),
	fullName: text("full_name"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	avatarUrl: text("avatar_url"),
},
(table) => {
	return {
		profilesUsernameKey: unique("profiles_username_key").on(table.username),
	}
});

export const bookmarks = pgTable("bookmarks", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id),
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userIdTweetIdIdx: uniqueIndex("bookmarks__user_id_tweet_id__idx").on(table.userId, table.tweetId),
	}
});

export const hashtags = pgTable("hashtags", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
});

export const likes = pgTable("likes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id),
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userIdTweetIdIdx: uniqueIndex("likes__user_id_tweet_id__idx").on(table.userId, table.tweetId),
	}
});

export const replies = pgTable("replies", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	text: text("text").notNull(),
	userId: uuid("user_id").notNull().references(() => profiles.id),
	tweetId: uuid("tweet_id").references(() => tweets.id),
	replyId: uuid("reply_id"),
},
(table) => {
	return {
		repliesReplyIdRepliesIdFk: foreignKey({
			columns: [table.replyId],
			foreignColumns: [table.id]
		}),
	}
});

export const tweets = pgTable("tweets", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	text: text("text").notNull(),
	profileId: uuid("profile_id").notNull().references(() => profiles.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	isReply: boolean("is_reply").default(false).notNull(),
	replyId: uuid("reply_id"),
},
(table) => {
	return {
		tweetsReplyIdTweetsIdFk: foreignKey({
			columns: [table.replyId],
			foreignColumns: [table.id]
		}),
	}
});

export const hashtagTweet = pgTable("hashtag_tweet", {
	tweetid: uuid("tweetid").notNull().references(() => tweet.id, { onDelete: "cascade" } ),
	hashtagid: uuid("hashtagid").notNull().references(() => hashtag.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		hashtagTweetPkey: primaryKey(table.tweetid, table.hashtagid)
	}
});

export const tweetHashtag = pgTable("tweet_hashtag", {
	tweetId: uuid("tweet_id").notNull().references(() => tweets.id),
	hashtagId: uuid("hashtag_id").notNull().references(() => hashtags.id),
},
(table) => {
	return {
		tweetHashtagTweetIdHashtagId: primaryKey(table.tweetId, table.hashtagId)
	}
});