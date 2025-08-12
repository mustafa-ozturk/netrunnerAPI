# Developing

## Database Development

Database migrations run automatically when the server starts.

When modifying the database schema:

```bash
# Generate new migration after schema changes
npm run db:generate

# Restart server to apply new migrations
npm run dev
```

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```
