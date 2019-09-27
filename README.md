# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|intrger|foreign_key: true
|user_id|integer|null: false, foreign_key: true

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false
|email|string|unique: true
|password|string|unique: true
|group_id|integer|foreign_key: true
|message_id|integer|foreign_key: true

### Association
- has_many :messages
- has_many :groups, through: :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|null: false
|users_id|nill: false, foreign_key :true
|message_id|foreign_key :true

### Association
- has_many :messages
- nas_many :users through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user