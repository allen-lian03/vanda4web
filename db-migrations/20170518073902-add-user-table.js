'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('patient', {
    id: { type: 'string', primaryKey: true, length: 36 }, // uuid
    name: { type: 'string', length: 200 },
    gender: 'boolean',
    birthday: 'date',
    ic: { type: 'string', length: 100 },
    title: { type: 'string', length: 50 },
    phone: { type: 'string', length: 250 },
    email: { type: 'string', length: 500 },
    is_active: 'boolean',
    timestamp: 'timestamp'
  });
};

exports.down = function(db) {
  return db.dropTable('patient');
};

exports._meta = {
  "version": 1
};
