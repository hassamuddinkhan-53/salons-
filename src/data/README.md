# Data source

v1 stores salon records in `salons.json`.

UI components never fetch JSON directly. They receive a `Salon` object from `src/lib/salons.ts`.

To migrate later, change only `src/lib/salons.ts` to load from:

- Supabase
- Firebase
- PostgreSQL
- any HTTP API

Keep the `Salon` type in `src/lib/types.ts` as the contract.
