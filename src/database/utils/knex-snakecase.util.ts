import { Knex } from 'knex';

function patchStringcaseForBookshelf(stringcase: any) {
  return (knexOptions: any = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pivotPrefix: string = require('bookshelf/lib/constants').PIVOT_PREFIX;
    const re = new RegExp(`^${pivotPrefix}`);
    return stringcase({
      ...knexOptions,
      appStringcase: (key: string) => {
        if (!re.test(key)) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          return require('stringcase').camelcase(key);
        }
        return key;
      },
    });
  };
}

export function applySnakes(knexOptions: Knex.Config): Knex.Config {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return patchStringcaseForBookshelf(require('knex-stringcase'))(knexOptions);
}
