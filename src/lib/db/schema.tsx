import { InferModel,relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
  AnyPgColumn,
  uniqueIndex,
  boolean,
  alias,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  username: text("username").notNull(),
  fullName: text("full_name").notNull(),
});

export type Profile = InferModel<typeof profiles>;

export const profilesRelations = relations(profiles, ({ one, many }) => ({
	tweet:many(tweet),
  like:many(like),
  bookmarks:many(bookmarks),
  replies:many(replies)
}));

export const tweet = pgTable("tweet", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  profileId: uuid("profileid")
    .notNull()
    .references(() => profiles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isReply: boolean("isreply").notNull().default(false),
  replyId: uuid("replyid").references((): AnyPgColumn => tweet.id),
});

export type Tweet = InferModel<typeof tweet>;

export const tweetsReplies = alias(tweet, "tweet_replies");

export const tweetsRelations = relations(tweet, ({ one }) => ({
  profile: one(profiles, {
    fields: [tweet.profileId],
    references: [profiles.id],
  }),
  tweet: one(tweet, {
    fields: [tweet.replyId],
    references: [tweet.id],
  }),
}));

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const tweetHashtag = pgTable(
  "tweet_hashtag",
  {
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweet.id),
    hashtagId: uuid("hashtagid")
      .notNull()
      .references(() => hashtags.id),
  },
  (tweet_hashtag) => ({
    tweetHashtagPrimaryKey: primaryKey(
      tweet_hashtag.tweetId,
      tweet_hashtag.hashtagId
    ),
  })
);

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  userId: uuid("userid")
    .notNull()
    .references(() => profiles.id),
  tweetId: uuid("tweetid").references(() => tweet.id),
  replyId: uuid("replyid").references((): AnyPgColumn => replies.id), // self reference
});

export const repliesRelations = relations(replies, ({ one }) => ({
  profile: one(profiles, {
    fields: [replies.userId],
    references: [profiles.id],
  }),
}));

export const like = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userid")
      .notNull()
      .references(() => profiles.id),
    tweetId: uuid("tweetid")
      .notNull()
      .references(() => tweet.id),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (like) => ({
    uniqueLikeIndex: uniqueIndex("like__userid_tweetid__idx").on(
      like.userId,
      like.tweetId
    ),
  })
);

export type Like = InferModel<typeof like>;

export const likeRelations = relations(like, ({ one }) => ({
  profile: one(profiles, {
    fields: [like.userId],
    references: [profiles.id],
  }),
}));

export const bookmarks = pgTable(
  "bookmark",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userid")
      .references(() => profiles.id)
      .notNull(),
    tweetId: uuid("tweetid")
      .references(() => tweet.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (bookmark) => ({
    uniqueBookmarkIndex: uniqueIndex("bookmarks__userid_tweetid__idx").on(
      bookmark.userId,
      bookmark.tweetId
    ),
  })
);

export const bookmarkRelations = relations(bookmarks, ({ one }) => ({
  profile: one(profiles, {
    fields: [bookmarks.userId],
    references: [profiles.id],
  }),
}));