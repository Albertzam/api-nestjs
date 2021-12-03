db.createUser({
  user: 'gen',
  pwd: '123',
  roles: [
    {
      role: 'readWrite',
      db: 'fim_request',
    },
  ],
});
