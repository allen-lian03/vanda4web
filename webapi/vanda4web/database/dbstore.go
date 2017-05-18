package database

import (
	"upper.io/db.v3/lib/sqlbuilder"
	"upper.io/db.v3/postgresql"
)

// DbStore is database helper class.
type DbStore struct {
	setting postgresql.ConnectionURL
}

// NewDbStore function is a constructor.
func NewDbStore() *DbStore {
	store := &DbStore{}
	store.setting = postgresql.ConnectionURL{
		Database: `booktown`,
		Host:     `localhost`,
		User:     `postgres`,
		Password: `123`,
	}

	return store
}

// Open method will open one connection to postgresql.
func (store *DbStore) Open() (sqlbuilder.Database, error) {
	return postgresql.Open(store.setting)
}
